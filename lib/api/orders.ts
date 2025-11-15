import { createBrowserClient } from '../supabase'
import {
  Order,
  OrderInsert,
  OrderUpdate,
  OrderWithItems,
  OrderItemInsert,
} from '../database.types'

/**
 * Create a new order with order items
 */
export async function createOrder(
  orderData: OrderInsert,
  items: OrderItemInsert[]
): Promise<OrderWithItems> {
  const supabase = createBrowserClient()
  
  // Ensure status defaults to "pending" if not provided
  // Build order data without notes (notes column may not exist in database)
  const orderDataWithStatus: any = {
    customer_name: orderData.customer_name,
    customer_email: orderData.customer_email || null,
    customer_phone: orderData.customer_phone || null,
    shipping_address_line1: orderData.shipping_address_line1,
    shipping_address_line2: orderData.shipping_address_line2 || null,
    city: orderData.city,
    state: orderData.state || null,
    country: orderData.country,
    postal_code: orderData.postal_code || null,
    payment_option: orderData.payment_option,
    total_amount: orderData.total_amount,
    status: orderData.status || 'pending',
    // Only include notes if the database column exists (commented out for now)
    // notes: orderData.notes || null,
  }
  
  // Validate required fields
  if (!orderDataWithStatus.customer_name) {
    throw new Error('Customer name is required')
  }
  if (!orderDataWithStatus.shipping_address_line1) {
    throw new Error('Shipping address is required')
  }
  if (!orderDataWithStatus.city) {
    throw new Error('City is required')
  }
  if (!orderDataWithStatus.country) {
    throw new Error('Country is required')
  }
  if (!orderDataWithStatus.payment_option) {
    throw new Error('Payment option is required')
  }
  if (orderDataWithStatus.total_amount === undefined || orderDataWithStatus.total_amount === null) {
    throw new Error('Total amount is required')
  }
  
  // Start a transaction by creating the order first
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert(orderDataWithStatus)
    .select()
    .single()

  if (orderError) {
    console.error('Error creating order:', orderError)
    console.error('Order data attempted:', JSON.stringify(orderDataWithStatus, null, 2))
    
    // Better error message extraction
    let errorMessage = 'Failed to create order'
    if (orderError.message) {
      errorMessage = orderError.message
    } else if (orderError.details) {
      errorMessage = orderError.details
    } else if (orderError.hint) {
      errorMessage = orderError.hint
    } else if (orderError.code) {
      errorMessage = `Database error (${orderError.code})`
    } else {
      try {
        const errorStr = JSON.stringify(orderError, null, 2)
        if (errorStr && errorStr !== '{}') {
          errorMessage = `Order creation failed: ${errorStr}`
        }
      } catch (e) {
        errorMessage = 'Failed to create order. Please check the console for details.'
      }
    }
    
    throw new Error(errorMessage)
  }

  if (!order) {
    throw new Error('Order creation succeeded but no data was returned')
  }

  // Validate items
  if (!items || items.length === 0) {
    throw new Error('Order must contain at least one item')
  }

  // Create order items with the order ID - ensure all required fields are present
  const orderItems = items.map((item) => {
    if (!item.product_id) {
      throw new Error('Product ID is required for all order items')
    }
    if (item.quantity === undefined || item.quantity === null || item.quantity <= 0) {
      throw new Error('Valid quantity is required for all order items')
    }
    if (item.price === undefined || item.price === null) {
      throw new Error('Price is required for all order items')
    }
    
    return {
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: Number(item.price), // Ensure it's a number
    }
  })

  const { data: createdItems, error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)
    .select(`
      *,
      product:products(*)
    `)

  if (itemsError) {
    console.error('Error creating order items:', itemsError)
    console.error('Order items attempted:', JSON.stringify(orderItems, null, 2))
    
    // Try to delete the order if items fail (cleanup)
    try {
      await supabase.from('orders').delete().eq('id', order.id)
    } catch (deleteError) {
      console.error('Failed to cleanup order after items error:', deleteError)
    }
    
    // Better error message extraction
    let errorMessage = 'Failed to create order items'
    if (itemsError.message) {
      errorMessage = itemsError.message
    } else if (itemsError.details) {
      errorMessage = itemsError.details
    } else if (itemsError.hint) {
      errorMessage = itemsError.hint
    } else if (itemsError.code) {
      errorMessage = `Database error (${itemsError.code})`
    }
    
    throw new Error(errorMessage)
  }

  return {
    ...order,
    order_items: createdItems || [],
  } as OrderWithItems
}

/**
 * Get all orders
 */
export async function getOrders(options?: {
  status?: string
  limit?: number
  offset?: number
}): Promise<OrderWithItems[]> {
  const supabase = createBrowserClient()
  let query = supabase
    .from('orders')
    .select(`
      *,
      order_items:order_items(
        *,
        product:products(*)
      )
    `)
    .order('created_at', { ascending: false })

  if (options?.status) {
    query = query.eq('status', options.status)
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching orders:', error)
    throw error
  }

  return (data as OrderWithItems[]) || []
}

/**
 * Get a single order by ID with items
 */
export async function getOrderById(id: number): Promise<OrderWithItems | null> {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items:order_items(
        *,
        product:products(*)
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching order:', error)
    return null
  }

  return data as OrderWithItems
}

/**
 * Get orders by customer email
 */
export async function getOrdersByEmail(
  email: string
): Promise<OrderWithItems[]> {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items:order_items(
        *,
        product:products(*)
      )
    `)
    .eq('customer_email', email)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders by email:', error)
    throw error
  }

  return (data as OrderWithItems[]) || []
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  id: number,
  status: string
): Promise<Order> {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating order status:', error)
    throw error
  }

  return data
}

/**
 * Update an order
 */
export async function updateOrder(
  id: number,
  updates: OrderUpdate
): Promise<Order> {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating order:', error)
    throw error
  }

  return data
}

/**
 * Delete an order (will cascade delete order items)
 */
export async function deleteOrder(id: number): Promise<void> {
  const supabase = createBrowserClient()
  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting order:', error)
    throw error
  }
}

/**
 * Get order statistics
 */
export async function getOrderStats(): Promise<{
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
  completedOrders: number
}> {
  const supabase = createBrowserClient()
  const { data: orders, error } = await supabase
    .from('orders')
    .select('status, total_amount')

  if (error) {
    console.error('Error fetching order stats:', error)
    throw error
  }

  const totalOrders = orders?.length || 0
  const totalRevenue =
    orders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0
  const pendingOrders =
    orders?.filter((order) => order.status === 'pending').length || 0
  const completedOrders =
    orders?.filter((order) => order.status === 'delivered').length || 0

  return {
    totalOrders,
    totalRevenue,
    pendingOrders,
    completedOrders,
  }
}


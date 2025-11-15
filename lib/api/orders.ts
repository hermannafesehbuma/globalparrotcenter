import { supabase } from '../supabase'
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
  // Start a transaction by creating the order first
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert(orderData)
    .select()
    .single()

  if (orderError) {
    console.error('Error creating order:', orderError)
    throw orderError
  }

  // Create order items with the order ID
  const orderItems = items.map((item) => ({
    ...item,
    order_id: order.id,
  }))

  const { data: createdItems, error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)
    .select(`
      *,
      product:products(*)
    `)

  if (itemsError) {
    console.error('Error creating order items:', itemsError)
    // Optionally delete the order if items fail
    throw itemsError
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


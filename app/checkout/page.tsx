"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingCart, AlertCircle, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { createOrder } from "@/lib/api/orders";
import { AgeSafetyWidget } from "@/components/age-safety-widget";
import { categories } from "@/lib/data";
import Link from "next/link";

type PaymentOption = 
  | "cashapp" 
  | "apple pay" 
  | "venmo" 
  | "chime" 
  | "bank transfer" 
  | "zelle";

function CheckoutContent() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    shipping_address_line1: "",
    shipping_address_line2: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    payment_option: "" as PaymentOption | "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      alert("Your cart is empty. Please add items to your cart first.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare order data according to schema
      const orderData = {
        customer_name: formData.customer_name,
        customer_email: formData.customer_email || null,
        customer_phone: formData.customer_phone || null,
        shipping_address_line1: formData.shipping_address_line1,
        shipping_address_line2: formData.shipping_address_line2 || null,
        city: formData.city,
        state: formData.state || null,
        country: formData.country,
        postal_code: formData.postal_code || null,
        payment_option: formData.payment_option as PaymentOption,
        total_amount: getTotalPrice(),
        status: "pending",
        notes: formData.notes || null,
      };

      // Prepare order items
      const orderItems = items.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      // Create order
      const order = await createOrder(orderData, orderItems);

      // Send email notifications (both to admin and customer)
      try {
        await fetch('/api/send-order-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: order.id,
            customerName: formData.customer_name,
            customerEmail: formData.customer_email || undefined,
            customerPhone: formData.customer_phone || undefined,
            shippingAddress: {
              line1: formData.shipping_address_line1,
              line2: formData.shipping_address_line2 || undefined,
              city: formData.city,
              state: formData.state || undefined,
              country: formData.country,
              postalCode: formData.postal_code || undefined,
            },
            paymentMethod: formData.payment_option,
            items: items.map((item) => ({
              name: item.product.name,
              quantity: item.quantity,
              price: item.product.price,
            })),
            total: getTotalPrice(),
            notes: formData.notes || undefined,
          }),
        });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't fail the order if email fails
      }

      // Clear cart
      clearCart();

      // Redirect to thank you page
      router.push(`/thank-you?orderId=${order.id}`);
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2">Checkout</h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6">
            Your cart is empty. Add items to your cart to proceed.
          </p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 sm:mb-8"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2">Checkout</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Complete your purchase and join the parrot community
        </p>
      </motion.div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
        {/* Order Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
              <CardDescription>
                Please provide your contact and shipping details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="customer_name">Full Name *</Label>
                  <Input
                    id="customer_name"
                    required
                    value={formData.customer_name}
                    onChange={(e) =>
                      setFormData({ ...formData, customer_name: e.target.value })
                    }
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer_email">Email</Label>
                  <Input
                    id="customer_email"
                    type="email"
                    value={formData.customer_email}
                    onChange={(e) =>
                      setFormData({ ...formData, customer_email: e.target.value })
                    }
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer_phone">Phone Number</Label>
                  <Input
                    id="customer_phone"
                    type="tel"
                    value={formData.customer_phone}
                    onChange={(e) =>
                      setFormData({ ...formData, customer_phone: e.target.value })
                    }
                    placeholder="Optional"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shipping_address_line1">Address Line 1 *</Label>
                  <Input
                    id="shipping_address_line1"
                    required
                    value={formData.shipping_address_line1}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shipping_address_line1: e.target.value,
                      })
                    }
                    placeholder="123 Main St"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shipping_address_line2">Address Line 2</Label>
                  <Input
                    id="shipping_address_line2"
                    value={formData.shipping_address_line2}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shipping_address_line2: e.target.value,
                      })
                    }
                    placeholder="Apt, Suite, etc. (optional)"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      required
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      placeholder="New York"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                      placeholder="NY"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      required
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      placeholder="USA"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postal_code">Postal/ZIP Code</Label>
                    <Input
                      id="postal_code"
                      value={formData.postal_code}
                      onChange={(e) =>
                        setFormData({ ...formData, postal_code: e.target.value })
                      }
                      placeholder="10001"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Payment Method *</Label>
                  <RadioGroup
                    value={formData.payment_option}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        payment_option: value as PaymentOption,
                      })
                    }
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cashapp" id="cashapp" />
                      <Label htmlFor="cashapp" className="font-normal cursor-pointer text-sm sm:text-base">
                        CashApp
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="apple pay" id="applepay" />
                      <Label htmlFor="applepay" className="font-normal cursor-pointer text-sm sm:text-base">
                        Apple Pay
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="venmo" id="venmo" />
                      <Label htmlFor="venmo" className="font-normal cursor-pointer text-sm sm:text-base">
                        Venmo
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="chime" id="chime" />
                      <Label htmlFor="chime" className="font-normal cursor-pointer text-sm sm:text-base">
                        Chime
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bank transfer" id="bank" />
                      <Label htmlFor="bank" className="font-normal cursor-pointer text-sm sm:text-base">
                        Bank Transfer
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="zelle" id="zelle" />
                      <Label htmlFor="zelle" className="font-normal cursor-pointer text-sm sm:text-base">
                        Zelle
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Special instructions or questions..."
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Complete Purchase
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => {
                const category = categories.find(
                  (c) => c.id === item.product.category_id
                );
                return (
                  <div key={item.product.id} className="flex items-start gap-3 sm:gap-4">
                    <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                      {item.product.image_urls && item.product.image_urls.length > 0 ? (
                        <img
                          src={item.product.image_urls[0]}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base line-clamp-2">{item.product.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {category?.name || "Uncategorized"}
                      </p>
                      {category && (
                        <div className="mt-1">
                          <AgeSafetyWidget category={category} />
                        </div>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-semibold text-sm sm:text-base">
                        ${item.product.price.toFixed(2)}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className="pt-4 border-t space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100 text-base sm:text-lg">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm text-amber-800 dark:text-amber-200 space-y-2">
              <p>
                • Live birds require special handling and shipping arrangements
              </p>
              <p>
                • Age restrictions apply based on parrot type (see age recommendations)
              </p>
              <p>
                • We will contact you within 24 hours to confirm your order and arrange shipping
              </p>
              <p>
                • All parrots come with health certificates and care instructions
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}


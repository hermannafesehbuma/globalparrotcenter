"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ShoppingBag, Home } from "lucide-react";
import Link from "next/link";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6"
          >
            <CheckCircle className="h-12 w-12 text-primary" />
          </motion.div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Thank You for Your Order!
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Your order has been successfully placed
          </p>
          {orderId && (
            <p className="text-sm text-muted-foreground">
              Order ID: <span className="font-semibold text-foreground">#{orderId}</span>
            </p>
          )}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
            <CardDescription>
              Here's what happens after you place your order
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Order Confirmation</h3>
                <p className="text-sm text-muted-foreground">
                  You should receive an email confirmation shortly at the email address you provided.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Order Review</h3>
                <p className="text-sm text-muted-foreground">
                  Our team will review your order and contact you within 24 hours to confirm details and arrange shipping.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Shipping Arrangements</h3>
                <p className="text-sm text-muted-foreground">
                  We'll work with you to arrange safe shipping for your parrot(s) and provide all necessary care instructions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/products">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Continue Shopping
            </Link>
          </Button>
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <h3 className="font-semibold mb-2">Questions About Your Order?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            If you have any questions or need to make changes to your order, please contact us at:
          </p>
          <a
            href="mailto:parrotlovers04@gmail.com"
            className="text-primary hover:underline font-medium"
          >
            parrotlovers04@gmail.com
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">Loading...</div>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}


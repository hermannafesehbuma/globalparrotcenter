"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">Terms of Service</h1>
        <p className="text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </motion.div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Agreement to Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              By accessing or using Global Parrot Center's website and services, you agree to be
              bound by these Terms of Service. If you disagree with any part of these terms, you
              may not access our services.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Use of Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>You agree to use our services only for lawful purposes and in accordance with these terms:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You must be at least 18 years old to make a purchase</li>
              <li>You must provide accurate and complete information</li>
              <li>You must comply with all applicable laws and regulations</li>
              <li>You must not use our services for any illegal or unauthorized purpose</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Purchases and Payments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              When you make a purchase through Global Parrot Center:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>All prices are subject to change without notice</li>
              <li>Payment must be made through approved payment methods</li>
              <li>Orders are subject to availability and our acceptance</li>
              <li>We reserve the right to refuse or cancel any order</li>
              <li>Shipping and handling fees may apply</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Live Animal Sales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Due to the nature of live animal sales:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>All sales are final unless there are health issues documented within 48 hours</li>
              <li>Age restrictions apply based on parrot type and local regulations</li>
              <li>Buyers must meet age requirements and provide proper identification</li>
              <li>Special shipping arrangements are required for live birds</li>
              <li>Health certificates are provided with all parrot purchases</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Refund and Return Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Refunds for live animals are handled on a case-by-case basis:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Health issues discovered within 48 hours may qualify for refund consideration</li>
              <li>Veterinary documentation is required for health-related refunds</li>
              <li>Accessories and supplies may be returned within 30 days if unused</li>
              <li>Shipping costs are non-refundable</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Age Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              We enforce age recommendations for responsible parrot ownership:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Budgies: Recommended for ages 10+ with adult supervision</li>
              <li>Conures: Recommended for ages 12+ with adult supervision</li>
              <li>African Greys: Recommended for ages 14+</li>
              <li>Macaws and Cockatoos: Recommended for ages 16+ or adult owners</li>
              <li>We reserve the right to verify age and require adult supervision when appropriate</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. User Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              If you create an account on our platform:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You are responsible for maintaining the security of your account</li>
              <li>You must not share your account credentials</li>
              <li>You are responsible for all activities under your account</li>
              <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              All content on Global Parrot Center's website, including text, graphics, logos, and
              images, is the property of Global Parrot Center and is protected by copyright and
              trademark laws.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Global Parrot Center shall not be liable for any indirect, incidental, special, or
              consequential damages arising from your use of our services or purchase of products.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Indemnification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              You agree to indemnify and hold harmless Global Parrot Center from any claims,
              damages, or expenses arising from your use of our services or violation of these terms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>11. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              We reserve the right to modify these terms at any time. Continued use of our services
              after changes constitutes acceptance of the new terms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>12. Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              For questions about these Terms of Service, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> parrotlovers04@gmail.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


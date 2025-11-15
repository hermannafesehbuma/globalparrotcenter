"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Shield, Users, Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AboutPage() {
  const faqs = [
    {
      question: "What is the minimum age for buying parrots?",
      answer:
        "Age recommendations vary by parrot type. Budgies are recommended for ages 10+ with adult supervision, Conures for 12+, African Greys for 14+, and Macaws/Cockatoos for 16+ or adult owners. We always ensure proper age verification and recommend adult supervision for younger owners.",
    },
    {
      question: "How do you handle shipping of live birds?",
      answer:
        "We work with specialized pet shipping services that are experienced in transporting live birds safely. All birds are shipped in climate-controlled, secure containers with proper ventilation, food, and water. We coordinate directly with you to schedule shipping and ensure someone is available to receive the bird. Shipping costs and arrangements are discussed after order confirmation.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept CashApp, Apple Pay, Venmo, Chime, Bank Transfer, and Zelle. Payment details will be provided after you submit your order and we confirm availability.",
    },
    {
      question: "What is your refund policy?",
      answer:
        "Due to the nature of live animals, we have a careful refund policy. If there are health issues discovered within 48 hours of delivery (with proper veterinary documentation), we will work with you on a case-by-case basis. We guarantee all our parrots come with health certificates and are in excellent condition at the time of sale.",
    },
    {
      question: "How can I join the parrot community?",
      answer:
        "Simply visit our Community page to access forums, guides, and connect with other parrot enthusiasts. You can share experiences, ask questions, and learn from expert articles and community discussions.",
    },
    {
      question: "Do you provide care instructions?",
      answer:
        "Yes! Every parrot purchase includes comprehensive care instructions covering diet, housing, health, training, and behavioral needs. We also provide ongoing support through our community forum and are always available to answer questions.",
    },
    {
      question: "Are your parrots healthy and certified?",
      answer:
        "Absolutely. All our parrots undergo health checks and come with health certificates. We work only with reputable breeders and ensure all birds are in excellent health before sale. We're committed to the welfare of every bird.",
    },
    {
      question: "Can I visit your facility?",
      answer:
        "We'd love to have you visit! Please contact us to schedule a visit. We're happy to show you our facilities and introduce you to our parrots in person.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mission Statement */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">About Global Parrot Center</h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-muted-foreground mb-6">
            We connect parrot enthusiasts with healthy, happy parrots.
          </p>
          <p className="text-lg text-muted-foreground">
            Our mission is to create a thriving community where parrot lovers can find their
            perfect feathered companion, learn from experts, and share their passion with others.
            We're committed to parrot welfare, responsible ownership, and building lasting
            relationships between parrots and their families.
          </p>
        </div>
      </motion.section>

      {/* Values */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Our Values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Heart className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Parrot Welfare</CardTitle>
              <CardDescription>
                The health and happiness of every parrot is our top priority
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Responsible Ownership</CardTitle>
              <CardDescription>
                We ensure proper age requirements and provide comprehensive care education
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Community First</CardTitle>
              <CardDescription>
                Building a supportive community of parrot enthusiasts and experts
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-muted/50 rounded-lg p-8"
      >
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Contact Us</h2>
        <div className="grid gap-6 md:grid-cols-3 max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <Mail className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">contact@globalparrotcenter.com</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Phone className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Phone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">(555) 123-4567</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MapPin className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Visit by appointment</p>
            </CardContent>
          </Card>
        </div>
      </motion.section>
    </div>
  );
}


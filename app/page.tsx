'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ShoppingBag,
  Users,
  BookOpen,
  ArrowRight,
  UserPlus,
  Camera,
  ShoppingCart,
  Search,
  Calendar,
  CheckCircle,
  Award,
  Mail,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { products } from '@/lib/data';
import { AgeSafetyWidget } from '@/components/age-safety-widget';

const featuredProducts = products.slice(0, 3);

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-50 dark:from-pink-950/20 dark:via-background dark:to-pink-950/20">
        <div className="container mx-auto px-4 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-bold tracking-tight sm:text-6xl"
            >
              Welcome to{' '}
              <span className="text-primary">Global Parrot Center</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-muted-foreground"
            >
              We connect parrot enthusiasts with healthy, happy parrots. Join
              our community and discover the perfect feathered companion for
              your family.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex items-center justify-center gap-4"
            >
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/products">
                  Explore Parrots <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8"
              >
                <Link href="/community">
                  Join Community <Users className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight">
            Featured Parrots
          </h2>
          <p className="mt-2 text-muted-foreground">
            Discover our most popular and beloved parrots
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64 w-full bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {product.category.name}
                      </CardDescription>
                    </div>
                    <span className="text-2xl font-bold text-primary">
                      ${product.price}
                    </span>
                  </div>
                  <AgeSafetyWidget
                    category={product.category}
                    className="mt-2"
                  />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.highlights.slice(0, 3).map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-700 dark:bg-pink-900 dark:text-pink-300"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant="outline">
                    <Link href={`/products/${product.id}`}>
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-6 md:grid-cols-3"
          >
            <Card>
              <CardHeader>
                <ShoppingBag className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Shop Parrots</CardTitle>
                <CardDescription>
                  Browse our wide selection of healthy, happy parrots
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/products">Browse Shop</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Learn & Guides</CardTitle>
                <CardDescription>
                  Expert tips on parrot care, training, and health
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/community">Read Guides</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Users className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Join Community</CardTitle>
                <CardDescription>
                  Connect with fellow parrot lovers and share experiences
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/community">Join Now</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-6 md:grid-cols-3 text-center"
        >
          <div>
            <h3 className="text-4xl font-bold text-primary mb-2">100+</h3>
            <p className="text-muted-foreground">Parrot Species</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-primary mb-2">500+</h3>
            <p className="text-muted-foreground">Happy Owners</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-primary mb-2">50+</h3>
            <p className="text-muted-foreground">Care Guides</p>
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              Get started with Global Parrot Center in three simple steps
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: '1',
                icon: UserPlus,
                title: 'Sign Up & Create Profile',
                description:
                  'Create your parrot profile and join our community of enthusiasts',
              },
              {
                step: '2',
                icon: Camera,
                title: 'Share & Connect',
                description:
                  'Share posts, photos, and care tips with fellow parrot lovers',
              },
              {
                step: '3',
                icon: ShoppingCart,
                title: 'Shop Safely',
                description:
                  'Browse and purchase parrots and accessories with confidence',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                        {item.step}
                      </div>
                      <item.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parrot Care Resources */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Parrot Care Resources
          </h2>
          <p className="text-muted-foreground">
            Everything you need to keep your parrot healthy and happy
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: 'Tips & Guides',
              items: ['Feeding', 'Cage Setup', 'Socialization', 'Training'],
            },
            {
              icon: CheckCircle,
              title: 'Health Checklists',
              items: [
                'Signs of Stress',
                'Nutrition Guides',
                'Vet Recommendations',
              ],
            },
            {
              icon: Calendar,
              title: 'Event Calendar',
              items: ['Online Webinars', 'Local Meetups', 'Parrot Shows'],
            },
          ].map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <resource.icon className="mb-2 h-8 w-8 text-primary" />
                  <CardTitle>{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {resource.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle className="h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/community">Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Search / Discover Parrots */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Discover Your Perfect Parrot
            </h2>
            <p className="text-muted-foreground">
              Filter and search through our extensive collection
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search Parrots
                </CardTitle>
                <CardDescription>
                  Filter by age, gender, species, and location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Age</Badge>
                  <Badge variant="secondary">Gender</Badge>
                  <Badge variant="secondary">Species</Badge>
                  <Badge variant="secondary">Location</Badge>
                </div>
                <Button asChild className="w-full">
                  <Link href="/products">
                    <Search className="mr-2 h-4 w-4" />
                    Explore All Parrots
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Parrot of the Week */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Parrot of the Week
          </h2>
          <p className="text-muted-foreground">
            Meet our featured parrot and their amazing story
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="overflow-hidden">
            <div className="relative h-64 w-full bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900 dark:to-pink-800">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-9xl">🦜</span>
              </div>
            </div>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-primary" />
                <Badge variant="secondary">Featured</Badge>
              </div>
              <CardTitle>Charlie the African Grey</CardTitle>
              <CardDescription>
                This week&apos;s spotlight parrot
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Charlie is a 5-year-old African Grey who has found his forever
                home with the Johnson family. Known for his incredible
                vocabulary of over 200 words and his gentle nature, Charlie has
                become a beloved member of the family. His owner shares daily
                updates about his training progress and funny antics in our
                community.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/community">Read Full Story</Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </section>

      {/* Newsletter Signup CTA */}
      <section className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/20 dark:to-pink-900/20 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Stay Updated with Parrot Care Tips
            </h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for exclusive care guides, store
              promotions, and community updates.
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button type="submit">
                <Mail className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

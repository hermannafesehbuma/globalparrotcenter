"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, User, ArrowRight, MessageCircle } from "lucide-react";
import { blogPosts } from "@/lib/data";

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-2">Global Parrot Center Community</h1>
        <p className="text-muted-foreground text-lg">
          Learn, share, and connect with fellow parrot enthusiasts
        </p>
      </motion.div>

      {/* Featured Guides Section */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-2">Care Guides & Articles</h2>
          <p className="text-muted-foreground">
            Expert tips on parrot care, training, and health
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="relative h-48 w-full bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900 dark:to-pink-800">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-pink-400" />
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/community/${post.slug}`}>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Topics Section */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-2">Popular Topics</h2>
          <p className="text-muted-foreground">
            Explore common topics and discussions
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Parrot Care", icon: "🦜", count: 24 },
            { title: "Training Tips", icon: "🎓", count: 18 },
            { title: "Health & Wellness", icon: "💚", count: 15 },
            { title: "Breeding", icon: "🥚", count: 12 },
            { title: "Nutrition", icon: "🥗", count: 20 },
            { title: "Behavior", icon: "🧠", count: 16 },
            { title: "Safety", icon: "🛡️", count: 10 },
            { title: "Age Recommendations", icon: "👶", count: 14 },
          ].map((topic, index) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl mb-1">{topic.icon}</p>
                      <p className="font-semibold">{topic.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {topic.count} posts
                      </p>
                    </div>
                    <MessageCircle className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Community CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/20 dark:to-pink-900/20 rounded-lg p-8 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Join the Conversation</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Share your experiences, ask questions, and learn from other parrot owners in our
          vibrant community forum.
        </p>
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          <MessageCircle className="mr-2 h-5 w-5" />
          Visit Community Forum
        </Button>
      </motion.section>
    </div>
  );
}


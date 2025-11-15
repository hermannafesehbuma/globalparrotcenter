"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { getCategories } from "@/lib/api/categories";
import { Category } from "@/lib/database.types";
import { AgeSafetyWidget } from "@/components/age-safety-widget";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError("Failed to load categories");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-2">Parrot Categories</h1>
        <p className="text-muted-foreground text-lg">
          Explore our wide selection of parrots and accessories
        </p>
      </motion.div>

      {loading ? (
        <div className="text-center py-16">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading categories...</p>
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">{error}</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">No categories available.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="relative h-64 w-full bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900 dark:to-pink-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl">🦜</span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{category.name}</CardTitle>
                  <CardDescription className="text-base">
                    {category.description || "No description available"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AgeSafetyWidget 
                    category={{
                      id: category.id,
                      name: category.name,
                      slug: category.name.toLowerCase().replace(/\s+/g, '-'),
                      minAge: 0,
                      description: category.description || ''
                    }} 
                  />
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant="outline">
                    <Link href={`/products?category=${category.id}`}>
                      View {category.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}


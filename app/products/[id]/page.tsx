"use client";

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2, Heart, ShoppingCart, ArrowLeft, Loader2 } from "lucide-react";
import { getProductById } from "@/lib/api/products";
import { ProductWithCategory } from "@/lib/database.types";
import { AgeSafetyWidget } from "@/components/age-safety-widget";
import { useCart } from "@/contexts/cart-context";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const [product, setProduct] = useState<ProductWithCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const productId = parseInt(id);
      if (isNaN(productId)) {
        setError("Invalid product ID");
        return;
      }
      const data = await getProductById(productId);
      if (!data) {
        setError("Product not found");
        return;
      }
      setProduct(data);
    } catch (err) {
      console.error("Error loading product:", err);
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    notFound();
  }

  const handleAddToCart = () => {
    // Product already matches database schema
    const dbProduct = {
      id: product.id,
      name: product.name,
      category_id: product.category_id,
      description: product.description || null,
      price: product.price,
      image_urls: product.image_urls || null,
      age: product.age || null,
      gender: product.gender || null,
      created_at: product.created_at,
    };

    addToCart(dbProduct, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/products">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
            {product.image_urls && product.image_urls.length > 0 ? (
              <Image
                src={product.image_urls[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No Image
              </div>
            )}
          </div>
          {product.image_urls && product.image_urls.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-4">
              {product.image_urls.map((img, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-lg bg-muted"
                >
                  <Image src={img} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-4xl font-bold">{product.name}</h1>
              <span className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
            </div>
            <p className="text-lg text-muted-foreground">
              {product.category?.name || "Uncategorized"}
            </p>
            {product.category && (
              <AgeSafetyWidget
                category={{
                  id: product.category.id,
                  name: product.category.name,
                  slug: product.category.name?.toLowerCase().replace(/\s+/g, '-') || '',
                  minAge: 0,
                  description: product.category.description || ''
                }}
                className="mt-4"
              />
            )}
          </div>

          {product.description && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {product.category && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{product.category.name}</span>
                </div>
              )}
              {product.age && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Age:</span>
                  <span className="font-medium">{product.age} months</span>
                </div>
              )}
              {product.gender && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gender:</span>
                  <span className="font-medium capitalize">{product.gender}</span>
                </div>
              )}
              {product.image_urls && product.image_urls.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Images:</span>
                  <span className="font-medium">{product.image_urls.length} image{product.image_urls.length !== 1 ? 's' : ''}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="quantity">Quantity:</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={addedToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {addedToCart ? "Added to Cart!" : "Add to Cart"}
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/cart">
                  View Cart
                </Link>
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="lg" className="flex-1">
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                <Heart className="mr-2 h-5 w-5" />
                Favorite
              </Button>
            </div>
          </div>

          <Card className="bg-pink-50 dark:bg-pink-950/20 border-pink-200 dark:border-pink-800">
            <CardHeader>
              <CardTitle className="text-pink-900 dark:text-pink-100">
                Ask the Community
              </CardTitle>
              <CardDescription className="text-pink-700 dark:text-pink-300">
                Have questions about this parrot? Connect with our community!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full border-pink-300 dark:border-pink-700">
                <Link href="/community">Visit Community Forum</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}


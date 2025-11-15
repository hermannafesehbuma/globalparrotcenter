"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Upload, X } from "lucide-react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";
import { Product, ProductInsert, Category } from "@/lib/database.types";
import { createBrowserClient } from "@/lib/supabase";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    description: "",
    price: "",
    age: "",
    gender: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // Fetch categories first, then products
      const categoriesData = await getCategories();
      setCategories(categoriesData);
      
      // Then fetch products
      const productsData = await getProducts();
      // Extract Product from ProductWithCategory
      const productsList = productsData.map(p => ({
        ...p,
        category: undefined // Remove category relation for state
      })) as Product[];
      setProducts(productsList);
    } catch (error) {
      console.error("Error loading data:", error);
      // Try to load categories separately if products fail
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (catError) {
        console.error("Error loading categories:", catError);
        alert("Failed to load categories. Please check your Supabase connection.");
      }
      alert("Failed to load products. Please check your Supabase connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category_id: product.category_id?.toString() || "",
        description: product.description || "",
        price: product.price.toString(),
        age: product.age?.toString() || "",
        gender: product.gender || "",
      });
      // Set images array from product (using image_urls column)
      const productImages = (product as any).image_urls || [];
      setImages(productImages);
      setImagePreviews(productImages);
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        category_id: "",
        description: "",
        price: "",
        age: "",
        gender: "",
      });
      setImages([]);
      setImagePreviews([]);
    }
    setImageFiles([]);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
    setImageFiles([]);
    setImagePreviews([]);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const validFiles: File[] = [];
      const previewPromises: Promise<string>[] = [];
      
      files.forEach((file) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert(`${file.name} is not an image file`);
          return;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name} size must be less than 5MB`);
          return;
        }
        
        validFiles.push(file);
        
        // Create preview promise
        const previewPromise = new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
        previewPromises.push(previewPromise);
      });
      
      // Wait for all previews to load
      Promise.all(previewPromises).then((previews) => {
        setImagePreviews([...imagePreviews, ...previews]);
      });
      
      setImageFiles([...imageFiles, ...validFiles]);
    }
  };

  const removeImage = (index: number) => {
    const newFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];
    const newImages = [...images];
    
    if (index < imageFiles.length) {
      // Remove uploaded file
      newFiles.splice(index, 1);
      newPreviews.splice(index, 1);
      setImageFiles(newFiles);
      setImagePreviews(newPreviews);
    } else {
      // Remove existing image URL
      const imageIndex = index - imageFiles.length;
      newImages.splice(imageIndex, 1);
      setImages(newImages);
      setImagePreviews([...imagePreviews.slice(0, imageFiles.length), ...newImages]);
    }
  };

  const uploadImageToStorage = async (file: File): Promise<string> => {
    const supabase = createBrowserClient();
    
    // Get bucket name from environment variable (must be NEXT_PUBLIC_* for client-side)
    // Default to 'parrots' if not set
    const bucketName = (process.env.NEXT_PUBLIC_STORAGE_BUCKET || 'parrots').trim();
    
    if (!bucketName) {
      throw new Error('Storage bucket name is not configured. Set NEXT_PUBLIC_STORAGE_BUCKET in your environment variables.');
    }
    
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = fileName;
    
    // First, verify the bucket exists by trying to list it
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
    } else {
      const bucketExists = buckets?.some(b => b.name === bucketName);
      if (!bucketExists) {
        console.warn(`Bucket "${bucketName}" not found. Available buckets:`, buckets?.map(b => b.name).join(', ') || 'none');
      }
    }
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('Error uploading image:', error);
      console.error('Bucket name used:', bucketName);
      console.error('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
      
      // Provide helpful error message
      if (error.message?.includes('Bucket not found') || error.message?.includes('not found')) {
        throw new Error(
          `Bucket "${bucketName}" not found. Please verify:\n` +
          `1. The bucket name is correct (currently using: "${bucketName}")\n` +
          `2. The bucket exists in your Supabase project\n` +
          `3. Set NEXT_PUBLIC_STORAGE_BUCKET in .env.local if your bucket has a different name\n` +
          `4. Check that RLS policies allow uploads`
        );
      }
      
      throw new Error(`Failed to upload image: ${error.message}`);
    }
    
    // Construct the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
    
    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields according to schema
    // Schema: name VARCHAR(150) NOT NULL, price DECIMAL(10,2) NOT NULL
    if (!formData.name || formData.name.trim().length === 0) {
      alert("Product name is required");
      return;
    }
    
    if (formData.name.length > 150) {
      alert("Product name must be 150 characters or less");
      return;
    }
    
    if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      alert("Valid price is required (must be greater than 0)");
      return;
    }
    
    // Validate age is a positive integer (in months)
    if (formData.age && (isNaN(parseInt(formData.age)) || parseInt(formData.age) < 0)) {
      alert("Age must be a positive number in months");
      return;
    }
    
    
    try {
      // Upload images if new files were selected
      let uploadedImageUrls: string[] = [...images];
      
      if (imageFiles.length > 0) {
        setUploadingImage(true);
        try {
          const uploadPromises = imageFiles.map(file => uploadImageToStorage(file));
          const urls = await Promise.all(uploadPromises);
          uploadedImageUrls = [...uploadedImageUrls, ...urls];
        } catch (uploadError: any) {
          alert(`Failed to upload images: ${uploadError.message}`);
          setUploadingImage(false);
          return;
        }
        setUploadingImage(false);
      }

      // Build product data matching schema exactly
      // Schema fields: id, category_id, name, description, price, image_urls (TEXT[]), age, gender (parrot_gender), created_at
      const productData: ProductInsert = {
        name: formData.name.trim(),
        category_id: formData.category_id ? parseInt(formData.category_id) : null,
        description: formData.description.trim() || null,
        price: parseFloat(formData.price),
        image_urls: uploadedImageUrls.length > 0 ? uploadedImageUrls : null, // TEXT[] array of image URLs
        age: formData.age ? parseInt(formData.age) : null, // Age in months (INT)
        // Handle gender: convert empty string to null, ensure it's a valid enum value or null
        gender: formData.gender && formData.gender.trim() !== '' 
          ? (formData.gender as 'male' | 'female' | 'pairs')
          : null, // parrot_gender enum ('male', 'female', 'pairs')
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await createProduct(productData);
      }

      await loadData();
      handleCloseDialog();
    } catch (error: any) {
      console.error("Error saving product:", error);
      const errorMessage = error?.message || error?.toString() || "Failed to save product";
      alert(`Failed to save product: ${errorMessage}`);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await deleteProduct(id);
      await loadData();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Products</h2>
          <p className="text-muted-foreground">
            Manage parrots and related products
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? "Edit Product" : "Create New Product"}
                </DialogTitle>
                <DialogDescription>
                  {editingProduct
                    ? "Update the product information below."
                    : "Add a new product to your store."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Blue Budgie"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category_id">Category</Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category_id: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.length === 0 ? (
                        <SelectItem value="" disabled>
                          No categories available. Please create a category first.
                        </SelectItem>
                      ) : (
                        categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="0.00"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="age">Age (months) *</Label>
                    <Input
                      id="age"
                      type="number"
                      min="0"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                      placeholder="e.g., 12 (for 12 months)"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter age in months (e.g., 12 = 1 year, 6 = 6 months)
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        setFormData({ ...formData, gender: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="pairs">Pairs (Male & Female)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Product description..."
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="images">Product Images</Label>
                  <div className="space-y-2">
                    {imagePreviews.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative w-full h-32 border rounded-lg overflow-hidden">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-1 right-1 h-6 w-6 p-0"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageSelect}
                        disabled={uploadingImage}
                        className="flex-1"
                      />
                    </div>
                    {uploadingImage && (
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Upload className="h-4 w-4 animate-pulse" />
                        Uploading images...
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      You can upload multiple images. Images will be uploaded to Supabase Storage.
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProduct ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      {loading ? (
        <div className="text-center py-12">Loading products...</div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Products</CardTitle>
            <CardDescription>
              {products.length} product{products.length !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No products found. Create your first product to get started.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Age (months)</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>
                          {categories.find((c) => c.id === product.category_id)?.name || "-"}
                        </TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.age ? `${product.age} months` : "-"}</TableCell>
                        <TableCell>{product.gender || "-"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenDialog(product)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(product.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}


"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Category } from "@/lib/types";

interface AgeSafetyWidgetProps {
  category: Category;
  className?: string;
}

export function AgeSafetyWidget({ category, className }: AgeSafetyWidgetProps) {
  const getEmoji = (categoryName: string) => {
    if (categoryName.toLowerCase().includes("budgie")) return "🐦";
    if (categoryName.toLowerCase().includes("conure")) return "🦜";
    if (categoryName.toLowerCase().includes("african grey")) return "🦜";
    if (categoryName.toLowerCase().includes("macaw")) return "🦜";
    if (categoryName.toLowerCase().includes("cockatoo")) return "🦜";
    return "🦜";
  };

  const getMessage = (category: Category) => {
    if (category.minAge === 0) {
      return "Suitable for all ages";
    }
    if (category.minAge >= 16) {
      return `Recommended for ages ${category.minAge}+ or adult owners`;
    }
    return `Recommended for ages ${category.minAge}+ with adult supervision`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Badge
        variant="secondary"
        className="flex items-center gap-2 bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950 dark:text-pink-300 dark:border-pink-800"
      >
        <AlertCircle className="h-4 w-4" />
        <span>
          {getEmoji(category.name)} {category.name}: {getMessage(category)}
        </span>
      </Badge>
    </motion.div>
  );
}


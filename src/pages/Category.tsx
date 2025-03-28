
import React from "react";
import { useParams, Link } from "react-router-dom";
import { getProductsByCategory, categories } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";
import { ChevronRight } from "lucide-react";

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  if (!categoryId) {
    return <div>Category not found</div>;
  }

  const products = getProductsByCategory(categoryId);
  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-beige-500 transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link to="/shop" className="hover:text-beige-500 transition-colors">
          Shop
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium">{category.name}</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
        <p className="text-muted-foreground">
          Explore our collection of handcrafted {category.name.toLowerCase()}, made with love and attention to detail.
        </p>
      </div>

      <ProductGrid products={products} />

      {products.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium mb-2">No products found in this category</h2>
          <p className="text-muted-foreground mb-6">
            Please check back soon as we're constantly adding new items!
          </p>
          <Link to="/shop" className="btn-primary inline-block px-6 py-2 rounded-md">
            Back to Shop
          </Link>
        </div>
      )}
    </div>
  );
};

export default Category;

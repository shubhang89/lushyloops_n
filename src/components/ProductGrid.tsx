
import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/data/products";

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-medium">No products found</h2>
        <p className="text-muted-foreground mt-2">
          Try a different category or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="my-8">
      {title && (
        <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

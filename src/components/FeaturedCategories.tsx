
import React from "react";
import { Link } from "react-router-dom";
import { categories } from "@/data/products";

const FeaturedCategories = () => {
  // Images for each category
  const categoryImages = {
    keychain: "/lovable-uploads/1899aebd-bf21-4eb6-81f5-2f5e58af5138.png",
    pot: "/lovable-uploads/69327515-570a-4348-98e0-fa3c08266db2.png",
    bouquet: "/lovable-uploads/c19eacb2-1007-47a3-acc4-394ae7e24705.png",
    flowers: "/lovable-uploads/532920b0-0dc2-4ab4-a0be-58a44d8421d4.png",
  };

  return (
    <div className="py-12 bg-beige-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Shop By Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group block relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-beige-100 relative">
                <img
                  src={categoryImages[category.id as keyof typeof categoryImages]}
                  alt={category.name}
                  className="w-full h-full object-contain p-4"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-beige-300 text-center py-3 px-4 transform transition-transform group-hover:translate-y-0 text-foreground font-medium">
                {category.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;

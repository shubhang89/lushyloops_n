
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Carousel from "@/components/Carousel";
import ProductGrid from "@/components/ProductGrid";
import FeaturedCategories from "@/components/FeaturedCategories";
import Newsletter from "@/components/Newsletter";
import { getFeaturedProducts } from "@/data/products";

const Home = () => {
  const slides = [
    {
      id: "1",
      image: "/lovable-uploads/ed5b9d3e-7b7b-4375-ab0c-1c491b9a0bb6.png",
      title: "Handcrafted Crochet Items",
      description: "Unique, beautiful, and made with love.",
      buttonText: "Shop Now",
      link: "/shop",
    },
    {
      id: "2",
      image: "/lovable-uploads/6f7bd96b-4657-4691-8cf5-b556328703df.png",
      title: "Adorable Animal Keychains",
      description: "Cute companions for your keys or bags.",
      buttonText: "Shop Keychains",
      link: "/category/keychain",
    },
    {
      id: "3",
      image: "/lovable-uploads/0cb4548b-6d86-4a20-9349-b419e0ca6852.png",
      title: "Stylish Plant Pots",
      description: "Elevate your plants with our crochet pots.",
      buttonText: "Shop Pots",
      link: "/category/pot",
    },
    {
      id: "4",
      image: "/lovable-uploads/ef0fe840-3b72-4a13-9c63-a6fcb2ba635d.png",
      title: "Forever Blooming Bouquets",
      description: "Flowers that never wilt and always bring joy.",
      buttonText: "Shop Bouquets",
      link: "/category/bouquet",
    },
  ];

  return (
    <div>
      {/* Hero Carousel */}
      <Carousel slides={slides} />

      {/* Featured Categories */}
      <FeaturedCategories />

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link to="/shop">
            <Button variant="outline" className="flex items-center gap-2">
              View All <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
        <ProductGrid products={getFeaturedProducts()} />
      </div>

      {/* Newsletter Section */}
      <Newsletter />

      {/* About Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About LushyLoops</h2>
            <p className="text-lg mb-6">
              LushyLoops was born from a passion for crochet and a love for creating unique, 
              handcrafted items that bring joy and warmth to everyday life.
            </p>
            <p className="text-lg mb-8">
              Each item is carefully crafted with attention to detail, using high-quality 
              materials to ensure durability and beauty that lasts.
            </p>
            <Link to="/shop">
              <Button className="btn-primary px-8 py-6">
                Explore Our Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

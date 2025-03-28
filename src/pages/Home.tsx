
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
      image: "/lovable-uploads/6ffe79d1-a640-4e6c-b8aa-0d439e9cc707.png",
      title: "Handcrafted Crochet Items",
      description: "Unique, beautiful, and made with love.",
      buttonText: "Shop Now",
      link: "/shop",
    },
    {
      id: "2",
      image: "/lovable-uploads/b846a6a2-0f49-4531-af92-b15cfc5209f3.png",
      title: "Adorable Animal Keychains",
      description: "Cute companions for your keys or bags.",
      buttonText: "Shop Keychains",
      link: "/category/keychain",
    },
    {
      id: "3",
      image: "/lovable-uploads/7f1dae90-18c3-4d87-859d-02b5caca0e5c.png",
      title: "Stylish Plant Pots",
      description: "Elevate your plants with our crochet pots.",
      buttonText: "Shop Pots",
      link: "/category/pot",
    },
    {
      id: "4",
      image: "/lovable-uploads/c19eacb2-1007-47a3-acc4-394ae7e24705.png",
      title: "Forever Blooming Bouquets",
      description: "Flowers that never wilt and always bring joy.",
      buttonText: "Shop Bouquets",
      link: "/category/bouquet",
    },
    {
      id: "5",
      image: "/lovable-uploads/532920b0-0dc2-4ab4-a0be-58a44d8421d4.png",
      title: "Decorative Flowers",
      description: "Add a touch of nature to your home decor.",
      buttonText: "Shop Flowers",
      link: "/category/flowers",
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


import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Carousel from "@/components/Carousel";
import ProductGrid from "@/components/ProductGrid";
import FeaturedCategories from "@/components/FeaturedCategories";
import Newsletter from "@/components/Newsletter";
import { getFeaturedProducts } from "@/data/products";
import { motion } from "framer-motion";

const Home = () => {
  const slides = [
    {
      id: "1",
      image: "/public/lovable-uploads/1.jpeg",
      title: "Handcrafted Crochet Items",
      description: "Unique, beautiful, and made with love.",
      buttonText: "Shop Now",
      link: "/shop",
    },
    {
      id: "2",
      image: "/public/lovable-uploads/2.jpeg",
      title: "Adorable Animal Keychains",
      description: "Cute companions for your keys or bags.",
      buttonText: "Shop Keychains",
      link: "/category/keychain",
    },
    {
      id: "3",
      image: "/public/lovable-uploads/3.jpeg",
      title: "Stylish Plant Pots",
      description: "Elevate your plants with our crochet pots.",
      buttonText: "Shop Pots",
      link: "/category/pot",
    },
    {
      id: "4",
      image: "/public/lovable-uploads/4.jpeg",
      title: "Forever Blooming Bouquets",
      description: "Flowers that never wilt and always bring joy.",
      buttonText: "Shop Bouquets",
      link: "/category/bouquet",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div>
      {/* Hero Carousel */}
      <Carousel slides={slides} />

      {/* Featured Categories */}
      <FeaturedCategories />

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 className="text-3xl font-bold" variants={itemVariants}>
            Featured Products
          </motion.h2>
          <motion.div variants={itemVariants}>
            <Link to="/shop">
              <Button variant="outline" className="flex items-center gap-2 group">
                View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        <ProductGrid products={getFeaturedProducts()} />
      </div>

      {/* Newsletter Section */}
      <Newsletter />

      {/* About Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h2 className="text-3xl font-bold mb-6" variants={itemVariants}>
              About LushyLoops
            </motion.h2>
            <motion.p className="text-lg mb-6" variants={itemVariants}>
              LushyLoops was born from a passion for crochet and a love for creating unique, 
              handcrafted items that bring joy and warmth to everyday life.
            </motion.p>
            <motion.p className="text-lg mb-8" variants={itemVariants}>
              Each item is carefully crafted with attention to detail, using high-quality 
              materials to ensure durability and beauty that lasts.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link to="/shop">
                <Button className="btn-primary px-8 py-6 hover:scale-105 transition-transform">
                  Explore Our Collection
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;

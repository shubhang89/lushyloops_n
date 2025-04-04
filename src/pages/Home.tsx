
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
      image: "/lovable-uploads/1.jpeg",
      title: "Handcrafted Crochet Items",
      description: "Unique, beautiful, and made with love.",
      buttonText: "Shop Now",
      link: "/shop",
    },
    {
      id: "2",
      image: "/lovable-uploads/2.jpeg",
      title: "Adorable Animal Keychains",
      description: "Cute companions for your keys or bags.",
      buttonText: "Shop Keychains",
      link: "/category/keychain",
    },
    {
      id: "3",
      image: "/lovable-uploads/3.jpeg",
      title: "Stylish Plant Pots",
      description: "Elevate your plants with our crochet pots.",
      buttonText: "Shop Pots",
      link: "/category/pot",
    },
    {
      id: "4",
      image: "/lovable-uploads/4.jpeg",
      title: "Forever Blooming Bouquets",
      description: "Flowers that never wilt and always bring joy.",
      buttonText: "Shop Bouquets",
      link: "/category/bouquet",
    },
    {
      id: "5",
      image: "/lovable-uploads/k1.jpeg",
      title: "Cute Crochet Keychains",
      description: "Add a touch of handmade charm to your everyday essentials.",
      buttonText: "View Collection",
      link: "/category/keychain",
    },
    {
      id: "6",
      image: "/lovable-uploads/p1.jpeg",
      title: "Decorative Plant Holders",
      description: "Elegant crochet pots to showcase your favorite plants.",
      buttonText: "View Collection",
      link: "/category/pot",
    },
    {
      id: "7",
      image: "/lovable-uploads/b1.jpeg",
      title: "Crochet Flower Bouquets",
      description: "Everlasting bouquets that bring perpetual joy to any space.",
      buttonText: "View Collection",
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
      <motion.div 
        className="container mx-auto px-4 py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl font-bold" 
            variants={itemVariants}
            whileHover={{ scale: 1.05, color: "#967a4c" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Featured Products
          </motion.h2>
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
          >
            <Link to="/shop">
              <Button variant="outline" className="flex items-center gap-2 group">
                View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        <ProductGrid products={getFeaturedProducts()} />
      </motion.div>

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
            <motion.h2 
              className="text-3xl font-bold mb-6" 
              variants={itemVariants}
              whileHover={{ scale: 1.05, color: "#967a4c" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              About LushyLoops
            </motion.h2>
            <motion.p 
              className="text-lg mb-6" 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              LushyLoops was born from a passion for crochet and a love for creating unique, 
              handcrafted items that bring joy and warmth to everyday life.
            </motion.p>
            <motion.p 
              className="text-lg mb-8" 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              Each item is carefully crafted with attention to detail, using high-quality 
              materials to ensure durability and beauty that lasts.
            </motion.p>
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
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

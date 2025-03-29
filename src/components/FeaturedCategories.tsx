
import React from "react";
import { Link } from "react-router-dom";
import { categories } from "@/data/products";
import { motion } from "framer-motion";

const FeaturedCategories = () => {
  // Images for each category
  const categoryImages = {
    keychain: "/public/lovable-uploads/k1.jpeg",
    pot: "/public/lovable-uploads/p1.jpeg",
    bouquet: "/public/lovable-uploads/b1.jpeg",
    flowers: "/public/lovable-uploads/f1.jpeg",
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="py-16 bg-gradient-to-b from-white to-beige-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Shop By Category
        </motion.h2>
        <motion.p 
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore our unique handcrafted collections, each made with love and attention to detail
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <Link
                to={`/category/${category.id}`}
                className="group block relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="h-56 bg-beige-100 relative">
                  <img
                    src={categoryImages[category.id as keyof typeof categoryImages]}
                    alt={category.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-beige-300 text-center py-4 px-4 text-foreground font-medium transition-all duration-300 group-hover:bg-beige-400">
                  <span className="relative z-10">{category.name}</span>
                  <span className="absolute inset-0 bg-beige-400 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedCategories;

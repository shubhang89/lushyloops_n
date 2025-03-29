
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, Heart, MapPin } from "lucide-react";
import { addSubscriber } from "@/data/subscribers";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Footer = () => {
  const navigate = useNavigate();
  
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    
    if (emailInput && emailInput.value) {
      try {
        addSubscriber(emailInput.value);
        toast({
          title: "Successfully subscribed!",
          description: "Thank you for subscribing to our newsletter.",
        });
        emailInput.value = '';
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: "Subscription failed",
            description: error.message,
            variant: "destructive",
          });
        }
      }
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  const socialLinks = [
    {
      name: "Instagram",
      icon: <Instagram size={20} />,
      url: "https://www.instagram.com/lushyloops_?igsh=b3R1bjl3NnFmM3N0",
    },
    {
      name: "Facebook",
      icon: <Facebook size={20} />,
      url: "https://www.facebook.com/share/15zQKSwmBt/?mibextid=wwXIfr",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <footer className="bg-gradient-to-r from-beige-50 to-beige-100 text-foreground">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial="hidden" 
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* About section */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-xl font-semibold">About LushyLoops</h3>
            <p className="text-sm leading-relaxed">
              LushyLoops offers handcrafted crochet items made with love and care.
              Each piece tells a story and brings a touch of warmth to your everyday life.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-beige-600 transition-colors duration-300 flex items-center justify-center bg-beige-200 p-2 rounded-full"
                  whileHover={{ scale: 1.1, backgroundColor: "#f0e6d2" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-beige-600 transition-colors duration-200 flex items-center gap-1">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-beige-600 transition-colors duration-200 flex items-center gap-1">
                  <span>Shop All</span>
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-beige-600 transition-colors duration-200 flex items-center gap-1">
                  <span>Cart</span>
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-beige-600 transition-colors duration-200 flex items-center gap-1">
                  <span>Wishlist</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-beige-600 transition-colors duration-200 flex items-center gap-1">
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-beige-600 transition-colors duration-200 flex items-center gap-1">
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-xl font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleCategoryClick('keychain')} 
                  className="hover:text-beige-600 transition-colors duration-200 flex items-center gap-1 cursor-pointer"
                >
                  <span>Keychains</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('pot')} 
                  className="hover:text-beige-600 transition-colors duration-200 flex items-center gap-1 cursor-pointer"
                >
                  <span>Pots & Holders</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('bouquet')} 
                  className="hover:text-beige-600 transition-colors duration-200 flex items-center gap-1 cursor-pointer"
                >
                  <span>Bouquets</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('flowers')} 
                  className="hover:text-beige-600 transition-colors duration-200 flex items-center gap-1 cursor-pointer"
                >
                  <span>Flowers</span>
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <MapPin size={16} className="mr-2 text-beige-500" />
                <span>Vidyanagar Hubli, Karnataka, India</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-beige-500" />
                <a 
                  href="mailto:shubhanggangolli2002@gmail.com" 
                  className="hover:text-beige-600 transition-colors"
                >
                  shubhanggangolli2002@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-beige-500" />
                <span>+91-9164800703</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Subscribe to our newsletter</h4>
              <form onSubmit={handleSubscribe} className="flex">
                <Input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm border border-beige-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-beige-400"
                  required
                />
                <Button 
                  type="submit" 
                  className="bg-beige-400 px-3 py-2 text-sm font-medium rounded-r-md hover:bg-beige-500 transition-colors"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="border-t border-beige-200 mt-10 pt-8 text-center text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="flex items-center justify-center gap-1 mb-2">
            <span>Handcrafted with</span> <Heart size={14} className="text-beige-500 fill-beige-500" /> <span>by LushyLoops</span>
          </p>
          <p>
            &copy; {new Date().getFullYear()} LushyLoops. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

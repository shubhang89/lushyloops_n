
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-beige-500 transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium">About</span>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">About LushyLoops</h1>
        
        <div className="mb-12 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <img 
              src="/lovable-uploads/7f1dae90-18c3-4d87-859d-02b5caca0e5c.png" 
              alt="Crochet items" 
              className="rounded-lg shadow-md w-full"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="mb-4 text-gray-700">
              LushyLoops began as a small passion project in 2018, driven by our founder's love for crochet and handmade crafts. What started as a hobby quickly blossomed into a thriving business dedicated to bringing joy through handcrafted crochet items.
            </p>
            <p className="text-gray-700">
              Today, we're proud to offer a wide range of crocheted products, from adorable keychains to beautiful home decor items, all made with love and attention to detail.
            </p>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">Our Mission</h2>
          <p className="text-center text-gray-700 max-w-2xl mx-auto">
            At LushyLoops, our mission is to preserve and promote the art of crochet by creating high-quality, handcrafted items that bring warmth and character to everyday life. We believe in sustainable crafting and supporting local artisans.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-beige-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Handmade Quality</h3>
            <p className="text-gray-700">
              Every item is carefully crafted by hand, ensuring unique pieces with attention to detail that mass production can't match.
            </p>
          </div>
          
          <div className="bg-beige-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Sustainable Materials</h3>
            <p className="text-gray-700">
              We're committed to using eco-friendly yarns and materials whenever possible, minimizing our environmental footprint.
            </p>
          </div>
          
          <div className="bg-beige-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Community Support</h3>
            <p className="text-gray-700">
              We regularly collaborate with local artisans and donate a portion of our profits to craft education programs.
            </p>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-4">Visit Our Shop</h2>
          <p className="text-gray-700 mb-6">
            Explore our collection of handcrafted crochet items and find something special for yourself or a loved one.
          </p>
          <Link 
            to="/shop" 
            className="bg-beige-300 hover:bg-beige-400 text-foreground py-3 px-6 rounded-md inline-block transition-colors font-medium"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;

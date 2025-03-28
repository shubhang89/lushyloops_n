
import React from "react";
import { Link } from "react-router-dom";
import Carousel from "@/components/Carousel";
import ProductGrid from "@/components/ProductGrid";
import FeaturedCategories from "@/components/FeaturedCategories";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/data/products";

const Home = () => {
  const featuredProducts = getFeaturedProducts();

  const carouselSlides = [
    {
      image: "/placeholder.svg",
      title: "Handcrafted With Love",
      description: "Discover our collection of beautiful crochet items made with care.",
      buttonText: "Shop Now",
      link: "/shop",
    },
    {
      image: "/placeholder.svg",
      title: "New Flower Collection",
      description: "Flowers that never wilt. Perfect for home decor or gifts.",
      buttonText: "View Collection",
      link: "/category/flowers",
    },
    {
      image: "/placeholder.svg",
      title: "Unique Keychains",
      description: "Add a personal touch to your keys with our handmade keychains.",
      buttonText: "Explore",
      link: "/category/keychain",
    },
    {
      image: "/placeholder.svg",
      title: "Plant Pot Holders",
      description: "Beautiful crochet pots to showcase your favorite plants.",
      buttonText: "Shop Pots",
      link: "/category/pot",
    },
    {
      image: "/placeholder.svg",
      title: "Eternal Bouquets",
      description: "Gift a bouquet that lasts forever.",
      buttonText: "Shop Bouquets",
      link: "/category/bouquet",
    },
  ];

  return (
    <div>
      <Carousel slides={carouselSlides} />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to LushyLoops</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover our collection of handcrafted crochet items made with love and attention to detail.
            From keychains to plant pots, each piece is unique and adds charm to your everyday life.
          </p>
        </div>

        <ProductGrid 
          products={featuredProducts} 
          title="Featured Products" 
        />
        
        <div className="text-center mt-8">
          <Link to="/shop">
            <Button className="btn-primary px-8 py-6 text-lg rounded-md">
              View All Products
            </Button>
          </Link>
        </div>
      </div>

      <FeaturedCategories />

      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-beige-100 rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Newsletter</h2>
              <p className="text-muted-foreground">
                Stay updated on new products, special offers, and crochet inspiration.
              </p>
            </div>
            <div className="md:w-1/3 w-full">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-l-md border border-beige-300 focus:outline-none focus:ring-1 focus:ring-beige-400"
                />
                <Button className="btn-primary rounded-r-md">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

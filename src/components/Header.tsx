
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Menu, X, Search, FlowerIcon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/store/CartContext";
import { categories } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getTotalItems } = useCart();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const logoPath = "/lovable-uploads/5c90dad6-c56d-4996-9973-0b4f20fd0dc0.png";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    // Check if the search query matches any category name
    const matchedCategory = categories.find(category => 
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (matchedCategory) {
      navigate(`/category/${matchedCategory.id}`);
    } else {
      // Otherwise, navigate to shop with search query
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
    
    setSearchQuery("");
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-beige-50 to-beige-100 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.img 
              src={logoPath} 
              alt="LushyLoops" 
              className="h-12 md:h-14"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-foreground hover:text-beige-600 font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-beige-300">
              Home
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-beige-200 transition-colors duration-200">Products</NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white rounded-lg shadow-lg border border-beige-200">
                    <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                      {categories.map((category) => (
                        <li key={category.id}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={`/category/${category.id}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-beige-100 hover:text-beige-600"
                            >
                              <div className="text-sm font-medium leading-none">{category.name}</div>
                              <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                Explore our beautiful {category.name.toLowerCase()} collection
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                      <li className="col-span-2">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/shop"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-beige-100 hover:bg-beige-200"
                          >
                            <div className="text-sm font-medium leading-none flex items-center justify-center gap-2">
                              <span>View All Products</span>
                              <ExternalLink size={14} />
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Link to="/about" className="text-foreground hover:text-beige-600 font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-beige-300">
              About
            </Link>
            
            <Link to="/contact" className="text-foreground hover:text-beige-600 font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-beige-300">
              Contact
            </Link>
          </nav>

          {/* Search, Cart, and Wishlist */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative w-60">
              <Input 
                placeholder="Search products..." 
                className="pl-8 pr-4 py-2 border-beige-300 focus:border-beige-500 focus:ring-beige-400 rounded-full transition-all duration-300 hover:border-beige-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors">
                <Search className="h-4 w-4" />
              </button>
            </form>
            <Link to="/wishlist">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" className="relative p-2 rounded-full hover:bg-beige-200">
                  <Heart className="h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <Link to="/cart">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" className="relative p-2 rounded-full hover:bg-beige-200">
                  <ShoppingCart className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-beige-500 text-xs text-white">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link to="/cart" className="p-2 relative">
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-beige-500 text-xs text-white">
                  {getTotalItems()}
                </Badge>
              )}
            </Link>
            <button
              onClick={toggleMenu}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && isMobile && (
          <motion.nav 
            className="md:hidden pt-4 pb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSearchSubmit} className="flex items-center mb-4">
              <Input 
                placeholder="Search products..." 
                className="flex-1 pl-8 border-beige-300 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute left-6 h-4 w-4 text-muted-foreground">
                <Search className="h-4 w-4" />
              </button>
            </form>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-4 hover:bg-beige-200 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              
              <li className="py-2 px-4">
                <div className="font-medium">Products</div>
                <ul className="pl-4 mt-1 space-y-1">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        to={`/category/${category.id}`}
                        className="block py-1.5 px-2 hover:bg-beige-200 rounded-lg text-sm transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      to="/shop"
                      className="block py-1.5 px-2 hover:bg-beige-200 rounded-lg text-sm font-medium transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      View All Products
                    </Link>
                  </li>
                </ul>
              </li>
              
              <li>
                <Link
                  to="/about"
                  className="block py-2 px-4 hover:bg-beige-200 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              
              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-4 hover:bg-beige-200 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              
              <li>
                <Link
                  to="/wishlist"
                  className="block py-2 px-4 hover:bg-beige-200 rounded-lg flex items-center transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </div>
    </header>
  );
};

export default Header;

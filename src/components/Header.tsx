import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Menu, X, Search, FlowerIcon, Contact, Info } from "lucide-react";
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
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logoPath} 
              alt="LushyLoops" 
              className="h-10 md:h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-foreground hover:text-beige-500 font-medium">
              Home
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-beige-100">Products</NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white">
                    <ul className="grid gap-3 p-4 w-[200px]">
                      {categories.map((category) => (
                        <li key={category.id}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={`/category/${category.id}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-beige-100 hover:text-beige-500"
                            >
                              <div className="text-sm font-medium leading-none">{category.name}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/shop"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-beige-100 hover:text-beige-500"
                          >
                            <div className="text-sm font-medium leading-none">View All Products</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Link to="/about" className="text-foreground hover:text-beige-500 font-medium">
              About
            </Link>
            
            <Link to="/contact" className="text-foreground hover:text-beige-500 font-medium">
              Contact
            </Link>
          </nav>

          {/* Search, Cart, and Wishlist */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative w-60">
              <Input 
                placeholder="Search products..." 
                className="pl-8 pr-4 py-2 border-beige-300 focus:border-beige-400 focus:ring-beige-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground">
                <Search className="h-4 w-4" />
              </button>
            </form>
            <Link to="/wishlist">
              <Button variant="ghost" className="relative p-2">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" className="relative p-2">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-beige-300 text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link to="/cart" className="p-2 relative">
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-beige-300 text-xs">
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
          <nav className="md:hidden pt-4 pb-2 animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="flex items-center mb-4">
              <Input 
                placeholder="Search products..." 
                className="flex-1 pl-8 border-beige-300"
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
                  className="block py-2 px-4 hover:bg-beige-100 rounded"
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
                        className="block py-1.5 px-2 hover:bg-beige-100 rounded text-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      to="/shop"
                      className="block py-1.5 px-2 hover:bg-beige-100 rounded text-sm"
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
                  className="block py-2 px-4 hover:bg-beige-100 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              
              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-4 hover:bg-beige-100 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              
              <li>
                <Link
                  to="/wishlist"
                  className="block py-2 px-4 hover:bg-beige-100 rounded flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

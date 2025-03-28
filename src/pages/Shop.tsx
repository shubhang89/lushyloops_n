
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { products, categories } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);

  // Get query params
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get("category");
  const searchFromUrl = queryParams.get("search");
  
  // Set category and search from URL if present
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
    }
  }, [categoryFromUrl, searchFromUrl]);

  // Filter products based on search, category, and price range
  const filteredProducts = products.filter((product) => {
    // Search term filter
    const matchesSearch = searchTerm === "" || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === null || product.category === selectedCategory;
    
    // Price filter
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    
    // Update URL without full page reload
    const newParams = new URLSearchParams(location.search);
    if (categoryId) {
      newParams.set("category", categoryId);
    } else {
      newParams.delete("category");
    }
    
    navigate({
      pathname: location.pathname,
      search: newParams.toString()
    }, { replace: true });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL without full page reload
    const newParams = new URLSearchParams(location.search);
    if (searchTerm) {
      newParams.set("search", searchTerm);
    } else {
      newParams.delete("search");
    }
    
    navigate({
      pathname: location.pathname,
      search: newParams.toString()
    }, { replace: true });
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = parseInt(event.target.value);
    setPriceRange(prev => {
      const newRange = [...prev] as [number, number];
      newRange[index] = newValue;
      return newRange;
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    setPriceRange([0, 100]);
    
    // Clear URL params
    navigate(location.pathname);
  };

  const maxPrice = Math.max(...products.map(product => product.price));

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          <div 
            className={`cursor-pointer ${selectedCategory === null ? 'font-semibold text-beige-500' : ''}`}
            onClick={() => handleCategoryChange(null)}
          >
            All Categories
          </div>
          {categories.map((category) => (
            <div
              key={category.id}
              className={`cursor-pointer ${selectedCategory === category.id ? 'font-semibold text-beige-500' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Price Range</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>₹{priceRange[0].toFixed(2)}</span>
            <span>₹{priceRange[1].toFixed(2)}</span>
          </div>
          <div className="flex flex-col space-y-2">
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              className="w-full"
            />
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <Button 
        variant="outline" 
        onClick={clearFilters}
        className="w-full mt-4"
      >
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shop All Products</h1>
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle>Filters</SheetTitle>
              <div className="mt-6">
                <FiltersContent />
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filters for desktop */}
        {!isMobile && (
          <div className="md:w-1/4 lg:w-1/5">
            <FiltersContent />
          </div>
        )}

        {/* Main content */}
        <div className={`${isMobile ? 'w-full' : 'md:w-3/4 lg:w-4/5'}`}>
          <div className="mb-6">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 py-6"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </form>
          </div>

          {/* Active filters */}
          {(selectedCategory || searchTerm || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategory && (
                <Badge variant="secondary" className="px-3 py-1">
                  {categories.find(c => c.id === selectedCategory)?.name}
                  <button 
                    className="ml-2" 
                    onClick={() => handleCategoryChange(null)}
                  >
                    &times;
                  </button>
                </Badge>
              )}
              {searchTerm && (
                <Badge variant="secondary" className="px-3 py-1">
                  Search: {searchTerm}
                  <button 
                    className="ml-2" 
                    onClick={() => {
                      setSearchTerm("");
                      const newParams = new URLSearchParams(location.search);
                      newParams.delete("search");
                      navigate({
                        pathname: location.pathname,
                        search: newParams.toString()
                      }, { replace: true });
                    }}
                  >
                    &times;
                  </button>
                </Badge>
              )}
              {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                <Badge variant="secondary" className="px-3 py-1">
                  Price: ₹{priceRange[0].toFixed(2)} - ₹{priceRange[1].toFixed(2)}
                  <button 
                    className="ml-2" 
                    onClick={() => setPriceRange([0, maxPrice])}
                  >
                    &times;
                  </button>
                </Badge>
              )}
              <Button 
                variant="ghost" 
                className="text-sm h-8" 
                onClick={clearFilters}
              >
                Clear All
              </Button>
            </div>
          )}

          {/* Results count */}
          <div className="mb-6 text-muted-foreground">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </div>

          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default Shop;

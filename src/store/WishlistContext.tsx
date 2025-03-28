
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";
import { toast } from "@/components/ui/use-toast";

interface WishlistContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleItem: (product: Product) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>([]);

  // Load wishlist from localStorage when component mounts
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    setItems((prevItems) => {
      if (prevItems.some((item) => item.id === product.id)) {
        return prevItems;
      }
      
      toast({
        title: "Added to wishlist",
        description: `${product.name} added to your wishlist.`,
      });
      
      return [...prevItems, product];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== productId);
      
      if (newItems.length < prevItems.length) {
        const removedItem = prevItems.find((item) => item.id === productId);
        if (removedItem) {
          toast({
            title: "Removed from wishlist",
            description: `${removedItem.name} removed from your wishlist.`,
          });
        }
      }
      
      return newItems;
    });
  };

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.id === productId);
  };

  const toggleItem = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  const clearWishlist = () => {
    setItems([]);
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        toggleItem,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

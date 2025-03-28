
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";
import { toast } from "@/components/ui/use-toast";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity = 1) => {
    if (product.inventoryCount <= 0) {
      toast({
        title: "Out of stock",
        description: "Sorry, this item is currently out of stock.",
        variant: "destructive",
      });
      return;
    }

    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        
        // Check if adding would exceed inventory
        if (newQuantity > product.inventoryCount) {
          toast({
            title: "Limited stock",
            description: `Sorry, only ${product.inventoryCount} items available.`,
            variant: "destructive",
          });
          
          // Set to max available
          return prevItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: product.inventoryCount }
              : item
          );
        }
        
        // Add to existing quantity
        toast({
          title: "Added to cart",
          description: `${product.name} quantity updated in cart.`,
        });
        
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      // Add new item
      toast({
        title: "Added to cart",
        description: `${product.name} added to your cart.`,
      });
      
      return [...prevItems, { product, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.product.id !== productId);
      
      if (newItems.length < prevItems.length) {
        const removedItem = prevItems.find((item) => item.product.id === productId);
        if (removedItem) {
          toast({
            title: "Removed from cart",
            description: `${removedItem.product.name} removed from your cart.`,
          });
        }
      }
      
      return newItems;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === productId);
      
      if (!existingItem) return prevItems;
      
      // Check if update would exceed inventory
      if (quantity > existingItem.product.inventoryCount) {
        toast({
          title: "Limited stock",
          description: `Sorry, only ${existingItem.product.inventoryCount} items available.`,
          variant: "destructive",
        });
        
        return prevItems.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: existingItem.product.inventoryCount }
            : item
        );
      }
      
      return prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const getTotalPrice = () => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

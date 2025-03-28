
import React from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2, ShoppingCart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/store/WishlistContext";
import { useCart } from "@/store/CartContext";
import { Separator } from "@/components/ui/separator";

const Wishlist = () => {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
        <div className="text-center py-12 bg-beige-50 rounded-lg">
          <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-medium mb-4">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Save items you love to your wishlist and find them all in one place.
          </p>
          <Link to="/shop">
            <Button className="btn-primary px-6 py-6 text-lg">
              Discover Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-beige-500 transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium">Wishlist</span>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Wishlist</h1>
        <Button 
          variant="ghost" 
          className="text-muted-foreground"
          onClick={clearWishlist}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Wishlist
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => (
            <div 
              key={product.id} 
              className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-contain bg-beige-50"
                  />
                </Link>
                <button
                  onClick={() => removeItem(product.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all text-beige-500"
                >
                  <Heart
                    size={20}
                    className="fill-beige-500"
                  />
                </button>
              </div>
              
              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-medium text-lg mb-1 hover:text-beige-500 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-semibold">${product.price.toFixed(2)}</span>
                  {product.inventoryCount > 0 ? (
                    <span className="text-green-600 text-sm">In Stock</span>
                  ) : (
                    <span className="text-red-500 text-sm">Out of Stock</span>
                  )}
                </div>
                
                <Separator className="my-3" />
                
                <div className="flex justify-between gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => removeItem(product.id)}
                  >
                    Remove
                  </Button>
                  <Button
                    className="btn-primary flex-1"
                    onClick={() => addItem(product)}
                    disabled={product.inventoryCount === 0}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;

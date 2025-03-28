
import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { useCart } from "@/store/CartContext";
import { useWishlist } from "@/store/WishlistContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };
  
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card block">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-contain bg-beige-50"
        />
        <button
          onClick={handleToggleWishlist}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all"
        >
          <Heart
            size={20}
            className={inWishlist ? "fill-beige-500 text-beige-500" : "text-gray-400"}
          />
        </button>
        {product.inventoryCount <= 3 && product.inventoryCount > 0 && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded">
            Only {product.inventoryCount} left!
          </div>
        )}
        {product.inventoryCount === 0 && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
            Out of stock
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="font-semibold">₹{product.price.toLocaleString('en-IN')}</span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="btn-primary rounded-full flex items-center gap-1.5"
            disabled={product.inventoryCount === 0}
          >
            <ShoppingCart size={16} /> Add
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

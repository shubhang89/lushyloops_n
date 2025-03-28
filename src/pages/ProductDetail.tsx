
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Heart, 
  ShoppingCart, 
  Minus, 
  Plus, 
  ChevronRight, 
  AlertTriangle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductById, categories } from "@/data/products";
import { useCart } from "@/store/CartContext";
import { useWishlist } from "@/store/WishlistContext";
import ProductGrid from "@/components/ProductGrid";
import { getProductsByCategory } from "@/data/products";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  
  if (!productId) {
    navigate("/shop");
    return null;
  }

  const product = getProductById(productId);
  
  if (!product) {
    navigate("/shop");
    return null;
  }

  const category = categories.find((c) => c.id === product.category);
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);
  
  const inWishlist = isInWishlist(product.id);
  
  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, Math.min(product.inventoryCount, quantity + value));
    setQuantity(newQuantity);
  };
  
  const handleAddToCart = () => {
    addItem(product, quantity);
  };
  
  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate("/cart");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-beige-500 transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link to="/shop" className="hover:text-beige-500 transition-colors">
          Shop
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        {category && (
          <>
            <Link 
              to={`/category/${category.id}`} 
              className="hover:text-beige-500 transition-colors"
            >
              {category.name}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
          </>
        )}
        <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="bg-beige-50 rounded-lg overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain p-8"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="text-2xl font-semibold mb-4">
            ${product.price.toFixed(2)}
          </div>
          
          <p className="text-muted-foreground mb-6">
            {product.description}
          </p>

          {/* Inventory Status */}
          {product.inventoryCount > 0 ? (
            <div className="flex items-center mb-6">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-green-600 font-medium">
                In Stock
              </span>
              <span className="text-muted-foreground ml-2">
                ({product.inventoryCount} available)
              </span>
            </div>
          ) : (
            <div className="flex items-center mb-6 text-red-500">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span className="font-medium">Out of Stock</span>
            </div>
          )}

          {/* Category */}
          <div className="mb-6">
            <span className="text-muted-foreground">Category: </span>
            {category && (
              <Link
                to={`/category/${category.id}`}
                className="text-beige-500 hover:underline"
              >
                {category.name}
              </Link>
            )}
          </div>

          {/* Quantity */}
          {product.inventoryCount > 0 && (
            <div className="mb-6">
              <label className="text-foreground font-medium block mb-2">
                Quantity:
              </label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.inventoryCount}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <Button
              className="btn-primary flex-1 py-6"
              onClick={handleAddToCart}
              disabled={product.inventoryCount === 0}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              className="btn-secondary flex-1 py-6"
              onClick={handleBuyNow}
              disabled={product.inventoryCount === 0}
            >
              Buy Now
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-14 w-14"
              onClick={() => toggleItem(product)}
            >
              <Heart 
                className={`h-6 w-6 ${inWishlist ? 'fill-beige-500 text-beige-500' : ''}`} 
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-border pt-12">
          <ProductGrid
            title={`More ${category?.name || 'Products'} You Might Like`}
            products={relatedProducts}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

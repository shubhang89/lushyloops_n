
import React from "react";
import { Link } from "react-router-dom";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/CartContext";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

const Cart = () => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    getTotalPrice, 
    getTotalItems 
  } = useCart();

  const handleCheckout = () => {
    toast({
      title: "Checkout Initiated",
      description: "This would normally redirect to a payment page.",
    });
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="text-center py-12 bg-beige-50 rounded-lg">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/shop">
            <Button className="btn-primary px-6 py-6 text-lg">
              Start Shopping
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
        <span className="text-foreground font-medium">Cart</span>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Items ({getTotalItems()})
              </h2>
              <Button 
                variant="ghost" 
                className="text-muted-foreground text-sm h-8"
                onClick={clearCart}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>
            
            <Separator className="mb-6" />
            
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-beige-50 rounded flex-shrink-0">
                    <Link to={`/product/${item.product.id}`}>
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </Link>
                  </div>
                  
                  <div className="flex-1">
                    <Link to={`/product/${item.product.id}`}>
                      <h3 className="font-medium hover:text-beige-500 transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    <div className="text-muted-foreground text-sm mt-1">
                      ₹{item.product.price.toLocaleString('en-IN')} each
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center font-medium text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.inventoryCount}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <Separator className="mb-4" />
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{getTotalPrice().toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <Separator className="mb-4" />
            
            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Total</span>
              <span>₹{getTotalPrice().toLocaleString('en-IN')}</span>
            </div>
            
            <Button
              className="btn-primary w-full py-6 text-lg"
              onClick={handleCheckout}
            >
              Checkout <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            
            <div className="mt-4 text-center">
              <Link 
                to="/shop" 
                className="text-beige-500 hover:underline text-sm inline-flex items-center"
              >
                <ChevronRight className="h-4 w-4 mr-1" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

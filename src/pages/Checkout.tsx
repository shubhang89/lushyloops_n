
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/CartContext";

const Checkout = () => {
  const { items, clearCart, getTotalPrice } = useCart();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Google Form embed URL
  // Replace this with your actual Google Form embed URL
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScQZBB1zy1D6NIluLgZGZzxzKlcM1R_yJyfaD3-9yvI-LQZ6w/viewform?embedded=true";
  
  // Calculate cart total using the getTotalPrice function from context
  const cartTotal = getTotalPrice();

  const handleOrderComplete = () => {
    // Clear the cart after successful checkout
    clearCart();
    // Show success message
    setFormSubmitted(true);
  };

  return (
    <div className="py-12 px-4 bg-gradient-to-b from-white to-beige-50 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Order summary section */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-4 bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold mb-6 border-b pb-4">Order Summary</h2>
            
            {items.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <motion.div 
                      key={item.product.id} 
                      className="flex justify-between items-center"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-center">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name} 
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div>
                          <h4 className="font-medium">{item.product.name}</h4>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center font-medium mb-2">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                    <span>Shipping</span>
                    <span>Calculated at next step</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-lg mt-4 pt-4 border-t">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
          
          {/* Checkout form section */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-8 bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold mb-6 border-b pb-4">Checkout</h2>
            
            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-10"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Thank You For Your Order!</h3>
                <p className="text-gray-600 mb-6">Your order has been received and is being processed.</p>
                <Button 
                  onClick={() => window.location.href = "/"}
                  className="btn-primary"
                >
                  Continue Shopping
                </Button>
              </motion.div>
            ) : (
              <div className="h-[600px]">
                <iframe 
                  src={googleFormUrl} 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  marginHeight={0} 
                  marginWidth={0}
                  title="Checkout Form"
                >
                  Loading form...
                </iframe>
                
                <div className="mt-6 flex justify-end">
                  <Button 
                    onClick={handleOrderComplete}
                    className="btn-primary"
                  >
                    Complete Order
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;

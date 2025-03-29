
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-beige-500 transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium">Contact</span>
      </div>

      <motion.div 
        className="max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-3xl font-bold mb-6 text-center" 
          variants={itemVariants}
        >
          Contact Us
        </motion.h1>
        
        <div className="flex flex-col md:flex-row gap-12 mb-12">
          <motion.div 
            className="md:w-1/2"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
            <p className="text-gray-700 mb-8">
              Have a question about our products or want to place a custom order? 
              Fill out the form and we'll get back to you as soon as possible.
            </p>
            
            <div className="space-y-6">
              <motion.div 
                className="flex items-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin className="h-5 w-5 text-beige-500 mr-4 mt-1" />
                <div>
                  <h3 className="font-medium">Our Location</h3>
                  <p className="text-gray-700">Vidyanagar Hubli, Karnataka, India</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="h-5 w-5 text-beige-500 mr-4 mt-1" />
                <div>
                  <h3 className="font-medium">Email Us</h3>
                  <p className="text-gray-700">
                    <a href="mailto:shubhanggangolli2002@gmail.com" className="hover:text-beige-600 transition-colors">
                      shubhanggangolli2002@gmail.com
                    </a>
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Phone className="h-5 w-5 text-beige-500 mr-4 mt-1" />
                <div>
                  <h3 className="font-medium">Call Us</h3>
                  <p className="text-gray-700">+91-9164800703</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            variants={itemVariants}
          >
            <motion.form 
              onSubmit={handleSubmit} 
              className="bg-beige-50 p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 font-medium">
                  Your Name
                </label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border-beige-300 focus:border-beige-400"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 font-medium">
                  Your Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-beige-300 focus:border-beige-400"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 font-medium">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full border-beige-300 focus:border-beige-400"
                />
              </div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  type="submit" 
                  className="w-full bg-beige-300 hover:bg-beige-400 text-foreground"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
        
        <motion.div 
          className="mb-12"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Visit Our Shop</h2>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15373.671033266923!2d75.1238946!3d15.359893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d7d9810d0a75%3A0xd8e4ee167f307f77!2sVidya%20Nagar%2C%20Hubballi%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1656565400000!5m2!1sen!2sin" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="LushyLoops location"
              className="w-full h-full"
            ></iframe>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;

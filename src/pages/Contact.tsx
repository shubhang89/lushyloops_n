
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

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

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
        
        <div className="flex flex-col md:flex-row gap-12 mb-12">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
            <p className="text-gray-700 mb-8">
              Have a question about our products or want to place a custom order? 
              Fill out the form and we'll get back to you as soon as possible.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-beige-500 mr-4 mt-1" />
                <div>
                  <h3 className="font-medium">Our Location</h3>
                  <p className="text-gray-700">123 Crochet Lane, Craftsville, India 400001</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-beige-500 mr-4 mt-1" />
                <div>
                  <h3 className="font-medium">Email Us</h3>
                  <p className="text-gray-700">
                    <a href="mailto:shubhanggangolli2002@gmail.com" className="hover:text-beige-600 transition-colors">
                      shubhanggangolli2002@gmail.com
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-beige-500 mr-4 mt-1" />
                <div>
                  <h3 className="font-medium">Call Us</h3>
                  <p className="text-gray-700">+91-9164800703</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <form onSubmit={handleSubmit} className="bg-beige-50 p-6 rounded-lg shadow-sm">
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
              
              <Button 
                type="submit" 
                className="w-full bg-beige-300 hover:bg-beige-400 text-foreground"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Visit Our Shop</h2>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.03900799053!2d72.88118615!3d19.08205745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1656565400000!5m2!1sen!2sin" 
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
        </div>
      </div>
    </div>
  );
};

export default Contact;

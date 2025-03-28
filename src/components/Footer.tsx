
import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, Phone } from "lucide-react";
import { addSubscriber } from "@/data/subscribers";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    
    if (emailInput && emailInput.value) {
      try {
        addSubscriber(emailInput.value);
        toast({
          title: "Successfully subscribed!",
          description: "Thank you for subscribing to our newsletter.",
        });
        emailInput.value = '';
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: "Subscription failed",
            description: error.message,
            variant: "destructive",
          });
        }
      }
    }
  };

  return (
    <footer className="bg-beige-100 text-foreground">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About LushyLoops</h3>
            <p className="text-sm">
              LushyLoops offers handcrafted crochet items made with love and care.
              Each item is unique and made to bring joy to your everyday life.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-beige-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-beige-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-beige-500 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-beige-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-beige-500 transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-beige-500 transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-beige-500 transition-colors">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/category/keychain" className="hover:text-beige-500 transition-colors">
                  Keychains
                </Link>
              </li>
              <li>
                <Link to="/category/pot" className="hover:text-beige-500 transition-colors">
                  Pots & Holders
                </Link>
              </li>
              <li>
                <Link to="/category/bouquet" className="hover:text-beige-500 transition-colors">
                  Bouquets
                </Link>
              </li>
              <li>
                <Link to="/category/flowers" className="hover:text-beige-500 transition-colors">
                  Flowers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span>hello@lushyloops.com</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span>+91 9876543210</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Newsletter</h4>
              <form onSubmit={handleSubscribe} className="flex">
                <Input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm border border-beige-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-beige-400"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-beige-300 px-3 py-2 text-sm font-medium rounded-r-md hover:bg-beige-400 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-beige-200 mt-8 pt-6 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} LushyLoops. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

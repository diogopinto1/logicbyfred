import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import CartDrawer from "@/components/cart/CartDrawer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartDrawer />

      <main className="flex-1 flex items-center justify-center pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center px-6"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Lost in the Gallery
          </p>
          <h1 className="font-display text-6xl md:text-8xl mb-4">404</h1>
          <p className="font-body text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            This piece seems to have wandered off. Let's get you back to the collection.
          </p>
          <Link to="/" className="btn-gallery inline-block">
            Return to Gallery
          </Link>
        </motion.div>
      </main>
    </div>
  );
};

export default NotFound;

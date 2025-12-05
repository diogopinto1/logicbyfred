import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';

const Header = () => {
  const location = useLocation();
  const { openCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  const navLinks = [
    { href: '/', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-cream-dark/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-6 py-5 md:py-6">
        <nav className="relative flex items-center justify-between">
          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={cn(
                    'nav-link font-body text-sm tracking-wide uppercase transition-colors duration-300',
                    location.pathname === link.href
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Navigation (left-aligned) */}
          <ul className="flex md:hidden items-center gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={cn(
                    'font-body text-xs tracking-wide uppercase transition-colors duration-300',
                    location.pathname === link.href
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Logo */}
          <Link to="/" className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <img
              src={`${import.meta.env.BASE_URL}logo_bg.png`}
              alt="Logic by fred"
              className="h-6 md:h-4 lg:h-6 object-contain"
            />
          </Link>

          {/* Cart (right-aligned) */}
          <div className="ml-auto flex items-center gap-6 relative z-10">
            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 transition-colors duration-300 hover:text-accent"
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="cart-badge"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;

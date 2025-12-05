import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  const totalPrice = getTotalPrice();

  // Auto-close the drawer when the last item is removed
  useEffect(() => {
    if (isOpen && items.length === 0) {
      closeCart();
    }
  }, [items.length, isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display text-xl">Your Selection</h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-secondary rounded-sm transition-colors duration-300"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground mb-4" strokeWidth={1} />
                  <p className="font-display text-lg mb-2">Your collection is empty</p>
                  <p className="font-body text-sm text-muted-foreground mb-6">
                    Explore our gallery and find pieces that speak to you.
                  </p>
                  <Link
                    to="/"
                    onClick={closeCart}
                    className="btn-gallery-outline text-sm"
                  >
                    Browse Collection
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <motion.li
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-4 pb-6 border-b border-border"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-24 bg-secondary flex-shrink-0 overflow-hidden">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col">
                        <h3 className="font-display text-sm mb-1">{item.product.name}</h3>
                        <p className="font-body text-xs text-muted-foreground mb-2">
                          {item.size} / {item.color}
                        </p>
                        <p className="font-body text-sm">${item.product.price}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-auto">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.color,
                                item.quantity - 1
                              )
                            }
                            className="p-1 hover:bg-secondary rounded-sm transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                          <span className="font-body text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.color,
                                item.quantity + 1
                              )
                            }
                            className="p-1 hover:bg-secondary rounded-sm transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() =>
                          removeItem(item.product.id, item.size, item.color)
                        }
                        className="self-start p-1 hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-cream-dark">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-body text-sm uppercase tracking-wide">Total</span>
                  <span className="font-display text-xl">${totalPrice.toFixed(2)}</span>
                </div>
                <button className="w-full btn-gallery">
                  Proceed to Checkout
                </button>
                <p className="font-body text-xs text-muted-foreground text-center mt-4">
                  Shipping calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;

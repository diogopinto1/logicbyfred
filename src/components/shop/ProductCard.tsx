import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '@/store/cartStore';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.19, 1, 0.22, 1],
      }}
      className="group"
    >
      <Link
        to={`/product/${product.id}`}
        className="block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="product-card aspect-[3/4] bg-secondary mb-4 overflow-hidden relative">
          {/* Product Art Image */}
          <motion.img
            src={product.image}
            alt={`${product.name} - Wearable art by Logic by fred`}
            className={cn(
              'w-full h-full object-cover transition-all duration-700',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setImageLoaded(true)}
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          />

          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-secondary animate-pulse" />
          )}

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent pointer-events-none"
          />

          {/* View indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <span className="inline-block bg-background/90 backdrop-blur-sm px-4 py-2 font-body text-xs uppercase tracking-wider">
              Enter Gallery →
            </span>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <motion.h2
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
            className="font-display text-lg tracking-tight"
          >
            {product.name}
          </motion.h2>
          <p className="font-body text-sm text-muted-foreground">
            ${product.price}
          </p>
        </div>
      </Link>
    </motion.article>
  );
};

export default ProductCard;

import { motion } from 'framer-motion';
import { Product } from '@/store/cartStore';

interface Gallery2DFallbackProps {
  product: Product;
}

const Gallery2DFallback = ({ product }: Gallery2DFallbackProps) => {
  return (
    <div className="w-full h-full bg-gallery-wall flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="relative max-w-lg w-full"
      >
        {/* Frame */}
        <div className="gallery-frame bg-charcoal p-4 md:p-6">
          {/* Canvas with Product Image */}
          <div className="bg-warm-white aspect-[3/4] overflow-hidden relative">
            <img
              src={product.image}
              alt={`${product.name} - Gallery view`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Museum Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="museum-label mt-6 p-4 max-w-xs mx-auto text-center"
        >
          <h2 className="font-display text-lg mb-1">{product.name}</h2>
          <p className="font-body text-sm text-muted-foreground">
            {product.artist || 'fred'}, {product.year || '2024'}
          </p>
          <p className="font-body text-xs text-muted-foreground mt-2">
            {product.fabric}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Gallery2DFallback;

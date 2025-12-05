import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product, useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ProductPanelProps {
  product: Product;
}

const ProductPanel = ({ product }: ProductPanelProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    addItem(product, selectedSize, selectedColor);
    toast.success(`${product.name} added to your collection`);
    openCart();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
      className="bg-background/95 backdrop-blur-sm p-6 md:p-8 overflow-y-auto max-h-full"
    >
      {/* Back Link */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
        <span className="font-body text-sm">Back to Collection</span>
      </Link>

      {/* Product Title */}
      <div className="mb-6">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          {product.artist || 'fred'} — {product.year || '2024'}
        </p>
        <h1 className="font-display text-3xl md:text-4xl tracking-tight mb-2">
          {product.name}
        </h1>
        <p className="font-display text-2xl text-accent">${product.price}</p>
      </div>

      {/* Description */}
      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
        {product.description}
      </p>

      {/* Specifications */}
      <div className="space-y-4 mb-8 pb-8 border-b border-border">
        <div>
          <h3 className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">
            Fabric
          </h3>
          <p className="font-body text-sm">{product.fabric}</p>
        </div>
        <div>
          <h3 className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">
            Fit
          </h3>
          <p className="font-body text-sm">{product.fit}</p>
        </div>
      </div>

      {/* Color Selection */}
      <div className="mb-6">
        <h3 className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-3">
          Colorway — {selectedColor}
        </h3>
        <div className="flex gap-3">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={cn(
                'px-4 py-2 border font-body text-sm transition-all duration-300',
                selectedColor === color
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:border-primary'
              )}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="mb-8">
        <h3 className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-3">
          Size {selectedSize && `— ${selectedSize}`}
        </h3>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                'w-12 h-12 border font-body text-sm transition-all duration-300',
                selectedSize === size
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:border-primary'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button onClick={handleAddToCart} className="w-full btn-gallery">
          Add to Collection
        </button>
        <button className="w-full btn-gallery-outline">
          Buy Now
        </button>
      </div>

      {/* Care Instructions */}
      <div className="mt-8 pt-8 border-t border-border">
        <h3 className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-3">
          Care Instructions
        </h3>
        <ul className="space-y-2">
          {product.care.map((instruction, index) => (
            <li
              key={index}
              className="font-body text-sm text-muted-foreground flex items-center gap-2"
            >
              <Check className="w-3 h-3 text-accent" strokeWidth={2} />
              {instruction}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ProductPanel;

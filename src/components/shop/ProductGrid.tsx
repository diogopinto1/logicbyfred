import { products } from '@/data/products';
import ProductCard from './ProductCard';

const ProductGrid = () => {
  return (
    <section className="py-8" aria-labelledby="collection-heading">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2
            id="collection-heading"
            className="font-display text-3xl md:text-4xl mb-3"
          >
            The Collection
          </h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto">
            Each piece tells a story. Click to enter the gallery.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;

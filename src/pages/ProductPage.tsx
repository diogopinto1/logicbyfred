import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Suspense, lazy, useState } from 'react';
import { Box, Image } from 'lucide-react';
import { getProductById } from '@/data/products';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';
import Header from '@/components/layout/Header';
import CartDrawer from '@/components/cart/CartDrawer';
import ProductPanel from '@/components/gallery/ProductPanel';
import Gallery2DFallback from '@/components/gallery/Gallery2DFallback';

// Lazy load 3D scene for performance
const GalleryScene = lazy(() => import('@/components/gallery/GalleryScene'));

const GalleryLoader = () => (
  <div className="w-full h-full bg-gallery-wall flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="w-8 h-8 border-2 border-charcoal/20 border-t-charcoal rounded-full mx-auto mb-4"
      />
      <p className="font-body text-sm text-muted-foreground">
        Preparing the gallery...
      </p>
    </motion.div>
  </div>
);

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const { isSupported } = useWebGLSupport();
  const [view3D, setView3D] = useState(true);
  const [has3DError, setHas3DError] = useState(false);

  // Redirect if product not found
  if (!product) {
    return <Navigate to="/" replace />;
  }

  // Show 3D if WebGL supported and user wants 3D and no errors
  const show3D = isSupported && view3D && !has3DError;

  return (
    <>
      <Helmet>
        <title>{product.name} — Logic by fred</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={`${product.name} — Logic by fred`} />
        <meta property="og:description" content={product.description} />
        <link rel="canonical" href={`/product/${product.id}`} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <CartDrawer />

        <main className="flex-1 pt-16">
          <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
            {/* 3D Gallery / 2D Fallback */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex-1 min-h-[50vh] lg:min-h-full relative"
            >
              {/* View Toggle */}
              {isSupported && (
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <button
                    onClick={() => setView3D(true)}
                    className={`p-2 border transition-all duration-300 ${
                      view3D 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : 'bg-background/80 backdrop-blur-sm border-border hover:border-primary'
                    }`}
                    title="3D Gallery View"
                  >
                    <Box className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => setView3D(false)}
                    className={`p-2 border transition-all duration-300 ${
                      !view3D 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : 'bg-background/80 backdrop-blur-sm border-border hover:border-primary'
                    }`}
                    title="2D Gallery View"
                  >
                    <Image className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              )}

              {show3D ? (
                <Suspense fallback={<GalleryLoader />}>
                  <ErrorBoundary onError={() => setHas3DError(true)}>
                    <GalleryScene product={product} />
                  </ErrorBoundary>
                </Suspense>
              ) : isSupported === null ? (
                <GalleryLoader />
              ) : (
                <Gallery2DFallback product={product} />
              )}
            </motion.div>

            {/* Product Panel */}
            <div className="w-full lg:w-[420px] xl:w-[480px] border-l border-border">
              <ProductPanel product={product} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

// Simple error boundary component
import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  onError: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export default ProductPage;

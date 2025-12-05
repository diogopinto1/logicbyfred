import { Helmet } from 'react-helmet-async';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/shop/HeroSection';
import ProductGrid from '@/components/shop/ProductGrid';
import CartDrawer from '@/components/cart/CartDrawer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Logic by fred — Wearable Art</title>
        <meta
          name="description"
          content="Discover Logic by fred: a curated collection of artistic T-shirts where thought becomes textile. Each piece is a meditation on form, function, and the spaces between."
        />
        <meta property="og:title" content="Logic by fred — Wearable Art" />
        <meta
          property="og:description"
          content="Discover Logic by fred: a curated collection of artistic T-shirts where thought becomes textile."
        />
        <link rel="canonical" href="/" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <CartDrawer />

        <main className="flex-1 pt-20">
          <HeroSection />
          <ProductGrid />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;

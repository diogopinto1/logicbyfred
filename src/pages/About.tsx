import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About — Logic by fred</title>
        <meta
          name="description"
          content="Learn about Logic by fred, a label dedicated to creating wearable art that bridges thought and textile."
        />
        <link rel="canonical" href="/about" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <CartDrawer />

        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              className="max-w-2xl mx-auto"
            >
              {/* Header */}
              <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
                The Philosophy
              </p>
              <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-8">
                About the Label
              </h1>

              {/* Content */}
              <div className="space-y-6 font-body text-lg leading-relaxed text-muted-foreground">
                <p>
                  <span className="text-foreground font-display italic">Logic by fred</span> began 
                  as a question: what if clothing could carry the weight of ideas? What if a 
                  simple garment could become a canvas for contemplation?
                </p>

                <p>
                  Founded in 2024, the label exists at the intersection of fashion and philosophy. 
                  Each piece in our collection represents a meditation—on form and void, order 
                  and chaos, the seen and unseen.
                </p>

                <p>
                  We believe that what you wear shapes how you think. Our designs are intentionally 
                  abstract, inviting interpretation rather than demanding it. They are conversation 
                  starters, thought provokers, quiet statements of individuality.
                </p>

                <blockquote className="border-l-2 border-accent pl-6 my-8 font-display text-xl text-foreground italic">
                  "The best garments are those that make you pause, 
                  if only for a moment, to consider."
                </blockquote>

                <p>
                  Every piece is crafted from premium organic cotton, designed for longevity 
                  rather than trends. We produce in small batches, prioritizing quality and 
                  sustainability over volume.
                </p>

                <p>
                  Our gallery experience—both online and in the spaces we create—reflects our 
                  belief that purchasing art should feel like entering a museum. Each T-shirt 
                  deserves to be considered, appreciated, and ultimately chosen with intention.
                </p>
              </div>

              {/* Signature */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-16 pt-8 border-t border-border"
              >
                <p className="font-display text-2xl italic text-muted-foreground">
                  — fred
                </p>
                <p className="font-body text-sm text-muted-foreground mt-2">
                  Founder & Creative Director
                </p>
              </motion.div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;

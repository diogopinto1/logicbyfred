import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToCollection = () => {
    const collection = document.getElementById('collection-heading');
    if (collection) {
      collection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-body text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6"
          >
            Wearable Art Since 2024
          </motion.p>

          {/* Main Title */}
          <h1 className="sr-only">Logic by fred</h1>
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="Logic by fred"
            className="mx-auto mb-6 w-56 md:w-72 lg:w-80 object-contain"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12"
          >
            Where thought becomes textile. Each garment is a canvas, each design a meditation.
          </motion.p>

          {/* CTA */}
          <motion.button
            onClick={scrollToCollection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="group inline-flex flex-col items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <span className="font-body text-sm uppercase tracking-wider">
              Enter the Gallery
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-5 h-5" strokeWidth={1.5} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-terracotta/5 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute top-20 right-0 w-48 h-48 bg-gradient-to-bl from-sage/5 to-transparent rounded-full blur-3xl"
      />
    </section>
  );
};

export default HeroSection;

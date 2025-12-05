import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success('Message sent. We\'ll be in touch soon.');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Helmet>
        <title>Contact — Logic by fred</title>
        <meta
          name="description"
          content="Get in touch with Logic by fred. We'd love to hear from you about our wearable art collection."
        />
        <link rel="canonical" href="/contact" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <CartDrawer />

        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              >
                {/* Header */}
                <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  Get in Touch
                </p>
                <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-4">
                  Contact
                </h1>
                <p className="font-body text-lg text-muted-foreground mb-12 max-w-lg">
                  Questions about our collection, custom orders, or collaborations? 
                  We'd love to hear from you.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Form */}
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-transparent border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors duration-300"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-transparent border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors duration-300"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-transparent border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors duration-300 resize-none"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gallery inline-flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </motion.form>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                  className="space-y-8"
                >
                  <div className="p-6 bg-secondary">
                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 text-accent mt-1" strokeWidth={1.5} />
                      <div>
                        <h3 className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">
                          Email
                        </h3>
                        <a
                          href="mailto:hello@logicbyfred.com"
                          className="font-body text-foreground hover:text-accent transition-colors duration-300"
                        >
                          hello@logicbyfred.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-secondary">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-accent mt-1" strokeWidth={1.5} />
                      <div>
                        <h3 className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">
                          Studio
                        </h3>
                        <p className="font-body text-foreground">
                          Based in Sintra hills
                          <br />
                          <span className="text-muted-foreground text-sm">
                            By appointment only
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border border-border">
                    <h3 className="font-display text-lg mb-3">Response Time</h3>
                    <p className="font-body text-sm text-muted-foreground">
                      We typically respond within 24-48 hours during business days. 
                      For urgent inquiries regarding orders, please include your 
                      order number in the subject line.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;

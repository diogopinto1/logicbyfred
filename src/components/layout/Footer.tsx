import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-cream-dark">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h2 className="font-display text-xl mb-4">
              <span className="font-normal">Logic</span>
              <span className="text-muted-foreground font-light italic"> by fred</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
              Wearable art for the thoughtful individual. Each piece is a meditation on form, function, and the spaces between.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-body text-sm uppercase tracking-wider mb-4">Navigate</h3>
            <ul className="space-y-2">
              {['Shop', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Shop' ? '/' : `/${item.toLowerCase()}`}
                    className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-body text-sm uppercase tracking-wider mb-4">Information</h3>
            <ul className="space-y-2">
              {['Shipping & Returns', 'Size Guide', 'Care Instructions'].map((item) => (
                <li key={item}>
                  <span className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Logic by fred. All rights reserved. · Made by{" "}
            <a
              href="https://diogopinto1.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline text-foreground/80 hover:text-foreground"
            >
              Diogo Pinto
            </a>
          </p>
          <p className="font-body text-xs text-muted-foreground italic">
            "Wear your thoughts."
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

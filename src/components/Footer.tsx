import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-border/50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Confidential Freelancer
            </span>
          </div>

          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © 2025 Confidential Freelancer Platform. Powered by FHE & Web3.
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Docs
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Whitepaper
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Community
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

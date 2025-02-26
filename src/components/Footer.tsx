
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 pt-10 pb-6 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Logo size="sm" />
              <span className="text-xl font-medium text-white">
                Block<span className="text-gradient font-bold">Auth</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Secure blockchain-based authentication for voting systems
            </p>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-muted-foreground text-sm hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-muted-foreground text-sm hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/vote" 
                  className="text-muted-foreground text-sm hover:text-white transition-colors"
                >
                  Vote
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/privacy" 
                  className="text-muted-foreground text-sm hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-muted-foreground text-sm hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-muted-foreground text-sm hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:support@blockauth.com" 
                  className="text-muted-foreground text-sm hover:text-white transition-colors"
                >
                  support@blockauth.com
                </a>
              </li>
              <li>
                <a 
                  href="https://twitter.com/blockauth" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground text-sm hover:text-white transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a 
                  href="https://discord.gg/blockauth" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground text-sm hover:text-white transition-colors"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} BlockAuth. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex items-center gap-6">
              <li>
                <Link 
                  to="/privacy" 
                  className="text-xs text-muted-foreground hover:text-white transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-xs text-muted-foreground hover:text-white transition-colors"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link 
                  to="/cookies" 
                  className="text-xs text-muted-foreground hover:text-white transition-colors"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

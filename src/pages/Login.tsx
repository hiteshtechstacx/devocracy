
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { KeyRound, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CustomButton } from "@/components/ui/custom-button";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleWalletConnect = async () => {
    try {
      setIsConnecting(true);
      setError("");
      
      // For demo purposes, if no wallet is entered, generate a mock one
      const address = walletAddress || `0x${Math.random().toString(16).slice(2, 12)}...${Math.random().toString(16).slice(2, 6)}`;
      
      await login(address);
      navigate("/dashboard");
    } catch (error) {
      console.error("Connection error:", error);
      setError("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <>
      <Navbar />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto">
            <motion.div 
              className="glass-morphism p-8 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2">Login to BlockAuth</h1>
                <p className="text-muted-foreground text-sm">
                  Connect your wallet to authenticate securely
                </p>
              </div>
              
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium block mb-2">
                    Wallet Address (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="0x..."
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    For demo purposes. Leave blank to generate a mock address.
                  </p>
                </div>
                
                <CustomButton
                  fullWidth
                  isLoading={isConnecting}
                  leftIcon={<KeyRound className="w-4 h-4" />}
                  onClick={handleWalletConnect}
                >
                  Connect Wallet
                </CustomButton>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary hover:underline">
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Login;

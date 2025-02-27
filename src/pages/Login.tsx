
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { KeyRound, Phone, CreditCard, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CustomButton } from "@/components/ui/custom-button";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateAadharNumber = (aadhar: string) => {
    const aadharRegex = /^\d{12}$/;
    return aadharRegex.test(aadhar);
  };

  const handleLogin = async () => {
    // Reset previous errors
    setError("");
    
    // Validate phone number
    if (!phoneNumber) {
      setError("Phone number is required");
      return;
    }
    
    if (!validatePhoneNumber(phoneNumber)) {
      setError("Please enter a valid 10-digit Indian phone number");
      return;
    }
    
    // Validate Aadhar number
    if (!aadharNumber) {
      setError("Aadhar number is required");
      return;
    }
    
    if (!validateAadharNumber(aadharNumber)) {
      setError("Please enter a valid 12-digit Aadhar number");
      return;
    }
    
    try {
      setIsLoggingIn(true);
      await login(phoneNumber, aadharNumber);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoggingIn(false);
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
                <h1 className="text-2xl font-bold mb-2">Login to DevoCracy</h1>
                <p className="text-muted-foreground text-sm">
                  Sign in to access secure blockchain-based voting
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
                    Phone Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                    </span>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      maxLength={10}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-2">
                    Aadhar Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <CreditCard className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      placeholder="12-digit Aadhar number"
                      value={aadharNumber}
                      onChange={(e) => setAadharNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      maxLength={12}
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <CustomButton
                    fullWidth
                    isLoading={isLoggingIn}
                    leftIcon={<KeyRound className="w-4 h-4" />}
                    onClick={handleLogin}
                  >
                    Login
                  </CustomButton>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary hover:underline">
                      Create Account
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


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { KeyRound, User, Phone, CreditCard, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CustomButton } from "@/components/ui/custom-button";
import { useAuth } from "@/contexts/AuthContext";

const Signup = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateAadharNumber = (aadhar: string) => {
    const aadharRegex = /^\d{12}$/;
    return aadharRegex.test(aadhar);
  };

  const handleSignup = async () => {
    // Reset previous errors
    setError("");
    
    // Validate username
    if (!username.trim()) {
      setError("Username is required");
      return;
    }
    
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
      setIsRegistering(true);
      
      await signup(phoneNumber, aadharNumber, username);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      setError("Failed to register. Please try again.");
    } finally {
      setIsRegistering(false);
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
                <h1 className="text-2xl font-bold mb-2">Create DevoCracy Account</h1>
                <p className="text-muted-foreground text-sm">
                  Register for secure blockchain-based voting authentication
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
                    Username
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>
                
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
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter a valid 10-digit Indian mobile number
                  </p>
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
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter your 12-digit Aadhar number for verification
                  </p>
                </div>
                
                <div className="pt-2">
                  <CustomButton
                    fullWidth
                    isLoading={isRegistering}
                    leftIcon={<KeyRound className="w-4 h-4" />}
                    onClick={handleSignup}
                  >
                    Create Account
                  </CustomButton>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Login
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

export default Signup;


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Vote, User, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CustomButton } from "@/components/ui/custom-button";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="glass-morphism p-8 rounded-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Welcome, {user.username || "User"}</h1>
                  <p className="text-muted-foreground text-sm">
                    Phone: {user.phoneNumber}
                  </p>
                </div>
                
                <CustomButton
                  variant="outline"
                  leftIcon={<LogOut className="w-4 h-4" />}
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </CustomButton>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div 
                className="glass-morphism p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <Vote className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-medium">Active Elections</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  You have 2 active elections where you can cast your vote securely using blockchain verification.
                </p>
                <CustomButton>View Elections</CustomButton>
              </motion.div>
              
              <motion.div 
                className="glass-morphism p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-medium">Profile Settings</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  Manage your account settings, update your information and review your voting history.
                </p>
                <CustomButton variant="outline">Manage Profile</CustomButton>
              </motion.div>
            </div>
            
            <motion.div 
              className="glass-morphism p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/20 p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-medium">Security Status</h2>
              </div>
              
              <div className="bg-secondary/50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Blockchain Verification</span>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
              </div>
              
              <div className="bg-secondary/50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Last Authentication</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date().toLocaleString()}
                  </span>
                </div>
              </div>
              
              <CustomButton variant="outline" fullWidth>
                Security Settings
              </CustomButton>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Dashboard;

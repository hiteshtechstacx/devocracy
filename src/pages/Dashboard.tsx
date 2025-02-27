
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, User, Database, Settings, LogOut } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"overview" | "details" | "settings">("overview");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Navbar />
      
      <main className="container mx-auto p-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-morphism p-8 rounded-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Welcome to DevoCracy</h1>
              <p className="text-muted-foreground">Phone: {user.phoneNumber}</p>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
          
          <Separator className="my-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button
              onClick={() => setTab("overview")}
              className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                tab === "overview" ? "bg-primary/10 text-primary" : "hover:bg-muted"
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Overview</span>
            </button>
            
            <button
              onClick={() => setTab("details")}
              className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                tab === "details" ? "bg-primary/10 text-primary" : "hover:bg-muted"
              }`}
            >
              <User className="w-5 h-5" />
              <span className="font-medium">User Details</span>
            </button>
            
            <button
              onClick={() => setTab("settings")}
              className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                tab === "settings" ? "bg-primary/10 text-primary" : "hover:bg-muted"
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </button>
          </div>
          
          <div className="bg-card rounded-lg border p-6">
            {tab === "overview" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
                <p className="text-muted-foreground">Welcome to your DevoCracy dashboard!</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-medium">Authentication Status</h3>
                    <p className="text-sm text-muted-foreground mt-1">Authenticated via phone number</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-medium">Account Type</h3>
                    <p className="text-sm text-muted-foreground mt-1">Standard User</p>
                  </div>
                </div>
              </div>
            )}
            
            {tab === "details" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">User Details</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-muted-foreground">User ID</h3>
                    <p className="font-mono text-sm bg-muted p-2 rounded mt-1">{user.id}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">Phone Number</h3>
                    <p className="font-mono text-sm bg-muted p-2 rounded mt-1">{user.phoneNumber}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">Aadhar Number</h3>
                    <p className="font-mono text-sm bg-muted p-2 rounded mt-1">
                      {user.aadharNumber.substring(0, 4)}•••••••{user.aadharNumber.substring(user.aadharNumber.length - 4)}
                    </p>
                  </div>
                  {user.username && (
                    <div>
                      <h3 className="text-sm text-muted-foreground">Username</h3>
                      <p className="font-mono text-sm bg-muted p-2 rounded mt-1">{user.username}</p>
                    </div>
                  )}
                  {user.profileImage && (
                    <div>
                      <h3 className="text-sm text-muted-foreground">Profile Image</h3>
                      <div className="mt-2">
                        <img 
                          src={user.profileImage} 
                          alt="User profile" 
                          className="w-24 h-24 object-cover rounded-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {tab === "settings" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                <p className="text-muted-foreground mb-4">Manage your account preferences.</p>
                <div className="space-y-4">
                  <button
                    className="w-full text-left px-4 py-3 border rounded-lg hover:bg-muted transition-colors flex items-center gap-3"
                  >
                    <Database className="w-4 h-4" />
                    <span>Update Profile Information</span>
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 border rounded-lg hover:bg-muted transition-colors flex items-center gap-3 text-destructive/80 hover:text-destructive"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Delete Account</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </>
  );
};

export default Dashboard;

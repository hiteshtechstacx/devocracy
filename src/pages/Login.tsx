
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { KeyRound, Phone, AlertCircle, ArrowRight, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CustomButton } from "@/components/ui/custom-button";
import { useAuth } from "@/contexts/AuthContext";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import CameraCapture from "@/components/CameraCapture";
import { toast } from "sonner";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [step, setStep] = useState<"phone" | "otp" | "camera">("phone");
  const [timer, setTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [showCamera, setShowCamera] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const startTimer = () => {
    setTimer(30);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleSendOTP = async () => {
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
    
    try {
      setIsResending(true);
      
      // Simulate OTP sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, let's pretend we sent an OTP (would be handled by a real SMS service)
      console.log("OTP sent to", phoneNumber);
      
      // Move to OTP verification step
      setStep("otp");
      startTimer();
      setError("");
    } catch (error) {
      console.error("OTP sending error:", error);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const handleResendOTP = async () => {
    if (timer > 0) return;
    setIsResending(true);
    
    try {
      // Simulate OTP resending
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("OTP resent to", phoneNumber);
      startTimer();
    } catch (error) {
      console.error("OTP resending error:", error);
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError("");
    
    if (!otp || otp.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }
    
    try {
      setIsLoggingIn(true);
      
      // For demo purposes, consider '123456' as valid OTP (in real app, would verify with backend)
      if (otp !== "123456") {
        setError("Invalid OTP. Please try again.");
        setIsLoggingIn(false);
        return;
      }
      
      // After OTP verification, open camera
      setStep("camera");
      setShowCamera(true);
      
    } catch (error) {
      console.error("OTP verification error:", error);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleBack = () => {
    if (step === "otp") {
      setStep("phone");
      setOtp("");
      if (timerRef.current) {
        clearInterval(timerRef.current);
        setTimer(0);
      }
    } else if (step === "camera") {
      setStep("otp");
    }
  };

  const handleCameraCapture = async (imageSrc: string) => {
    setProfileImage(imageSrc);
    setShowCamera(false);
    
    try {
      setIsLoggingIn(true);
      toast.success("Profile image captured successfully!");
      
      // In a real app with Supabase, you would upload the image to storage here
      // For now, we'll just store it in the user object
      
      // Login with phoneNumber, aadharNumber, and profileImage
      await login(phoneNumber, "123456789012", imageSrc);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
      setIsLoggingIn(false);
    }
  };

  const handleCameraClose = () => {
    setShowCamera(false);
    // If user closes camera without taking a photo, proceed without image
    handleProceedWithoutImage();
  };

  const handleProceedWithoutImage = async () => {
    try {
      setIsLoggingIn(true);
      await login(phoneNumber, "123456789012");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const openCamera = () => {
    setShowCamera(true);
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
                  {step === "phone" 
                    ? "Enter your phone number to receive an OTP" 
                    : step === "otp"
                    ? "Enter the OTP sent to your mobile"
                    : "Take a profile picture to complete login"
                  }
                </p>
              </div>
              
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}
              
              <div className="space-y-6">
                {step === "phone" ? (
                  <>
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
                    
                    <div className="pt-2">
                      <CustomButton
                        fullWidth
                        isLoading={isResending}
                        leftIcon={<ArrowRight className="w-4 h-4" />}
                        onClick={handleSendOTP}
                      >
                        Get OTP
                      </CustomButton>
                    </div>
                  </>
                ) : step === "otp" ? (
                  <>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium">
                          Enter OTP
                        </label>
                        {timer > 0 ? (
                          <span className="text-sm text-muted-foreground">
                            Resend in {timer}s
                          </span>
                        ) : (
                          <button
                            className="text-sm text-primary hover:underline"
                            onClick={handleResendOTP}
                            disabled={isResending}
                          >
                            {isResending ? "Sending..." : "Resend OTP"}
                          </button>
                        )}
                      </div>
                      
                      <div className="flex justify-center mb-4">
                        <InputOTP
                          maxLength={6}
                          value={otp}
                          onChange={setOtp}
                          containerClassName="gap-2"
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} className="w-10 h-12" />
                            <InputOTPSlot index={1} className="w-10 h-12" />
                            <InputOTPSlot index={2} className="w-10 h-12" />
                            <InputOTPSlot index={3} className="w-10 h-12" />
                            <InputOTPSlot index={4} className="w-10 h-12" />
                            <InputOTPSlot index={5} className="w-10 h-12" />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-4 text-center">
                        We've sent a 6-digit code to +91 {phoneNumber}
                      </p>
                      
                      <div className="space-y-3">
                        <CustomButton
                          fullWidth
                          isLoading={isLoggingIn}
                          leftIcon={<KeyRound className="w-4 h-4" />}
                          onClick={handleVerifyOTP}
                        >
                          Verify OTP
                        </CustomButton>
                        
                        <button 
                          className="text-sm text-center w-full text-muted-foreground hover:text-foreground"
                          onClick={handleBack}
                        >
                          Change Phone Number
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-muted-foreground mb-4">
                          Take a profile picture to complete your login
                        </p>
                        
                        {profileImage ? (
                          <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-primary">
                            <img 
                              src={profileImage} 
                              alt="Profile" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="mx-auto w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-4">
                            <Camera className="w-10 h-10 text-muted-foreground" />
                          </div>
                        )}
                        
                        <div className="space-y-3">
                          <CustomButton
                            fullWidth
                            onClick={openCamera}
                            leftIcon={<Camera className="w-4 h-4" />}
                          >
                            {profileImage ? "Take New Photo" : "Take Photo"}
                          </CustomButton>
                          
                          <CustomButton
                            fullWidth
                            variant="outline"
                            isLoading={isLoggingIn}
                            onClick={handleProceedWithoutImage}
                          >
                            Skip & Proceed
                          </CustomButton>
                          
                          <button 
                            className="text-sm text-center w-full text-muted-foreground hover:text-foreground"
                            onClick={handleBack}
                          >
                            Back to OTP
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {step === "phone" && (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-primary hover:underline">
                        Create Account
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      {showCamera && (
        <CameraCapture
          onCapture={handleCameraCapture}
          onClose={handleCameraClose}
        />
      )}
      
      <Footer />
    </>
  );
};

export default Login;

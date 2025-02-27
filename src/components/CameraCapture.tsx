
import React, { useRef, useState, useEffect } from "react";
import { Camera, RotateCw, ThumbsUp, X } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { toast } from "sonner";

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
  onClose: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraAvailable, setIsCameraAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        setIsLoading(true);
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        
        setStream(mediaStream);
        setIsCameraAvailable(true);
      } catch (error) {
        console.error("Error accessing camera:", error);
        setIsCameraAvailable(false);
        toast.error("Unable to access camera. Please check camera permissions.");
      } finally {
        setIsLoading(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageSrc = canvas.toDataURL("image/png");
        setCapturedImage(imageSrc);
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  const confirmImage = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-card border rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Camera className="w-5 h-5" />
            <span>Take a Profile Picture</span>
          </h2>
          <button 
            onClick={onClose} 
            className="rounded-full p-1 hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : !isCameraAvailable ? (
            <div className="text-center py-12">
              <div className="rounded-full bg-destructive/10 p-3 inline-flex mb-4">
                <X className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-medium mb-2">Camera Not Available</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Please check your camera permissions and try again.
              </p>
              <CustomButton onClick={onClose}>Close</CustomButton>
            </div>
          ) : capturedImage ? (
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <img 
                  src={capturedImage} 
                  alt="Captured" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex gap-2 justify-end">
                <CustomButton
                  variant="outline"
                  onClick={retakePhoto}
                  leftIcon={<RotateCw className="w-4 h-4" />}
                >
                  Retake
                </CustomButton>
                <CustomButton 
                  onClick={confirmImage}
                  leftIcon={<ThumbsUp className="w-4 h-4" />}
                >
                  Use Photo
                </CustomButton>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                ></video>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={captureImage}
                  className="rounded-full bg-primary text-primary-foreground p-3 hover:bg-primary/90 transition-colors"
                >
                  <Camera className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}
        </div>
        
        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>
    </div>
  );
};

export default CameraCapture;


import React, { useState, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { crop, filter, save, image } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface ImageEditorProps {
  image: File | null;
  onSave: (editedImage: Blob) => void;
  onCancel: () => void;
  isOpen: boolean;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ image, onSave, onCancel, isOpen }) => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("crop");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [cropScale, setCropScale] = useState(1);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Create image preview when file is loaded
  React.useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreviewUrl(objectUrl);

      // Clean up the URL when component unmounts
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  // Apply filters to the image
  const applyFilters = useCallback(() => {
    if (!canvasRef.current || !imageRef.current || !previewUrl) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imageRef.current;
    
    // Set canvas dimensions
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    
    // Draw image with current crop scale
    const scaledWidth = img.naturalWidth * cropScale;
    const scaledHeight = img.naturalHeight * cropScale;
    const offsetX = (img.naturalWidth - scaledWidth) / 2;
    const offsetY = (img.naturalHeight - scaledHeight) / 2;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      offsetX, offsetY,
      scaledWidth, scaledHeight
    );
    
    // Apply filters
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
    
    // Draw the image again with the filters applied
    ctx.globalCompositeOperation = 'source-in';
    ctx.drawImage(
      img, 
      offsetX, offsetY,
      scaledWidth, scaledHeight
    );
    ctx.filter = 'none';
    ctx.globalCompositeOperation = 'source-over';
  }, [brightness, contrast, saturation, previewUrl, cropScale]);

  // Update canvas when filters or crop change
  React.useEffect(() => {
    if (imageRef.current?.complete) {
      applyFilters();
    }
  }, [brightness, contrast, saturation, cropScale, applyFilters]);

  const handleImageLoad = () => {
    applyFilters();
  };

  const handleSave = async () => {
    if (!canvasRef.current) {
      toast({
        title: "Error",
        description: "Could not save the edited image.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvasRef.current?.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to create blob from canvas"));
            }
          },
          "image/jpeg",
          0.95
        );
      });
      
      onSave(blob);
    } catch (error) {
      console.error("Error saving image:", error);
      toast({
        title: "Error",
        description: "Failed to save the edited image.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!previewUrl) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => onCancel()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile Picture</DialogTitle>
          <DialogDescription>
            Crop and adjust your image before saving it as your profile picture.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="crop" className="flex items-center gap-2">
              <crop className="h-4 w-4" />
              <span>Crop</span>
            </TabsTrigger>
            <TabsTrigger value="filter" className="flex items-center gap-2">
              <filter className="h-4 w-4" />
              <span>Filter</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="relative mb-4 bg-gray-100 rounded-md overflow-hidden">
            <AspectRatio ratio={1/1} className="bg-gray-100 relative">
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-contain hidden"
              />
              <img
                ref={imageRef}
                src={previewUrl}
                alt="Profile preview"
                className="w-full h-full object-contain"
                style={{
                  filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
                  transform: `scale(${cropScale})`,
                  transition: "transform 0.3s ease"
                }}
                onLoad={handleImageLoad}
              />
            </AspectRatio>
          </div>
          
          <TabsContent value="crop" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Zoom</CardTitle>
              </CardHeader>
              <CardContent>
                <Slider
                  value={[cropScale * 100]}
                  min={100}
                  max={200}
                  step={1}
                  onValueChange={(value) => setCropScale(value[0] / 100)}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1x</span>
                  <span>2x</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="filter" className="mt-0 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Brightness</CardTitle>
              </CardHeader>
              <CardContent>
                <Slider
                  value={[brightness]}
                  min={50}
                  max={150}
                  step={1}
                  onValueChange={(value) => setBrightness(value[0])}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>-50%</span>
                  <span>Normal</span>
                  <span>+50%</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Contrast</CardTitle>
              </CardHeader>
              <CardContent>
                <Slider
                  value={[contrast]}
                  min={50}
                  max={150}
                  step={1}
                  onValueChange={(value) => setContrast(value[0])}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>-50%</span>
                  <span>Normal</span>
                  <span>+50%</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Saturation</CardTitle>
              </CardHeader>
              <CardContent>
                <Slider
                  value={[saturation]}
                  min={0}
                  max={200}
                  step={1}
                  onValueChange={(value) => setSaturation(value[0])}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>B&W</span>
                  <span>Normal</span>
                  <span>Vivid</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="gap-2"
            disabled={isProcessing}
          >
            <save className="h-4 w-4" />
            {isProcessing ? "Processing..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageEditor;

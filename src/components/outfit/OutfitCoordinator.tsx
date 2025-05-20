import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Camera, Upload, Download, Save, Share2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

const OutfitCoordinator = () => {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [hue, setHue] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [blur, setBlur] = useState(0);
  const [rotate, setRotate] = useState(0);

  const { toast } = useToast();
  const { user } = useAuth();

  const handleSave = () => {
    toast({
      title: "Outfit saved!",
      description: "Your coordinated outfit has been saved to your lookbook.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Outfit shared!",
      description: "Your coordinated outfit has been shared with your friends.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Outfit downloaded!",
      description: "Your coordinated outfit has been downloaded to your device.",
    });
  };

  const handleUpload = () => {
    toast({
      title: "Outfit uploaded!",
      description: "Your coordinated outfit has been uploaded to your profile.",
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Outfit Coordination</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="editor">
            <div className="space-y-4">
              <div>
                <Label htmlFor="brightness">Brightness</Label>
                <Slider
                  id="brightness"
                  defaultValue={[brightness]}
                  max={200}
                  min={0}
                  step={1}
                  onValueChange={(value) => setBrightness(value[0])}
                />
              </div>
              <div>
                <Label htmlFor="contrast">Contrast</Label>
                <Slider
                  id="contrast"
                  defaultValue={[contrast]}
                  max={200}
                  min={0}
                  step={1}
                  onValueChange={(value) => setContrast(value[0])}
                />
              </div>
              <div>
                <Label htmlFor="saturation">Saturation</Label>
                <Slider
                  id="saturation"
                  defaultValue={[saturation]}
                  max={200}
                  min={0}
                  step={1}
                  onValueChange={(value) => setSaturation(value[0])}
                />
              </div>
              <div>
                <Label htmlFor="hue">Hue</Label>
                <Slider
                  id="hue"
                  defaultValue={[hue]}
                  max={360}
                  min={-360}
                  step={1}
                  onValueChange={(value) => setHue(value[0])}
                />
              </div>
              <div>
                <Label htmlFor="sepia">Sepia</Label>
                <Slider
                  id="sepia"
                  defaultValue={[sepia]}
                  max={100}
                  min={0}
                  step={1}
                  onValueChange={(value) => setSepia(value[0])}
                />
              </div>
              <div>
                <Label htmlFor="grayscale">Grayscale</Label>
                <Slider
                  id="grayscale"
                  defaultValue={[grayscale]}
                  max={100}
                  min={0}
                  step={1}
                  onValueChange={(value) => setGrayscale(value[0])}
                />
              </div>
               <div>
                <Label htmlFor="blur">Blur</Label>
                <Slider
                  id="blur"
                  defaultValue={[blur]}
                  max={10}
                  min={0}
                  step={1}
                  onValueChange={(value) => setBlur(value[0])}
                />
              </div>
              <div>
                <Label htmlFor="rotate">Rotate</Label>
                <Slider
                  id="rotate"
                  defaultValue={[rotate]}
                  max={360}
                  min={-360}
                  step={1}
                  onValueChange={(value) => setRotate(value[0])}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1592078615290-0a82a3c6f905?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                alt="Outfit Preview"
                className="w-full rounded-md"
                style={{
                  filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hue}deg) sepia(${sepia}%) grayscale(${grayscale}%) blur(${blur}px) rotate(${rotate}deg)`,
                }}
              />
              <div className="absolute top-2 right-2 space-x-2">
                <Button variant="outline" size="icon" onClick={handleUpload}>
                  <Upload className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleDownload}>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleSave}>
                  <Save className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OutfitCoordinator;


import React from 'react';
import { Camera, Sparkles } from 'lucide-react';

interface PoseIdea {
  name: string;
  description: string;
  caption: string;
}

interface PoseIdeasProps {
  poses: PoseIdea[];
}

const PoseIdeas = ({ poses }: PoseIdeasProps) => {
  // Add null check and fallback
  const safePoses = poses && Array.isArray(poses) ? poses : [];

  if (safePoses.length === 0) {
    return (
      <div className="mb-4">
        <h4 className="font-medium text-sm mb-2 flex items-center">
          <Camera className="h-4 w-4 mr-1" />
          AI Pose Ideas
        </h4>
        <div className="bg-pink-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-3 w-3 text-pink-500" />
            <span className="font-medium text-xs">Loading poses...</span>
          </div>
          <p className="text-xs text-gray-600">AI is generating pose suggestions for you</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h4 className="font-medium text-sm mb-2 flex items-center">
        <Camera className="h-4 w-4 mr-1" />
        AI Pose Ideas
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {safePoses.map((pose, index) => (
          <div key={index} className="bg-pink-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-3 w-3 text-pink-500" />
              <span className="font-medium text-xs">{pose.name}</span>
            </div>
            <p className="text-xs text-gray-600">{pose.description}</p>
            <p className="text-xs text-pink-600 mt-1 italic">"{pose.caption}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoseIdeas;


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
  const safePoses = poses && Array.isArray(poses) ? poses : [];

  if (safePoses.length === 0) {
    return (
      <div className="mb-3">
        <h4 className="font-medium text-xs mb-2 flex items-center">
          <Camera className="h-3 w-3 mr-1" />
          AI Pose Ideas
        </h4>
        <div className="bg-pink-50 rounded-lg p-2">
          <div className="flex items-center gap-1 mb-1">
            <Sparkles className="h-3 w-3 text-pink-500" />
            <span className="font-medium text-xs">Loading poses...</span>
          </div>
          <p className="text-xs text-gray-600">AI is generating pose suggestions for you</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-3">
      <h4 className="font-medium text-xs mb-2 flex items-center">
        <Camera className="h-3 w-3 mr-1" />
        AI Pose Ideas
      </h4>
      <div className="space-y-2">
        {safePoses.slice(0, 2).map((pose, index) => (
          <div key={index} className="bg-pink-50 rounded-lg p-2">
            <div className="flex items-center gap-1 mb-1">
              <Sparkles className="h-3 w-3 text-pink-500" />
              <span className="font-medium text-xs">{pose.name}</span>
            </div>
            <p className="text-xs text-gray-600 mb-1">{pose.description}</p>
            <p className="text-xs text-pink-600 italic font-medium">"{pose.caption}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoseIdeas;

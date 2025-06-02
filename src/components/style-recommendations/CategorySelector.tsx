
import React from 'react';
import { Button } from '@/components/ui/button';
import { Palette, Mountain, Building2 } from 'lucide-react';
import { StyleCategory } from '@/types/style';

interface CategorySelectorProps {
  selectedCategory: StyleCategory;
  onCategorySelect: (category: StyleCategory) => void;
}

const CategorySelector = ({ selectedCategory, onCategorySelect }: CategorySelectorProps) => {
  const categories = [
    {
      id: 'fall' as StyleCategory,
      name: 'Fall',
      icon: <Palette className="h-5 w-5" />,
      description: 'Cozy autumn styles'
    },
    {
      id: 'adventure' as StyleCategory,
      name: 'Adventure',
      icon: <Mountain className="h-5 w-5" />,
      description: 'Outdoor ready looks'
    },
    {
      id: 'urban' as StyleCategory,
      name: 'Urban',
      icon: <Building2 className="h-5 w-5" />,
      description: 'City chic outfits'
    }
  ];

  return (
    <div className="flex justify-center space-x-4">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'default' : 'outline'}
          onClick={() => onCategorySelect(category.id)}
          className="flex flex-col items-center p-6 h-auto min-w-[120px]"
        >
          {category.icon}
          <span className="mt-2 font-semibold">{category.name}</span>
          <span className="text-xs mt-1 opacity-80">{category.description}</span>
        </Button>
      ))}
    </div>
  );
};

export default CategorySelector;

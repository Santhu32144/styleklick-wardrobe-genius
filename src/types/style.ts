
export type StyleCategory = 'fall' | 'adventure' | 'urban';

export interface OutfitSuggestion {
  id: string;
  name: string;
  description: string;
  category: StyleCategory;
}

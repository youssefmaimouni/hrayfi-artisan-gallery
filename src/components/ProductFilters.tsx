
import { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Slider } from '@/components/ui/slider';

interface ProductFiltersProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  priceRange?: [number, number];
  onPriceChange?: (range: [number, number]) => void;
  sortBy?: string;
  onSortChange?: (sort: string) => void;
}

const ProductFilters = ({
  categories,
  selectedCategories,
  onCategoryChange,
  // priceRange,
  // onPriceChange,
  // sortBy,
  // onSortChange,
}: ProductFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryToggle = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    onCategoryChange(updated);
  };

  const clearAllFilters = () => {
    onCategoryChange([]);
    //onPriceChange([0, 1000]);
  };

  const activeFiltersCount = selectedCategories.length;

  return (
    <div className="border-b border-border pb-4 mb-6">
      {/* Mobile Filter Toggle */}
      <div className="flex items-center justify-between mb-4 lg:hidden">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFiltersCount}
                </Badge>
              )}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:flex items-center gap-6 flex-wrap">
        {/* Categories */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium">Categories:</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryToggle(category)}
              className={`filter-button ${selectedCategories.includes(category) ? 'active' : ''}`}
              aria-pressed={selectedCategories.includes(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button variant="ghost" onClick={clearAllFilters} className="text-sm">
            Clear All ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Mobile Collapsible Filters */}
      <div className="lg:hidden">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleContent className="space-y-4 mt-4">
            {/* Categories */}
            <div>
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryToggle(category)}
                    className={`filter-button ${selectedCategories.includes(category) ? 'active' : ''}`}
                    aria-pressed={selectedCategories.includes(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <Button variant="outline" onClick={clearAllFilters} className="w-full">
                Clear All Filters ({activeFiltersCount})
              </Button>
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default ProductFilters;

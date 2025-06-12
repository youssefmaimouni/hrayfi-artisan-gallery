
import { useState } from 'react';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  artisan: string;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  isNew?: boolean;
  description: string;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Handwoven Berber Carpet',
    price: 299,
    originalPrice: 399,
    artisan: 'Fatima Al-Zahra',
    rating: 4.8,
    reviewCount: 127,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    category: 'Textiles',
    isNew: true,
    description: 'Beautiful traditional Berber carpet with authentic patterns'
  },
  {
    id: '2',
    name: 'Moroccan Tagine Pot',
    price: 89,
    artisan: 'Hassan El-Fassi',
    rating: 4.9,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    category: 'Ceramics',
    description: 'Authentic clay tagine for traditional Moroccan cooking'
  },
  {
    id: '3',
    name: 'Argan Oil Soap Set',
    price: 45,
    originalPrice: 65,
    artisan: 'Aisha Benali',
    rating: 4.7,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    category: 'Beauty',
    description: 'Handmade soaps with pure argan oil from Essaouira'
  },
  {
    id: '4',
    name: 'Silver Filigree Jewelry Box',
    price: 156,
    artisan: 'Mohammed Tazi',
    rating: 4.6,
    reviewCount: 54,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
    category: 'Jewelry',
    description: 'Intricate silver work in traditional Moroccan style'
  },
  {
    id: '5',
    name: 'Leather Babouche Slippers',
    price: 67,
    artisan: 'Youssef Alami',
    rating: 4.5,
    reviewCount: 198,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    category: 'Leather',
    isNew: true,
    description: 'Handcrafted traditional Moroccan leather slippers'
  },
  {
    id: '6',
    name: 'Mosaic Mirror Frame',
    price: 134,
    originalPrice: 180,
    artisan: 'Latifa Benjelloun',
    rating: 4.8,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    category: 'Decorative',
    description: 'Beautiful zellige mosaic work on wooden frame'
  }
];

const ProductGrid = () => {
  const [products] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('popularity');

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products
    .filter(product => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && priceMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default:
          return b.reviewCount - a.reviewCount;
      }
    });

  const handleProductClick = (product: Product) => {
    console.log('Product clicked:', product.name);
    // Navigate to product detail page
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">
          Artisan Marketplace
        </h1>
        <p className="text-muted-foreground">
          Discover authentic Moroccan crafts made by skilled artisans
        </p>
      </div>

      {/* Filters */}
      <ProductFilters
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
        priceRange={priceRange}
        onPriceChange={setPriceRange}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onClick={() => handleProductClick(product)}
          />
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or search terms
          </p>
          <button
            onClick={() => {
              setSelectedCategories([]);
              setPriceRange([0, 1000]);
            }}
            className="text-primary hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';

interface Region {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Artisan {
  id: number;
  name: string;
  biography: string;
  region: Region;
  main_image: string | null;
}

interface Product {
  id: number;
  name: string;
  description: string;
  materials: string;
  dimensions: string;
  cultural_significance: string;
  category: Category;
  region: Region;
  artisan: Artisan;
  main_image: string | null;
  price: string;
}

const ProductGrid = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState('popularity');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Attempting to fetch products from:', 'https://api.achrafmansari.com/api/products/');
    fetch('https://api.achrafmansari.com/api/products/')
      .then((res) => {
        console.log('Response status:', res.status);
        console.log('Response headers:', res.headers);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Products data received:', data);
        setProducts(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch products - likely CORS issue:', error);
        // Use mock data as fallback
        const mockProducts = [
          {
            id: 2,
            name: "Traditional Artisan Craft",
            description: "Beautiful handcrafted item",
            materials: "Traditional materials",
            dimensions: "Standard size",
            cultural_significance: "Rich cultural heritage",
            category: { id: 1, name: "cat1" },
            region: { id: 2, name: "Morocco" },
            artisan: {
              id: 2,
              name: "MyTindy.com",
              email: "contact@mytindy.com",
              phone: "+212529159392",
              biography: "Skilled artisan with years of experience",
              region: { id: 2, name: "Morocco" },
              main_image: null
            },
            main_image: "https://cdn.achrafmansari.com/media/products/Screenshot_2025-07-10_044854.png",
            price: "0.00"
          }
        ];
        console.log('Using mock data due to CORS error');
        setProducts(mockProducts);
        setLoading(false);
      });
  }, []);

  const categories = Array.from(new Set(products.map(p => p.category.name)));
  const regions = Array.from(new Set(products.map(p => p.region.name)));

  const filteredProducts = products
    .filter(product => {
      const categoryMatch = !selectedCategory || selectedCategory === 'all-categories' || product.category.name === selectedCategory;
      const regionMatch = !selectedRegion || selectedRegion === 'all-regions' || product.region.name === selectedRegion;
      
      // Enhanced search - search across all text fields
      const searchMatch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.region.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.materials.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.dimensions.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.cultural_significance.toLowerCase().includes(searchQuery.toLowerCase());
      
      return categoryMatch && regionMatch && searchMatch;
    })
    .sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);

      switch (sortBy) {
        case 'price-low':
          return priceA - priceB;
        case 'price-high':
          return priceB - priceA;
        case 'newest':
          return b.id - a.id;
        default:
          return a.id - b.id;
      }
    });

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Filters */}
        <div className="mb-6 sm:mb-8">
          <ProductFilters
            categories={categories}
            regions={regions}
            selectedCategory={selectedCategory}
            selectedRegion={selectedRegion}
            searchQuery={searchQuery}
            onCategoryChange={setSelectedCategory}
            onRegionChange={setSelectedRegion}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id.toString()}
                  name={product.name}
                  price={parseFloat(product.price)}
                  artisan={product.artisan.name}
                  rating={4.5}
                  reviewCount={Math.floor(Math.random() * 200) + 50}
                  image={product.main_image || '/placeholder.svg'}
                  category={product.category.name}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">No products found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search terms
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory('');
                      setSelectedRegion('');
                      setSearchQuery('');
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;

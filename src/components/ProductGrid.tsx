import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  region: Region | null;
  main_image: string | null; // URL from DRF's serializer
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
  artisan: Artisan | null;
  main_image: string | null; // URL from DRF's serializer
  price: string; // comes as string from Django unless cast manually
}


const ProductGrid = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('popularity');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products/')
      .then((res) => res.json())
      .then((data) => {
        //console.log('Fetched products:', data.results);
        setProducts(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch products:', error);
        setLoading(false);
      });
  }, []);

  const categories = Array.from(new Set(products.map(p => p.category.name)));

  const filteredProducts = products
    .filter(product => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category.name);
      return categoryMatch;
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
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      {/* <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Artisan Marketplace</h1>
        <p className="text-muted-foreground">Discover authentic Moroccan crafts made by skilled artisans</p>
      </div> */}

      {/* Filters */}
      <ProductFilters
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
        // priceRange={priceRange}
        // onPriceChange={setPriceRange}
        // sortBy={sortBy}
        // onSortChange={setSortBy}
      />

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-lg">Loading products...</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        </>
      )}
    </div>
  );
};

export default ProductGrid;

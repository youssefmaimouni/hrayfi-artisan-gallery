import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import Header from '@/components/Header';
import Chatbot from '@/components/Chatbot';

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

const ArtisanProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    Promise.all([
      fetch(`https://api.achrafmansari.com/api/artisans/${id}/`).then(res => res.json()),
      fetch(`https://api.achrafmansari.com/api/artisans/${id}/products/`).then(res => res.json())
    ])
    .then(([artisanData, productsData]) => {
      setArtisan(artisanData);
      setProducts(productsData.results);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Failed to fetch artisan data:', error);
      setLoading(false);
    });
  }, [id]);

  const categories = Array.from(new Set(products.map(p => p.category.name)));
  const regions = Array.from(new Set(products.map(p => p.region.name)));

  const filteredProducts = products.filter(product => {
    const categoryMatch = !selectedCategory || selectedCategory === 'all-categories' || product.category.name === selectedCategory;
    const regionMatch = !selectedRegion || selectedRegion === 'all-regions' || product.region.name === selectedRegion;
    
    const searchMatch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.region.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.materials.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.dimensions.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.cultural_significance.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && regionMatch && searchMatch;
  });

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-muted-foreground">Loading artisan...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!artisan) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Artisan not found</h1>
              <Button onClick={() => navigate('/')}>
                Back to Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
          size="sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        {/* Artisan Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              {artisan.main_image && (
                <img
                  src={artisan.main_image}
                  alt={artisan.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <h1 className="text-2xl font-bold">{artisan.name}</h1>
                <p className="text-muted-foreground">{artisan.region.name}</p>
                <p className="text-sm text-muted-foreground mt-2">{artisan.biography}</p>
              </div>
            </div>
          </CardContent>
        </Card>

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

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products by {artisan.name}
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground">
                {products.length === 0 
                  ? `${artisan.name} hasn't added any products yet.`
                  : "Try adjusting your filters to see more products."
                }
              </p>
            </div>
          </div>
        )}
      </div>
      <Chatbot />
    </div>
  );
};

export default ArtisanProducts;
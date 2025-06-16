import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  histoire: string;
  category: string;
  subcategory: string;
  materials: string[];
  techniques: string[];
  artisan: string;
  region: string;
  cultural_significance: string;
  languages: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
  image: string;
  isNew?: boolean;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Azilal Wool Rug',
    price: 299,
    originalPrice: 399,
    description: 'Handwoven rug from the Azilal region using natural wool and vegetable dyes. Features symbolic diamond motifs.',
    histoire: 'These rugs are woven by Berber women in the Middle Atlas mountains of Morocco. Each rug tells a story through its symbols - diamonds represent protection and family bonds, passed down through generations of master weavers.',
    category: 'Rugs & Textiles',
    subcategory: 'Azilal',
    materials: ['Natural wool', 'Vegetable dyes'],
    techniques: ['Hand-knotting'],
    artisan: 'Coop Tazwit Azilal',
    region: 'Azilal',
    cultural_significance: 'Diamond symbols represent protection and family',
    languages: ['Arabic', 'French'],
    tags: ['handmade', 'eco-friendly', 'Amazigh'],
    rating: 4.8,
    reviewCount: 127,
    image: 'https://www.cmconjoncture.com/uploads/posts/64c295fa9580a_1690473978.png',
    isNew: true
  },
  {
    id: '2',
    name: 'balgha',
    price: 89,
    description: 'Authentic pottery from Tamegroute with distinctive green glaze made from copper and local minerals.',
    histoire: 'Tamegroute pottery has been produced since the 1500s by descendants of a religious brotherhood. It was shaped using traditional wooden wheels and fired in earth kilns. Its unique glaze was developed using copper mined in the local mountains.',
    category: 'Ceramics',
    subcategory: 'Tamegroute',
    materials: ['Local clay', 'Copper oxide', 'Natural minerals'],
    techniques: ['Wheel throwing', 'Traditional firing'],
    artisan: 'Atelier Tamegroute',
    region: 'Drâa-Tafilalet',
    cultural_significance: 'Green color symbolizes Islam and paradise in Moroccan culture',
    languages: ['Arabic', 'Berber'],
    tags: ['traditional', 'authentic', 'spiritual'],
    rating: 4.9,
    reviewCount: 203,
    image: 'https://latribunedemarrakech.com/wp-content/uploads/2019/02/artisanat-maroc.jpg'
  },
  {
    id: '3',
    name: 'Zellige Mosaic Mirror',
    price: 156,
    originalPrice: 210,
    description: 'Handcrafted mirror frame decorated with traditional zellige tiles in blue and white patterns.',
    histoire: 'Zellige is an ancient art form dating back to the 10th century. Each tile is hand-cut from clay found in Salé and glazed with natural pigments. The imperfections in each tile create the unique beauty that makes zellige so coveted.',
    category: 'Home Decor',
    subcategory: 'Zellige',
    materials: ['Salé clay', 'Natural glazes', 'Cedar wood'],
    techniques: ['Hand-cutting', 'Traditional glazing', 'Mosaic assembly'],
    artisan: 'Maâlem Hassan Fès',
    region: 'Fès-Meknès',
    cultural_significance: 'Blue represents the sky and infinity in Islamic art',
    languages: ['Arabic', 'French'],
    tags: ['geometric', 'islamic-art', 'luxury'],
    rating: 4.7,
    reviewCount: 89,
    image: 'https://www.maroc-promotion.com/upload/artisanat-marocain-1615805580-37357.jpg'
  },
  {
    id: '4',
    name: 'fekhar',
    price: 445,
    description: 'Pure wool carpet from the Beni Ourain tribe featuring traditional black diamond patterns on cream background.',
    histoire: 'These carpets have been woven by Berber tribes in the Middle Atlas for centuries. Originally made for the harsh mountain winters, each carpet represents the weaver\'s personal story and tribal identity through its unique patterns.',
    category: 'Rugs & Textiles',
    subcategory: 'Beni Ourain',
    materials: ['Pure sheep wool'],
    techniques: ['Traditional loom weaving'],
    artisan: 'Fatima Beni Ourain',
    region: 'Middle Atlas',
    cultural_significance: 'Diamond patterns ward off evil and bring good fortune',
    languages: ['Berber', 'Arabic'],
    tags: ['tribal', 'luxury', 'authentic'],
    rating: 4.9,
    reviewCount: 156,
    image: 'https://www.voyage-maroc.com/cdn/ma-public/ceramique_maroc-MAX-w1000h600.jpg',
    isNew: true
  },
  {
    id: '5',
    name: 'zarbia',
    price: 67,
    description: 'Pure argan oil and handmade soap set from women\'s cooperatives in Essaouira region.',
    histoire: 'For centuries, Berber women have extracted argan oil from the kernels of the argan tree. This liquid gold is produced exclusively by women\'s cooperatives, providing economic independence and preserving traditional knowledge.',
    category: 'Beauty & Wellness',
    subcategory: 'Argan Products',
    materials: ['Pure argan oil', 'Natural soap base', 'Essential oils'],
    techniques: ['Traditional extraction', 'Hand pressing', 'Cold process soap making'],
    artisan: 'Coopérative Amal Essaouira',
    region: 'Essaouira',
    cultural_significance: 'Argan tree is sacred to Berber culture, symbol of life and resilience',
    languages: ['Berber', 'Arabic', 'French'],
    tags: ['organic', 'fair-trade', 'women-made'],
    rating: 4.6,
    reviewCount: 234,
    image: 'https://aujourdhui.ma/wp-content/uploads/2017/12/Artisanat-Tapis.jpg'
  },
  {
    id: '6',
    name: 'biban&zellije',
    price: 78,
    description: 'Traditional pointed leather slippers handcrafted in the ancient tanneries of Fez.',
    histoire: 'The art of leather working in Fez dates back over 1000 years. These babouches are made in the famous Chouara Tannery using techniques unchanged since medieval times. The leather is dyed using natural pigments like saffron and mint.',
    category: 'Fashion & Accessories',
    subcategory: 'Footwear',
    materials: ['Natural leather', 'Vegetable dyes', 'Traditional thread'],
    techniques: ['Traditional tanning', 'Hand stitching', 'Natural dyeing'],
    artisan: 'Atelier Cuir Fès',
    region: 'Fès-Meknès',
    cultural_significance: 'Yellow babouches traditionally worn by scholars and nobility',
    languages: ['Arabic', 'French'],
    tags: ['traditional', 'luxury', 'heritage'],
    rating: 4.5,
    reviewCount: 198,
    image: 'https://www.lavieeco.com/wp-content/uploads/2023/07/Zellije.jpg'
  }
];

const ProductGrid = () => {
  const navigate = useNavigate();
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
    console.log('Product details:', product);
    navigate(`/product/${product.id}`);
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
            id={product.id}
            name={product.name}
            price={product.price}
            originalPrice={product.originalPrice}
            artisan={product.artisan}
            rating={product.rating}
            reviewCount={product.reviewCount}
            image={product.image}
            category={product.category}
            isNew={product.isNew}
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

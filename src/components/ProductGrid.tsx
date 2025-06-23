
import { useState } from 'react';
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

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Moroccan Zellij Tile",
    description: "Hand-crafted glazed tile featuring traditional geometric patterns.",
    materials: "Ceramic",
    dimensions: "10×10 cm",
    cultural_significance: "Traditional Islamic geometric art symbolizing infinity and unity",
    category: {
      id: 1,
      name: "tiles"
    },
    region: {
      id: 1,
      name: "Fès-Meknès"
    },
    artisan: {
      id: 1,
      name: "Atelier Fassi",
      biography: "Atelier Fassi is a famous artisan in fes",
      region: {
        id: 1,
        name: "Fès-Meknès"
      },
      main_image: null
    },
    main_image: "https://www.lavieeco.com/wp-content/uploads/2023/07/Zellije.jpg",
    price: "25.50"
  },
  {
    id: 2,
    name: "Azilal Wool Rug",
    description: "Handwoven rug from the Azilal region using natural wool and vegetable dyes.",
    materials: "Natural wool, Vegetable dyes",
    dimensions: "120×180 cm",
    cultural_significance: "Diamond symbols represent protection and family bonds in Berber culture",
    category: {
      id: 2,
      name: "rugs"
    },
    region: {
      id: 2,
      name: "Azilal"
    },
    artisan: {
      id: 2,
      name: "Coop Tazwit Azilal",
      biography: "Women's cooperative specializing in traditional Berber weaving techniques",
      region: {
        id: 2,
        name: "Azilal"
      },
      main_image: null
    },
    main_image: "https://www.cmconjoncture.com/uploads/posts/64c295fa9580a_1690473978.png",
    price: "299.00"
  },
  {
    id: 3,
    name: "Tamegroute Pottery",
    description: "Authentic pottery with distinctive green glaze made from copper and local minerals.",
    materials: "Local clay, Copper oxide, Natural minerals",
    dimensions: "15×20 cm",
    cultural_significance: "Green color symbolizes Islam and paradise in Moroccan culture",
    category: {
      id: 3,
      name: "ceramics"
    },
    region: {
      id: 3,
      name: "Drâa-Tafilalet"
    },
    artisan: {
      id: 3,
      name: "Atelier Tamegroute",
      biography: "Traditional pottery workshop continuing 500-year-old techniques",
      region: {
        id: 3,
        name: "Drâa-Tafilalet"
      },
      main_image: null
    },
    main_image: "https://latribunedemarrakech.com/wp-content/uploads/2019/02/artisanat-maroc.jpg",
    price: "89.00"
  },
  {
    id: 4,
    name: "Beni Ourain Carpet",
    description: "Pure wool carpet featuring traditional black diamond patterns on cream background.",
    materials: "Pure sheep wool",
    dimensions: "200×300 cm",
    cultural_significance: "Diamond patterns ward off evil and bring good fortune in Berber tradition",
    category: {
      id: 2,
      name: "rugs"
    },
    region: {
      id: 4,
      name: "Middle Atlas"
    },
    artisan: {
      id: 4,
      name: "Fatima Beni Ourain",
      biography: "Master weaver from the Beni Ourain tribe, preserving ancestral techniques",
      region: {
        id: 4,
        name: "Middle Atlas"
      },
      main_image: null
    },
    main_image: "https://www.voyage-maroc.com/cdn/ma-public/ceramique_maroc-MAX-w1000h600.jpg",
    price: "445.00"
  },
  {
    id: 5,
    name: "Kilim Rug",
    description: "Flat-woven Kilim rug with tribal motifs, perfect for layering or lightweight decor.",
    materials: "Cotton and wool blend",
    dimensions: "90×150 cm",
    cultural_significance: "Flat-weave technique represents nomadic heritage and practicality",
    category: {
      id: 2,
      name: "rugs"
    },
    region: {
      id: 5,
      name: "Essaouira"
    },
    artisan: {
      id: 5,
      name: "Coopérative Amal Essaouira",
      biography: "Women's cooperative promoting traditional crafts and economic independence",
      region: {
        id: 5,
        name: "Essaouira"
      },
      main_image: null
    },
    main_image: "https://aujourdhui.ma/wp-content/uploads/2017/12/Artisanat-Tapis.jpg",
    price: "67.00"
  },
  {
    id: 6,
    name: "Leather Babouches",
    description: "Traditional pointed leather slippers handcrafted in the ancient tanneries of Fez.",
    materials: "Natural leather, Vegetable dyes",
    dimensions: "Size 40-42 EU",
    cultural_significance: "Yellow babouches traditionally worn by scholars and nobility",
    category: {
      id: 4,
      name: "footwear"
    },
    region: {
      id: 1,
      name: "Fès-Meknès"
    },
    artisan: {
      id: 6,
      name: "Atelier Cuir Fès",
      biography: "Traditional leather workshop using 1000-year-old tanning techniques",
      region: {
        id: 1,
        name: "Fès-Meknès"
      },
      main_image: null
    },
    main_image: "https://www.maroc-promotion.com/upload/artisanat-marocain-1615805580-37357.jpg",
    price: "78.00"
  }
];

const ProductGrid = () => {
  const navigate = useNavigate();
  const [products] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('popularity');

  const categories = Array.from(new Set(products.map(p => p.category.name)));

  const filteredProducts = products
    .filter(product => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category.name);
      const price = parseFloat(product.price);
      const priceMatch = price >= priceRange[0] && price <= priceRange[1];
      return categoryMatch && priceMatch;
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
    </div>
  );
};

export default ProductGrid;


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
    name: 'زليج أزرق تقليدي • Traditional Blue Zellige Tiles',
    price: 450,
    originalPrice: 620,
    artisan: 'الحاج عبد اللطيف الفاسي • Haj Abdellatif El Fassi',
    rating: 4.9,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=400&h=400&fit=crop',
    category: 'زليج • Zellige',
    isNew: true,
    description: 'بلاط زليج أزرق مصنوع يدوياً بالطريقة التقليدية الفاسية'
  },
  {
    id: '2',
    name: 'طاجين فخار مزخرف • Decorated Clay Tagine',
    price: 125,
    artisan: 'فاطمة بنت الصالة • Fatima Bent Sala',
    rating: 4.8,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    category: 'فخار • Pottery',
    description: 'طاجين من الفخار المحلي مزين بالنقوش التقليدية'
  },
  {
    id: '3',
    name: 'زربية بربرية أصيلة • Authentic Berber Carpet',
    price: 890,
    originalPrice: 1200,
    artisan: 'عيشة أمللو • Aicha Amellal',
    rating: 4.9,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    category: 'زرابي • Carpets',
    description: 'زربية منسوجة يدوياً بالصوف الطبيعي والألوان التقليدية'
  },
  {
    id: '4',
    name: 'صندوق مطعم بالفضة • Silver Inlaid Jewelry Box',
    price: 340,
    artisan: 'محمد التازي • Mohammed Tazi',
    rating: 4.7,
    reviewCount: 124,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
    category: 'معادن • Metalwork',
    description: 'صندوق خشبي مطعم بالفضة بنقوش إسلامية تقليدية'
  },
  {
    id: '5',
    name: 'بلغة جلدية ملونة • Colorful Leather Babouches',
    price: 95,
    artisan: 'يوسف العلمي • Youssef Alami',
    rating: 4.6,
    reviewCount: 198,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    category: 'جلود • Leather',
    isNew: true,
    description: 'بلغة تقليدية من الجلد الطبيعي مصبوغة بالألوان الطبيعية'
  },
  {
    id: '6',
    name: 'مرآة زليج موزاييك • Zellige Mosaic Mirror',
    price: 280,
    originalPrice: 380,
    artisan: 'لطيفة بنجلون • Latifa Benjelloun',
    rating: 4.8,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    category: 'زليج • Zellige',
    description: 'مرآة مؤطرة بالزليج الملون بنقوش هندسية تقليدية'
  },
  {
    id: '7',
    name: 'قاروب فخار أمازيغي • Amazigh Clay Jar',
    price: 165,
    artisan: 'حدو أوعسو • Haddou Ouassou',
    rating: 4.7,
    reviewCount: 92,
    image: 'https://images.unsplash.com/photo-1578316342292-9e2be3c6c3c8?w=400&h=400&fit=crop',
    category: 'فخار • Pottery',
    description: 'جرة فخارية تقليدية بنقوش أمازيغية أصيلة'
  },
  {
    id: '8',
    name: 'خنجر مغربي مزخرف • Decorated Moroccan Dagger',
    price: 520,
    artisan: 'عبد الرحمن الصفار • Abderrahman Saffar',
    rating: 4.9,
    reviewCount: 43,
    image: 'https://images.unsplash.com/photo-1565108808-9d2dc7fc8f35?w=400&h=400&fit=crop',
    category: 'معادن • Metalwork',
    isNew: true,
    description: 'خنجر تقليدي بمقبض منحوت ونصل مزين بالكتابة العربية'
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
      <div className="mb-8 text-center">
        <div className="inline-block p-6 rounded-lg moroccan-pattern bg-gradient-to-r from-warm-sand/20 to-golden/20 mb-4">
          <h1 className="text-4xl font-serif font-bold mb-3 bg-gradient-to-r from-terracotta via-golden to-deep-blue bg-clip-text text-transparent">
            سوق الحرفيين • Artisan Marketplace
          </h1>
          <p className="text-muted-foreground text-lg">
            اكتشف الحرف المغربية الأصيلة من صنع حرفيين ماهرين
          </p>
          <p className="text-muted-foreground">
            Discover authentic Moroccan crafts made by skilled artisans
          </p>
        </div>
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
          عرض {filteredProducts.length} من {products.length} منتج • Showing {filteredProducts.length} of {products.length} products
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
          <div className="inline-block p-6 rounded-lg bg-muted/50">
            <h3 className="text-lg font-medium mb-2">لم يتم العثور على منتجات • No products found</h3>
            <p className="text-muted-foreground mb-4">
              جرب تعديل المرشحات أو مصطلحات البحث • Try adjusting your filters or search terms
            </p>
            <button
              onClick={() => {
                setSelectedCategories([]);
                setPriceRange([0, 1000]);
              }}
              className="text-primary hover:underline bg-gradient-to-r from-terracotta to-golden bg-clip-text text-transparent font-semibold"
            >
              مسح جميع المرشحات • Clear all filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;

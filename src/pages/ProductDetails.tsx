import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, ShoppingBag, MapPin, Users, Palette, Hammer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';

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

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const product = SAMPLE_PRODUCTS.find(p => p.id === parseInt(id || '0'));
  
  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate('/')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const price = parseFloat(product.price);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.main_image || '/placeholder.svg'}
              alt={product.name}
              className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category.name}
              </Badge>
              <h1 className="text-3xl font-serif font-bold mb-2">
                {product.name}
              </h1>
              <p className="text-muted-foreground mb-4">
                by {product.artisan.name}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4 ? 'fill-golden text-golden' : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                4.5 (127 reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">
                ${price}
              </span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Dimensions */}
            <div className="space-y-2">
              <h4 className="font-semibold">Dimensions</h4>
              <p className="text-muted-foreground">{product.dimensions}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button size="lg" className="flex-1">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cultural Significance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Cultural Significance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {product.cultural_significance}
              </p>
            </CardContent>
          </Card>

          {/* Materials */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Materials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {product.materials}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Artisan Information */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Artisan Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-1">Artisan</h4>
                <p className="text-muted-foreground">{product.artisan.name}</p>
                <p className="text-sm text-muted-foreground mt-2">{product.artisan.biography}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Region</h4>
                <p className="text-muted-foreground">{product.region.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetails;

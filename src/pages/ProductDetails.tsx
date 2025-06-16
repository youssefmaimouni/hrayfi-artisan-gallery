
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, ShoppingBag, MapPin, Users, Palette, Hammer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';

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
    description: 'A flat-woven Kilim rug perfect for layering or lightweight decor. Durable and reversible, it’s ideal for high-traffic areas like hallways and kitchens. Earthy tones with tribal motifs bring character and Moroccan charm to any home.',
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

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const product = SAMPLE_PRODUCTS.find(p => p.id === id);
  
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

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

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
              src={product.image}
              alt={product.name}
              className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
            />
            {product.isNew && (
              <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                New
              </Badge>
            )}
            {discount > 0 && (
              <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category} • {product.subcategory}
              </Badge>
              <h1 className="text-3xl font-serif font-bold mb-2">
                {product.name}
              </h1>
              <p className="text-muted-foreground mb-4">
                by {product.artisan}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-golden text-golden'
                        : i < product.rating
                        ? 'fill-golden/50 text-golden'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

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

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Histoire */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Histoire & Heritage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {product.histoire}
              </p>
            </CardContent>
          </Card>

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
              <div className="space-y-2">
                {product.materials.map((material, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>{material}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Techniques */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hammer className="w-5 h-5" />
                Techniques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {product.techniques.map((technique, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>{technique}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Artisan Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold mb-1">Artisan</h4>
                <p className="text-muted-foreground">{product.artisan}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Region</h4>
                <p className="text-muted-foreground">{product.region}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Languages</h4>
                <p className="text-muted-foreground">{product.languages.join(', ')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetails;

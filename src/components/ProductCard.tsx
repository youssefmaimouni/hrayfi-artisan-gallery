
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
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
  onClick: () => void;
}

const ProductCard = ({ 
  name, 
  price, 
  originalPrice, 
  artisan, 
  image, 
  category,
  isNew,
  onClick 
}: ProductCardProps) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div 
      className="product-card group cursor-pointer animate-fade-in"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${name} by ${artisan}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={`${name} - handcrafted by ${artisan}`}
          className="product-image w-full h-64 object-cover transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-accent text-accent-foreground">
              New
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="bg-destructive text-destructive-foreground">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Category */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3">
          by {artisan}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">
            ${price}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

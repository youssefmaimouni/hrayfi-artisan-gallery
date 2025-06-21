
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface Product {
  id: string;
  name: string;
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
  price: number;
  image: string;
}

interface ProductFormProps {
  initialData?: Product | null;
  onSave: (product: Omit<Product, 'id'>) => void;
  onCancel: () => void;
}

const ProductForm = ({ initialData, onSave, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    histoire: initialData?.histoire || '',
    category: initialData?.category || '',
    subcategory: initialData?.subcategory || '',
    materials: initialData?.materials?.join(', ') || '',
    techniques: initialData?.techniques?.join(', ') || '',
    artisan: initialData?.artisan || '',
    region: initialData?.region || '',
    cultural_significance: initialData?.cultural_significance || '',
    languages: initialData?.languages?.join(', ') || '',
    tags: initialData?.tags?.join(', ') || '',
    price: initialData?.price || 0,
    image: initialData?.image || '/placeholder.svg'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      materials: formData.materials.split(',').map(m => m.trim()).filter(Boolean),
      techniques: formData.techniques.split(',').map(t => t.trim()).filter(Boolean),
      languages: formData.languages.split(',').map(l => l.trim()).filter(Boolean),
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    
    onSave(productData);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleChange('price', Number(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="histoire">Histoire (Story)</Label>
            <Textarea
              id="histoire"
              value={formData.histoire}
              onChange={(e) => handleChange('histoire', e.target.value)}
              rows={3}
              placeholder="Tell the story behind this product..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                placeholder="e.g., Rugs & Textiles"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subcategory">Subcategory</Label>
              <Input
                id="subcategory"
                value={formData.subcategory}
                onChange={(e) => handleChange('subcategory', e.target.value)}
                placeholder="e.g., Azilal"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="artisan">Artisan/Cooperative</Label>
              <Input
                id="artisan"
                value={formData.artisan}
                onChange={(e) => handleChange('artisan', e.target.value)}
                placeholder="e.g., Coop Tazwit Azilal"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Input
                id="region"
                value={formData.region}
                onChange={(e) => handleChange('region', e.target.value)}
                placeholder="e.g., Azilal"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="materials">Materials (comma separated)</Label>
            <Input
              id="materials"
              value={formData.materials}
              onChange={(e) => handleChange('materials', e.target.value)}
              placeholder="e.g., Natural wool, Vegetable dyes"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="techniques">Techniques (comma separated)</Label>
            <Input
              id="techniques"
              value={formData.techniques}
              onChange={(e) => handleChange('techniques', e.target.value)}
              placeholder="e.g., Hand-knotting"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cultural_significance">Cultural Significance</Label>
            <Textarea
              id="cultural_significance"
              value={formData.cultural_significance}
              onChange={(e) => handleChange('cultural_significance', e.target.value)}
              rows={2}
              placeholder="e.g., Diamond symbols represent protection and family"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="languages">Languages (comma separated)</Label>
              <Input
                id="languages"
                value={formData.languages}
                onChange={(e) => handleChange('languages', e.target.value)}
                placeholder="e.g., Arabic, French"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                placeholder="e.g., handmade, eco-friendly, Amazigh"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;

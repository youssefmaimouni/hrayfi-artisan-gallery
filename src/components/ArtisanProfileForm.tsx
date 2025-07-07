import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Save, X } from 'lucide-react';

interface Region {
  id: number;
  name: string;
}

interface Artisan {
  id: number;
  name: string;
  biography: string;
  phone: string;
  region: Region;
  main_image: string | null;
}

interface ArtisanProfileFormProps {
  artisan: Artisan;
  onUpdate: (updatedArtisan: Artisan) => void;
}

const ArtisanProfileForm = ({ artisan, onUpdate }: ArtisanProfileFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: artisan.name,
    biography: artisan.biography,
    phone: artisan.phone,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('access');
      const response = await fetch(`http://127.0.0.1:8000/api/artisans/${artisan.id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedArtisan = await response.json();
        onUpdate(updatedArtisan);
        setIsEditing(false);
      } else {
        console.error('Failed to update artisan profile');
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating artisan profile:', error);
      alert('An error occurred while updating your profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: artisan.name,
      biography: artisan.biography,
      phone: artisan.phone,
    });
    setIsEditing(false);
  };

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl">My Profile</CardTitle>
        {!isEditing && (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="biography">Biography</Label>
              <Textarea
                id="biography"
                value={formData.biography}
                onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                rows={4}
                placeholder="Tell us about yourself and your craft..."
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <Button type="submit" disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {artisan.main_image && (
                <img
                  src={artisan.main_image}
                  alt={artisan.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className="text-lg font-semibold">{artisan.name}</h3>
                <p className="text-muted-foreground">{artisan.region.name}</p>
                <p className="text-sm text-muted-foreground">{artisan.phone}</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Biography</h4>
              <p className="text-muted-foreground">{artisan.biography}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtisanProfileForm;
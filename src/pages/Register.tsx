import { useEffect, useState } from 'react';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, Link } from 'react-router-dom';
import Header from '@/components/Header';

interface Region {
  id: number;
  name: string;
}

const Register = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [formData, setFormData] = useState({
    username: '',
    email:'',
    password: '',
    confirmPassword: '',
    name: '',
    biography: '',
    region_id: '',
    main_image: null as File | null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/regions/')
      .then((res) => res.json())
      .then((data) => setRegions(data.results))
      .catch((err) => console.error('Error fetching regions:', err));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      main_image: e.target.files?.[0] || null
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);

    const data = new FormData();
    data.append('username', formData.username);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('name', formData.name);
    data.append('biography', formData.biography);
    data.append('region_id', formData.region_id);
    if (formData.main_image) {
      data.append('main_image', formData.main_image);
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.detail || 'Registration failed');
      } else {
        alert('Registration successful! Please login.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header/>
      <div className="min-h-screen gradient-bg moroccan-pattern flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-teal/20">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <h1 className="text-3xl font-serif font-bold bg-gradient-to-r from-terracotta to-teal bg-clip-text text-transparent">
                Hraifia
              </h1>
            </div>
            <CardTitle className="text-2xl text-terracotta">Join as Artisan</CardTitle>
            <p className="text-muted-foreground">
              Create your account to showcase your authentic Moroccan crafts
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="e.g., artisan123"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="region_id">Region</Label>
                <select
                  id="region_id"
                  name="region_id"
                  value={formData.region_id}
                  onChange={handleInputChange}
                  className="w-full border-teal/30 focus:border-teal focus:ring-teal/20 rounded-md px-3 py-2"
                  required
                >
                  <option value="">-- Select Region --</option>
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="biography">Craft / Biography</Label>
                <Input
                  id="biography"
                  name="biography"
                  type="text"
                  placeholder="e.g., Pottery master in Marrakech"
                  value={formData.biography}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="main_image">Profile Image</Label>
                <Input
                  id="main_image"
                  name="main_image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-teal/10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-teal/10"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-terracotta to-teal hover:from-terracotta/90 hover:to-teal/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>Creating Account...</>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Account
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-teal hover:text-teal/80 hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Register;

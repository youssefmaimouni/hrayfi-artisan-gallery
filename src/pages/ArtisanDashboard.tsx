import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Package, Eye } from "lucide-react";
import ProductForm from "@/components/ProductForm"; // Assuming you have a ProductForm component
import Header from '@/components/Header';

interface Region {
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

interface Category {
  id: number;
  name: string;
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

const ArtisanPage = () => {
  const { id } = useParams<{ id: string }>();
  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingArtisan, setLoadingArtisan] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoadingArtisan(true);
    fetch(`http://127.0.0.1:8000/api/artisans/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch artisan");
        return res.json();
      })
      .then((data) => {
        setArtisan(data);
        setLoadingArtisan(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoadingArtisan(false);
      });
  }, [id]);

  useEffect(() => {
    if (!id) return;
    setLoadingProducts(true);
    setError(null);
    fetch(`http://127.0.0.1:8000/api/artisans/${id}/products/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data.results);
        setLoadingProducts(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoadingProducts(false);
      });
  }, [id]);

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = async (productId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/products/${productId}/`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
      } else {
        const err = await res.json();
        console.error("Delete error:", err);
        alert(err.detail || "Failed to delete product");
      }
    } catch (error) {
      console.error("Delete request failed:", error);
      alert("An error occurred while deleting the product.");
    }
  };

  const handleSaveProduct = (savedProduct: Product) => {
    // Implement your save logic here, then refresh or update products state
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleSave = (savedProduct: Product) => {
    setProducts((prev) => {
      const existingIndex = prev.findIndex((p) => p.id === savedProduct.id);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = savedProduct;
        return updated;
      } else {
        return [...prev, savedProduct];
      }
    });
    setEditingProduct(null);
    setIsFormOpen(false);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  if (loadingArtisan || loadingProducts) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">Error: {error}</div>;
  }

  if (!artisan) {
    return <div className="p-8 text-center">Artisan not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header/>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(products.map((p) => p.category.name)).size}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Price</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $
                {products.length > 0
                  ? Math.round(
                      products.reduce((sum, p) => sum + parseFloat(p.price), 0) / products.length
                    )
                  : 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Your Products</h2>
          <Button onClick={handleAddProduct}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="product-card">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                {product.main_image ? (
                  <img
                    src={product.main_image}
                    alt={product.name}
                    className="w-full h-full object-cover product-image transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">{product.category.name}</span>
                  <span className="font-bold text-primary">${product.price}</span>
                </div>

                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products yet</h3>
            <p className="text-muted-foreground mb-4">
              Start by adding your first artisan product to showcase your craftsmanship.
            </p>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Product
            </Button>
          </div>
        )}

        <ProductForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
          onSave={handleSave}
          artisanId={id!}
          editingProduct={editingProduct}
        />
      </div>
    </div>
  );
};

export default ArtisanPage;

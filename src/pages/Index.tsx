
import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';
import Chatbot from '@/components/Chatbot';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ProductGrid />
      </main>
      <Chatbot />
    </div>
  );
};

export default Index;

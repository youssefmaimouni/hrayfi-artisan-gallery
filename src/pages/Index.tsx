
import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';
import Chatbot from '@/components/Chatbot';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <ProductGrid />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;

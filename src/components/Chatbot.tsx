
import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to Hrayfi. How can I help you find the perfect Moroccan artisan product today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('rug') || input.includes('textile')) {
      return 'Our rugs and textiles are handwoven by skilled artisans from regions like Azilal and Beni Ourain. Each piece tells a unique story through its patterns and colors. Would you like to know more about a specific style?';
    }
    
    if (input.includes('pottery') || input.includes('ceramic')) {
      return 'Moroccan pottery, especially from Tamegroute and Fez, has been crafted for centuries using traditional techniques. The distinctive green glaze of Tamegroute pottery comes from copper found in local mountains. What type of pottery interests you?';
    }
    
    if (input.includes('price') || input.includes('cost')) {
      return 'Our prices reflect the authentic craftsmanship and quality materials used. Each piece is fairly priced to support our artisan partners. You can find detailed pricing on each product page.';
    }
    
    if (input.includes('shipping') || input.includes('delivery')) {
      return 'We offer worldwide shipping with careful packaging to ensure your handcrafted items arrive safely. Shipping times vary by location, typically 5-14 business days internationally.';
    }
    
    if (input.includes('artisan') || input.includes('maker')) {
      return 'We work directly with artisan cooperatives and individual craftspeople across Morocco. Each product page includes information about the artisan and their region. This ensures fair trade and authentic craftsmanship.';
    }
    
    if (input.includes('hello') || input.includes('hi')) {
      return 'Hello! I\'m here to help you discover the beauty of Moroccan craftsmanship. Are you looking for something specific, or would you like recommendations?';
    }
    
    return 'Thank you for your question! I\'d be happy to help you learn more about our authentic Moroccan crafts. You can browse our categories or ask me about specific products, artisans, or regions.';
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
          size="icon"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">Hrayfi Assistant</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-3">
            {/* Messages */}
            <ScrollArea className="flex-1 pr-3 mb-3">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.isUser
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about our products..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                disabled={!inputMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;

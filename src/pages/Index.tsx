import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Businesses from "@/components/Businesses";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Businesses />
      <Footer />
    </div>
  );
};

export default Index;

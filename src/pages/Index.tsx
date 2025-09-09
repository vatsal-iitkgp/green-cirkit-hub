import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhyGreenCirkit from "@/components/WhyGreenCirkit";
import Businesses from "@/components/Businesses";
import Impact from "@/components/Impact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <WhyGreenCirkit />
      <Businesses />
      <Impact />
      <Footer />
    </div>
  );
};

export default Index;

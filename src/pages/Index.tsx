import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Businesses from "@/components/Businesses";
import WhyGreenCirkit from "@/components/WhyGreenCirkit";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-primary/5 to-green-light/20">
      <Navigation />
      <Hero />
      <Businesses />
      <WhyGreenCirkit />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;

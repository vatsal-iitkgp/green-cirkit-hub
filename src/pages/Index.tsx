import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Businesses from "@/components/Businesses";
import WhyGreenCirkit from "@/components/WhyGreenCirkit";
import Roadmap from "@/components/Roadmap";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Businesses />
      <WhyGreenCirkit />
      <Roadmap />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;

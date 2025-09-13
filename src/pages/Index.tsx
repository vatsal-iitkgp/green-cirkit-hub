import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhyGreenCirkit from "@/components/WhyGreenCirkit";
import Businesses from "@/components/Businesses";
import PlasticJourneyParallax from "@/components/PlasticJourneyParallax";
import Impact from "@/components/Impact";
import IndustryInsights from "@/components/IndustryInsights";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <WhyGreenCirkit />
      <PlasticJourneyParallax />
      <Businesses />
      <Impact />
      <IndustryInsights />
      <Footer />
    </div>
  );
};

export default Index;

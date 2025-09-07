import { ArrowRight, Recycle, TrendingUp, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="pt-16 min-h-screen bg-gradient-to-br from-green-primary via-green-light to-green-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Engineering Sustainability
            <span className="block text-green-light">with Technology</span>
          </h1>
          <p className="text-xl md:text-2xl text-green-light/90 mb-8 max-w-3xl mx-auto">
            Transforming plastic waste into valuable resources through innovative technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4 bg-white text-green-primary hover:bg-green-light">
              Explore Our Solutions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-green-primary">
              Contact Us
            </Button>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white/10 backdrop-blur rounded-2xl p-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="h-8 w-8 text-green-primary" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">3.3M</div>
              <div className="text-green-light/80">Tonnes of Plastic Waste Annually</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur rounded-2xl p-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-secondary" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">$9.6B</div>
              <div className="text-green-light/80">Recycling Market by 2025</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur rounded-2xl p-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-green-accent" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">$2.5B</div>
              <div className="text-green-light/80">EPR Market Opportunity</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
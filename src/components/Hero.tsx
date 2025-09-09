import { ArrowRight, Recycle, TrendingUp, Globe, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="pt-20 pb-8 min-h-screen bg-gradient-to-br from-background via-green-primary/10 to-green-secondary/15 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-green-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-green-accent/15 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-40 left-1/4 w-48 h-48 bg-green-light/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-green-secondary/10 rounded-full blur-2xl animate-bounce delay-500"></div>
        
        {/* Recycling Icons */}
        <div className="absolute top-32 right-1/4 opacity-5">
          <Recycle className="h-24 w-24 text-green-primary animate-spin" style={{animationDuration: '8s'}} />
        </div>
        <div className="absolute bottom-32 left-1/3 opacity-5">
          <Leaf className="h-20 w-20 text-green-accent animate-pulse" />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Hero Content */}
        <div className="text-center mb-20">
          <div className="mb-12">
            <div className="h-20 mb-8 flex items-center justify-center">
              <span className="text-7xl md:text-9xl font-black text-green-primary">
                GreenCirkit
              </span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
            Engineering Sustainability.
            <span className="block text-green-primary mt-4">Powered by Technology.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
            From recycled HDPE granules to seamless EPR compliance – we close the loop on plastic sustainability.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Button size="lg" className="text-xl px-12 py-8 bg-green-primary text-primary-foreground hover:bg-green-primary/90 shadow-2xl hover:shadow-green hover:scale-105 transition-all duration-300 rounded-2xl font-semibold">
              Explore Solutions
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button variant="outline" size="lg" className="text-xl px-12 py-8 border-2 border-green-primary text-green-primary hover:bg-green-primary hover:text-primary-foreground transition-all duration-300 rounded-2xl font-semibold hover:scale-105">
              Partner With Us
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
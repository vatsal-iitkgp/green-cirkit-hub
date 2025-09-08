import { ArrowRight, Recycle, TrendingUp, Globe, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="pt-20 min-h-screen bg-gradient-to-br from-background via-accent/30 to-primary/10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-accent/20 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-green-light/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-primary/15 rounded-full blur-xl animate-bounce delay-500"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Hero Content */}
        <div className="text-center mb-20">
          <div className="mb-8">
            <Leaf className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
            <span className="text-6xl md:text-8xl font-extrabold text-primary block mb-2">GreenCirkit</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Engineering Sustainability
            <span className="block text-primary mt-2">with Technology</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Transforming plastic waste into valuable resources through innovative technology and circular economy solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="text-lg px-10 py-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300">
              Explore Solutions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-10 py-6 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              Partner With Us
            </Button>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-card/80 backdrop-blur-sm border border-border rounded-3xl p-8 hover:shadow-lg transition-all duration-300">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Recycle className="h-10 w-10 text-primary" />
            </div>
            <div className="text-4xl font-bold text-foreground mb-3">3.3M</div>
            <div className="text-muted-foreground font-medium">Tonnes of Plastic Waste Annually</div>
          </div>
          <div className="text-center bg-card/80 backdrop-blur-sm border border-border rounded-3xl p-8 hover:shadow-lg transition-all duration-300">
            <div className="w-20 h-20 bg-green-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="h-10 w-10 text-green-accent" />
            </div>
            <div className="text-4xl font-bold text-foreground mb-3">$9.6B</div>
            <div className="text-muted-foreground font-medium">Recycling Market by 2025</div>
          </div>
          <div className="text-center bg-card/80 backdrop-blur-sm border border-border rounded-3xl p-8 hover:shadow-lg transition-all duration-300">
            <div className="w-20 h-20 bg-green-light/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe className="h-10 w-10 text-green-light" />
            </div>
            <div className="text-4xl font-bold text-foreground mb-3">$2.5B</div>
            <div className="text-muted-foreground font-medium">EPR Market Opportunity</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import { ArrowRight, Recycle, TrendingUp, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Hero = () => {
  return (
    <section id="home" className="pt-16 min-h-screen bg-gradient-to-br from-green-light via-background to-green-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6">
            Engineering Sustainability
            <span className="block text-green-secondary">with Technology</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Transforming plastic waste into valuable resources through innovative technology and strategic partnerships
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4">
              Explore Our Solutions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Learn More
            </Button>
          </div>
        </div>

        {/* Problem & Opportunity */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 border-2 border-destructive/20 bg-card/80 backdrop-blur">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold text-destructive mb-4">The Problem</h3>
              <p className="text-muted-foreground mb-4">
                India generates over 3.3 million tonnes of plastic waste annually, with inadequate recycling infrastructure and limited traceability in the circular economy.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-destructive">
                  <div className="w-2 h-2 bg-destructive rounded-full mr-3"></div>
                  <span>Poor waste collection systems</span>
                </div>
                <div className="flex items-center text-destructive">
                  <div className="w-2 h-2 bg-destructive rounded-full mr-3"></div>
                  <span>Lack of traceability in recycling</span>
                </div>
                <div className="flex items-center text-destructive">
                  <div className="w-2 h-2 bg-destructive rounded-full mr-3"></div>
                  <span>Limited EPR compliance infrastructure</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-8 border-2 border-primary/20 bg-card/80 backdrop-blur">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold text-primary mb-4">The Opportunity</h3>
              <p className="text-muted-foreground mb-4">
                The Indian plastic recycling market is projected to reach $9.6 billion by 2025, with growing EPR regulations creating new value streams.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-primary">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span>Growing EPR market worth $2.5B</span>
                </div>
                <div className="flex items-center text-primary">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span>Tech-enabled circular solutions</span>
                </div>
                <div className="flex items-center text-primary">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span>Export opportunities to global markets</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Impact Stats */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-12">Main Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">3.3M</div>
              <div className="text-muted-foreground">Tonnes of Plastic Waste Generated Annually</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-4xl font-bold text-green-secondary mb-2">$9.6B</div>
              <div className="text-muted-foreground">Recycling Market Size by 2025</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-accent-foreground" />
              </div>
              <div className="text-4xl font-bold text-accent mb-2">$2.5B</div>
              <div className="text-muted-foreground">EPR Market Opportunity</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
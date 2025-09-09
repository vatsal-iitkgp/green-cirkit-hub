import { Brain, Award, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WhyGreenCirkit = () => {
  const coreAdvantages = [
    {
      icon: Brain,
      title: "Better Quality",
      description: "Premium recycled materials with consistent quality standards and certifications"
    },
    {
      icon: Award,
      title: "Cost Effective", 
      description: "Competitive pricing with superior value for your sustainability investments"
    },
    {
      icon: MapPin,
      title: "PAN India Presence",
      description: "Nationwide coverage with local expertise and reliable supply chain network"
    }
  ];

  return (
    <section id="why" className="py-20 bg-gradient-to-b from-green-secondary/10 to-green-light/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Why Choose GreenCirkit</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Leading the industry with superior quality, affordability, and comprehensive coverage
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {coreAdvantages.map((advantage, index) => (
            <Card key={index} className="text-center bg-card/90 backdrop-blur border-primary/20 hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <advantage.icon className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">{advantage.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{advantage.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Differentiators */}
        <div className="bg-gradient-to-r from-primary/5 to-green-accent/5 rounded-3xl p-8 backdrop-blur">
          <h3 className="text-2xl font-bold text-center text-primary mb-8">Our Key Differentiators</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center bg-card/80 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-black text-primary mb-2">15%</div>
              <div className="text-sm font-medium text-muted-foreground">Lower EPR Costs</div>
            </div>
            <div className="text-center bg-card/80 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-accent/20 transition-colors">
                <Brain className="h-8 w-8 text-green-accent" />
              </div>
              <div className="text-3xl font-black text-green-accent mb-2">99.9%</div>
              <div className="text-sm font-medium text-muted-foreground">Traceable Certificates</div>
            </div>
            <div className="text-center bg-card/80 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-light/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-light/20 transition-colors">
                <MapPin className="h-8 w-8 text-green-light" />
              </div>
              <div className="text-3xl font-black text-green-light mb-2">24/7</div>
              <div className="text-sm font-medium text-muted-foreground">Support & Monitoring</div>
            </div>
            <div className="text-center bg-card/80 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-secondary/20 transition-colors">
                <MapPin className="h-8 w-8 text-green-secondary" />
              </div>
              <div className="text-3xl font-black text-green-secondary mb-2">PAN</div>
              <div className="text-sm font-medium text-muted-foreground">India Coverage</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyGreenCirkit;
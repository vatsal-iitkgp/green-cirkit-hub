import { Brain, Award, MapPin, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WhyGreenCirkit = () => {
  const advantages = [
    {
      icon: Brain,
      title: "Tech-Driven Scalable Solutions",
      description: "Advanced IoT tracking, blockchain traceability, and AI-powered waste optimization ensure maximum efficiency and transparency in every transaction.",
      features: ["IoT-enabled waste tracking", "Blockchain transparency", "AI optimization algorithms", "Real-time monitoring systems"]
    },
    {
      icon: Award,
      title: "IIT Leadership Credibility",
      description: "Founded and led by IIT alumni with deep technical expertise and proven track record in sustainable technology innovations.",
      features: ["IIT Roorkee founding team", "20+ years combined experience", "Patent-pending technologies", "Academic research partnerships"]
    },
    {
      icon: TrendingUp,
      title: "EPR Advantage",
      description: "First-mover advantage in EPR credit generation with comprehensive compliance solutions and competitive pricing structure.",
      features: ["Complete EPR compliance", "Cost-effective credit pricing", "Regulatory expertise", "Government liaison support"]
    },
    {
      icon: MapPin,
      title: "Strategic Moradabad Location",
      description: "Positioned in India's plastic hub with access to major supply chains, export infrastructure, and established industrial networks.",
      features: ["Access to raw material supply", "Export port connectivity", "Established industrial ecosystem", "Skilled workforce availability"]
    }
  ];

  return (
    <section id="why" className="py-20 bg-gradient-to-b from-green-light/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Why GreenCirkit</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Combining technical excellence with strategic positioning to lead India's circular economy transformation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {advantages.map((advantage, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <advantage.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-3">{advantage.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{advantage.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {advantage.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-green-secondary rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-primary mb-8">Our Competitive Edge</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">15%</div>
              <div className="text-sm text-muted-foreground">Lower EPR Costs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-secondary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Traceability Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Real-time Monitoring</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">ISO</div>
              <div className="text-sm text-muted-foreground">Certified Quality</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyGreenCirkit;
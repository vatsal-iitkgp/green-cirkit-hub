import { Brain, Award, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WhyGreenCirkit = () => {
  const advantages = [
    {
      icon: Brain,
      title: "Tech-Driven Solutions",
      description: "IoT tracking and blockchain traceability for maximum transparency"
    },
    {
      icon: Award,
      title: "IIT Leadership",
      description: "Founded by IIT alumni with proven expertise in sustainable technology"
    },
    {
      icon: MapPin,
      title: "Strategic Location",
      description: "Based in Moradabad - India's plastic hub with export infrastructure"
    }
  ];

  return (
    <section id="why" className="py-16 bg-gradient-to-b from-green-secondary/20 to-green-light/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Why GreenCirkit</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <Card key={index} className="text-center bg-white/80 backdrop-blur border-primary/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <advantage.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{advantage.title}</h3>
                <p className="text-sm text-muted-foreground">{advantage.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center">
          <div className="bg-white/60 rounded-lg p-4">
            <div className="text-2xl font-bold text-primary mb-1">15%</div>
            <div className="text-xs text-muted-foreground">Lower EPR Costs</div>
          </div>
          <div className="bg-white/60 rounded-lg p-4">
            <div className="text-2xl font-bold text-primary mb-1">99.9%</div>
            <div className="text-xs text-muted-foreground">Traceability</div>
          </div>
          <div className="bg-white/60 rounded-lg p-4">
            <div className="text-2xl font-bold text-primary mb-1">24/7</div>
            <div className="text-xs text-muted-foreground">Monitoring</div>
          </div>
          <div className="bg-white/60 rounded-lg p-4">
            <div className="text-2xl font-bold text-primary mb-1">ISO</div>
            <div className="text-xs text-muted-foreground">Certified</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyGreenCirkit;
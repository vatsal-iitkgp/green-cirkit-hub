import { CheckCircle, Circle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Roadmap = () => {
  const phases = [
    {
      phase: "Phase 1",
      title: "Foundation",
      timeline: "2024 - Q1/Q2",
      status: "active",
      description: "Establishing core operations and technology infrastructure",
      goals: [
        "Launch HDPE granule production facility",
        "Deploy IoT tracking systems",
        "Establish EPR credit generation",
        "Build initial customer base"
      ],
      metrics: "Target: 500 MT/month processing capacity"
    },
    {
      phase: "Phase 2", 
      title: "Expansion",
      timeline: "2024 - Q3/Q4",
      status: "planned",
      description: "Scaling operations and expanding service offerings",
      goals: [
        "Increase processing to 2,000 MT/month",
        "Launch blockchain traceability platform",
        "Expand to 3 additional cities",
        "Add PET and PP recycling streams"
      ],
      metrics: "Target: ₹50Cr annual revenue"
    },
    {
      phase: "Phase 3",
      title: "Global Exports",
      timeline: "2025",
      status: "future",
      description: "International market expansion and export operations",
      goals: [
        "Establish export partnerships",
        "Launch international EPR services",
        "Scale to 5,000 MT/month capacity", 
        "Enter Southeast Asian markets"
      ],
      metrics: "Target: 40% export revenue contribution"
    },
    {
      phase: "Phase 4",
      title: "Diversification",
      timeline: "2026+",
      status: "future",
      description: "Technology licensing and platform expansion",
      goals: [
        "License technology platform",
        "Launch franchise operations",
        "Enter chemical recycling",
        "Develop circular economy ecosystem"
      ],
      metrics: "Target: Market leadership position"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-6 w-6 text-primary" />;
      case "planned":
        return <Circle className="h-6 w-6 text-green-secondary fill-green-secondary/20" />;
      default:
        return <Circle className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "border-primary bg-primary/5";
      case "planned":
        return "border-green-secondary bg-green-secondary/5";
      default:
        return "border-muted bg-muted/20";
    }
  };

  return (
    <section id="roadmap" className="py-20 bg-gradient-to-b from-background to-green-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Roadmap & Growth</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Strategic growth phases designed to scale sustainable impact and establish market leadership
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-border"></div>

          <div className="space-y-12">
            {phases.map((phase, index) => (
              <div key={index} className={`relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex flex-col md:flex items-center`}>
                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-4 h-4 bg-background border-2 border-primary rounded-full"></div>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <Card className={`${getStatusColor(phase.status)} border-2 transition-all duration-300 hover:shadow-lg`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(phase.status)}
                          <div>
                            <h3 className="text-xl font-bold text-primary">{phase.phase}</h3>
                            <p className="text-sm text-muted-foreground">{phase.timeline}</p>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      </div>

                      <h4 className="text-2xl font-bold mb-3">{phase.title}</h4>
                      <p className="text-muted-foreground mb-4">{phase.description}</p>

                      <div className="space-y-2 mb-4">
                        {phase.goals.map((goal, goalIndex) => (
                          <div key={goalIndex} className="flex items-start">
                            <div className="w-1.5 h-1.5 bg-green-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-sm">{goal}</span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-primary">{phase.metrics}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Projection */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-primary mb-8">Projected Growth Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">₹200Cr</div>
              <div className="text-sm text-muted-foreground">Revenue by 2026</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-secondary mb-2">50,000</div>
              <div className="text-sm text-muted-foreground">MT Annual Capacity</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Cities Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Partner Companies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
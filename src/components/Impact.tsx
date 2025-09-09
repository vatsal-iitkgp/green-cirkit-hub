import { Recycle, TrendingUp, Globe } from "lucide-react";

const Impact = () => {
  return (
    <section id="impact" className="py-20 bg-gradient-to-br from-green-primary/5 to-green-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Our Impact</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Measurable results in plastic sustainability and environmental protection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-card/80 backdrop-blur-lg border border-green-primary/20 rounded-3xl p-10 hover:shadow-green hover:scale-105 transition-all duration-300">
            <div className="w-24 h-24 bg-green-primary/15 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Recycle className="h-12 w-12 text-green-primary" />
            </div>
            <div className="text-5xl font-black text-green-primary mb-4">1,200</div>
            <div className="text-foreground font-semibold text-lg">Tonnes of Plastic Recycled</div>
          </div>
          
          <div className="text-center bg-card/80 backdrop-blur-lg border border-green-accent/20 rounded-3xl p-10 hover:shadow-green hover:scale-105 transition-all duration-300">
            <div className="w-24 h-24 bg-green-accent/15 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <TrendingUp className="h-12 w-12 text-green-accent" />
            </div>
            <div className="text-5xl font-black text-green-accent mb-4">850</div>
            <div className="text-foreground font-semibold text-lg">EPR Credits Issued</div>
          </div>
          
          <div className="text-center bg-card/80 backdrop-blur-lg border border-green-light/20 rounded-3xl p-10 hover:shadow-green hover:scale-105 transition-all duration-300">
            <div className="w-24 h-24 bg-green-light/15 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Globe className="h-12 w-12 text-green-light" />
            </div>
            <div className="text-5xl font-black text-green-light mb-4">2,400</div>
            <div className="text-foreground font-semibold text-lg">Tonnes CO₂ Emission Reduced</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
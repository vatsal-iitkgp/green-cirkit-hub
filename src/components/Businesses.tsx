import { useState } from "react";
import { ArrowRight, Factory, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HDPEEnquiryModal from "./HDPEEnquiryModal";
import EPREnquiryModal from "./EPREnquiryModal";

const Businesses = () => {
  const [isHDPEModalOpen, setIsHDPEModalOpen] = useState(false);
  const [isEPRModalOpen, setIsEPRModalOpen] = useState(false);

  return (
    <>
      <section id="businesses" className="py-24 bg-gradient-to-br from-green-light/20 via-green-primary/5 to-green-accent/10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-primary mb-8 bg-gradient-to-r from-primary to-green-accent bg-clip-text text-transparent">Our Services</h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions for sustainable plastic management and EPR compliance
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* HDPE Granules Card */}
          <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur border-2 border-primary/30 rounded-3xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <CardHeader className="text-center pb-6 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Factory className="h-12 w-12 text-primary-foreground" />
              </div>
              <CardTitle className="text-3xl font-bold text-primary">HDPE Granules</CardTitle>
              <p className="text-muted-foreground text-lg">Premium recycled materials for manufacturing</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>ISO certified quality with consistent specifications</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>Complete supply chain traceability</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>Competitive pricing with guaranteed supply</span>
                </div>
              </div>
              <Button 
                className="w-full text-lg py-6 rounded-xl" 
                size="lg"
                onClick={() => setIsHDPEModalOpen(true)}
              >
                Buy HDPE Granules
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>

          {/* EPR Services Card */}
          <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur border-2 border-green-accent/30 rounded-3xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <CardHeader className="text-center pb-6 bg-gradient-to-br from-green-accent/10 to-green-accent/5">
              <div className="w-24 h-24 bg-gradient-to-br from-green-accent to-green-accent/70 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="h-12 w-12 text-primary-foreground" />
              </div>
              <CardTitle className="text-3xl font-bold text-primary">EPR Services</CardTitle>
              <p className="text-muted-foreground text-lg">Complete Extended Producer Responsibility solutions</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-accent mr-3 flex-shrink-0" />
                  <span>99.9% traceable EPR certificates</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-accent mr-3 flex-shrink-0" />
                  <span>15% lower costs than market alternatives</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-accent mr-3 flex-shrink-0" />
                  <span>24/7 compliance support and monitoring</span>
                </div>
              </div>
              <Button 
                variant="secondary" 
                className="w-full text-lg py-6 rounded-xl" 
                size="lg"
                onClick={() => setIsEPRModalOpen(true)}
              >
                Get EPR Credits
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
      </section>

      <HDPEEnquiryModal 
        isOpen={isHDPEModalOpen} 
        onClose={() => setIsHDPEModalOpen(false)} 
      />
      <EPREnquiryModal 
        isOpen={isEPRModalOpen} 
        onClose={() => setIsEPRModalOpen(false)} 
      />
    </>
  );
};
export default Businesses;
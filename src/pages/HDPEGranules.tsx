import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircle, Recycle, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import HDPEEnquiryModal from "@/components/HDPEEnquiryModal";
import ImpactCalculatorModal from "@/components/ImpactCalculatorModal";

const HDPEGranules = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Premium HDPE Granules
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              We are developing high-quality recycled HDPE granules engineered for superior performance. 
              Sustainable, cost-effective solutions designed for your manufacturing needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-6 text-lg"
              >
                Get Quote Now
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                onClick={() => setIsCalculatorOpen(true)}
                className="px-8 py-6 text-lg"
              >
                🧮 Calculate Environmental Impact
              </Button>
            </div>
          </div>

          {/* Product Specifications */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Recycle className="h-5 w-5 text-primary" />
                  Product Specifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Material:</span>
                  <span>100% Recycled HDPE</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Melt Flow Index:</span>
                  <span>0.3-35 g/10min</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Density:</span>
                  <span>0.940-0.965 g/cm³</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Color:</span>
                  <span>Natural, Black, Custom</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Packaging:</span>
                  <span>25kg bags</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Quality Assurance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>ISO 9001:2015 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>100% Traceable Source</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Rigorous Quality Testing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Consistent Properties</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Low Contamination</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Applications */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Applications</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-lg border">
                <h3 className="font-semibold mb-2">Bottles & Containers</h3>
                <p className="text-muted-foreground">Milk jugs, detergent bottles, food containers</p>
              </div>
              <div className="text-center p-6 rounded-lg border">
                <h3 className="font-semibold mb-2">Pipes & Fittings</h3>
                <p className="text-muted-foreground">Water pipes, gas pipes, irrigation systems</p>
              </div>
              <div className="text-center p-6 rounded-lg border">
                <h3 className="font-semibold mb-2">Industrial Products</h3>
                <p className="text-muted-foreground">Crates, pallets, automotive components</p>
              </div>
            </div>
          </div>

          {/* Why Choose Our HDPE */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Why Choose Our HDPE Granules?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Superior Quality</h3>
                <p className="text-sm text-muted-foreground">Consistent properties and performance</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Recycle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">100% Recycled</h3>
                <p className="text-sm text-muted-foreground">Environmentally sustainable solution</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">PAN India delivery network</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Cost Effective</h3>
                <p className="text-sm text-muted-foreground">Competitive pricing with quality</p>
              </div>
            </div>
            <Button 
              size="lg" 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-6 text-lg"
            >
              Request Quote
            </Button>
          </div>
        </div>
      </section>

      <HDPEEnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
      <ImpactCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
      
      <Footer />
    </div>
  );
};

export default HDPEGranules;
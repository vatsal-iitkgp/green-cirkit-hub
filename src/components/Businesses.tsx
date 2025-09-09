import { ArrowRight, Truck, Factory, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
const Businesses = () => {
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  return <section id="businesses" className="py-24 bg-gradient-to-br from-green-light/20 via-green-primary/5 to-green-accent/10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-primary mb-8 bg-gradient-to-r from-primary to-green-accent bg-clip-text text-transparent">Our Services</h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive solutions for sustainable plastic management
          </p>
        </div>

        {/* Enhanced Business Category Buttons */}
        <div className="flex flex-col md:flex-row gap-8 mb-16 justify-center">
          <Button size="lg" variant={selectedBusiness === "hdpe" ? "default" : "outline"} onClick={() => {
          setSelectedBusiness(selectedBusiness === "hdpe" ? null : "hdpe");
          setSelectedSubCategory(null);
        }} className="text-2xl px-16 py-12 h-auto flex flex-col items-center space-y-4 rounded-3xl border-2 hover:scale-105 transition-all duration-300 shadow-2xl backdrop-blur bg-gradient-to-br from-card/90 to-card/60">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-lg">
              <Factory className="h-10 w-10 text-primary-foreground" />
            </div>
            <span className="font-bold">HDPE Granules</span>
            <span className="text-sm text-muted-foreground font-normal">Premium recycled materials</span>
          </Button>
          
          <Button size="lg" variant={selectedBusiness === "epr" ? "default" : "outline"} onClick={() => {
          setSelectedBusiness(selectedBusiness === "epr" ? null : "epr");
          setSelectedSubCategory(null);
        }} className="text-2xl px-16 py-12 h-auto flex flex-col items-center space-y-4 rounded-3xl border-2 hover:scale-105 transition-all duration-300 shadow-2xl backdrop-blur bg-gradient-to-br from-card/90 to-card/60">
            <div className="w-20 h-20 bg-gradient-to-br from-green-accent to-green-accent/70 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="h-10 w-10 text-primary-foreground" />
            </div>
            <span className="font-bold">EPR Services</span>
            <span className="text-sm text-muted-foreground font-normal">Compliance made simple</span>
          </Button>
        </div>

        {/* HDPE Granules Content */}
        {selectedBusiness === "hdpe" && <div className="mb-8">
            <Card className="border-2 border-primary/30 bg-green-light/50 backdrop-blur">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-primary">HDPE Granules Business</CardTitle>
                <p className="text-muted-foreground">High-quality recycled HDPE granules</p>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 justify-center mb-6">
                  <Button variant={selectedSubCategory === "sell" ? "default" : "outline"} onClick={() => setSelectedSubCategory(selectedSubCategory === "sell" ? null : "sell")} className="flex items-center space-x-2">
                    <Truck className="h-4 w-4" />
                    <span>Sell to Us</span>
                  </Button>
                  <Button variant={selectedSubCategory === "buy" ? "default" : "outline"} onClick={() => setSelectedSubCategory(selectedSubCategory === "buy" ? null : "buy")} className="flex items-center space-x-2">
                    <Factory className="h-4 w-4" />
                    <span>Buy from Us</span>
                  </Button>
                </div>

                {/* Sell to Us Content */}
                {selectedSubCategory === "sell" && <div className="bg-white/80 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-primary mb-4">Sell Your Plastic Waste</h3>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-primary mr-3" />
                        <span className="text-sm">Competitive pricing</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-primary mr-3" />
                        <span className="text-sm">Scheduled pickup</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-primary mr-3" />
                        <span className="text-sm">Digital certificates</span>
                      </div>
                    </div>
                    <Button className="w-full">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>}

                {/* Buy from Us Content */}
                {selectedSubCategory === "buy" && <div className="bg-white/80 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-green-secondary mb-4">Purchase HDPE Granules</h3>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-secondary mr-3" />
                        <span className="text-sm">ISO certified quality</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-secondary mr-3" />
                        <span className="text-sm">Complete traceability</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-secondary mr-3" />
                        <span className="text-sm">Guaranteed supply</span>
                      </div>
                    </div>
                    <Button variant="secondary" className="w-full">
                      Request Quote <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>}
              </CardContent>
            </Card>
          </div>}

        {/* EPR Services Content */}
        {selectedBusiness === "epr" && <div>
            <Card className="border-2 border-accent/30 bg-green-light/50 backdrop-blur">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-primary">EPR Services</CardTitle>
                <p className="text-muted-foreground">Extended Producer Responsibility compliance</p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* EPR Credits */}
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-4">Available EPR Credits</h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg">
                        <span className="text-sm font-medium">Plastic Packaging</span>
                        <span className="text-primary font-bold">₹12-15/kg</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg">
                        <span className="text-sm font-medium">Multi-layered</span>
                        <span className="text-primary font-bold">₹18-22/kg</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg">
                        <span className="text-sm font-medium">Rigid Packaging</span>
                        <span className="text-primary font-bold">₹10-13/kg</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Form */}
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-4">Get EPR Quote</h3>
                    <div className="space-y-3">
                      <Input placeholder="Company name" />
                      <Input placeholder="Contact email" />
                      <Input placeholder="Annual quantity (MT)" />
                      <Button className="w-full">
                        Submit Requirements <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        Our team will connect within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>}
      </div>
    </section>;
};
export default Businesses;
import { ArrowRight, Truck, Factory, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const Businesses = () => {
  return (
    <section id="businesses" className="py-20 bg-gradient-to-b from-background to-green-light/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Our Businesses</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Two integrated business streams driving the circular economy through technology and partnerships
          </p>
        </div>

        {/* HDPE Granules Business */}
        <div className="mb-20">
          <Card className="border-2 border-primary/20 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary to-green-secondary text-primary-foreground p-8">
              <div className="flex items-center space-x-4">
                <Factory className="h-10 w-10" />
                <CardTitle className="text-3xl">HDPE Granules</CardTitle>
              </div>
              <p className="text-lg opacity-90">
                High-quality, traceable recycled HDPE granules from post-consumer plastic waste
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Sell to Us */}
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <Truck className="h-8 w-8 text-primary" />
                    <h3 className="text-2xl font-bold text-primary">Sell to Us</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Companies can supply their plastic waste to our collection network. We ensure transparent pricing and efficient pickup services.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-3" />
                      <span>Competitive pricing for your plastic waste</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-3" />
                      <span>Scheduled pickup services</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-3" />
                      <span>Waste audit and reporting</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-3" />
                      <span>Digital tracking and certificates</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    Start Selling Waste
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <Separator orientation="vertical" className="hidden md:block" />

                {/* Buy from Us */}
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <Factory className="h-8 w-8 text-green-secondary" />
                    <h3 className="text-2xl font-bold text-green-secondary">Buy from Us</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Purchase high-quality, traceable recycled HDPE granules for your manufacturing needs with complete quality assurance.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-secondary mr-3" />
                      <span>ISO certified quality standards</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-secondary mr-3" />
                      <span>Complete traceability reports</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-secondary mr-3" />
                      <span>Consistent supply guarantee</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-secondary mr-3" />
                      <span>Technical support included</span>
                    </div>
                  </div>
                  <Button variant="secondary" className="w-full">
                    Request Quotation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* EPR Services */}
        <div>
          <Card className="border-2 border-accent/20 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-accent to-green-accent text-accent-foreground p-8">
              <div className="flex items-center space-x-4">
                <Shield className="h-10 w-10" />
                <CardTitle className="text-3xl">EPR Services</CardTitle>
              </div>
              <p className="text-lg">
                End-to-end Extended Producer Responsibility compliance and credit management
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* EPR Information */}
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-6">Available EPR Credits</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center p-4 bg-green-light rounded-lg">
                      <span className="font-medium">Plastic Packaging</span>
                      <span className="text-primary font-bold">₹12-15/kg</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-green-light rounded-lg">
                      <span className="font-medium">Multi-layered Packaging</span>
                      <span className="text-primary font-bold">₹18-22/kg</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-green-light rounded-lg">
                      <span className="font-medium">Rigid Packaging</span>
                      <span className="text-primary font-bold">₹10-13/kg</span>
                    </div>
                  </div>
                  <div className="bg-muted p-6 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Our EPR Advantage:</strong>
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• Complete compliance documentation</li>
                      <li>• Real-time tracking and reporting</li>
                      <li>• Regulatory liaison support</li>
                      <li>• Cost-effective credit pricing</li>
                    </ul>
                  </div>
                </div>

                {/* EPR Form */}
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-6">EPR Requirements Form</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Company Name</Label>
                        <Input id="company" placeholder="Enter company name" />
                      </div>
                      <div>
                        <Label htmlFor="contact">Contact Person</Label>
                        <Input id="contact" placeholder="Enter contact name" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter email" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="Enter phone number" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="packaging-type">Packaging Type</Label>
                      <Input id="packaging-type" placeholder="e.g., Plastic bottles, flexible packaging" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="annual-quantity">Annual Quantity (MT)</Label>
                        <Input id="annual-quantity" placeholder="Enter quantity" />
                      </div>
                      <div>
                        <Label htmlFor="compliance-year">Compliance Year</Label>
                        <Input id="compliance-year" placeholder="e.g., 2024-25" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="requirements">Additional Requirements</Label>
                      <Textarea 
                        id="requirements" 
                        placeholder="Please describe any specific compliance requirements..."
                        className="h-24"
                      />
                    </div>
                    <Button className="w-full" size="lg">
                      Submit EPR Requirements
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <p className="text-sm text-muted-foreground text-center">
                      Our team will connect with you within 24 hours
                    </p>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Businesses;
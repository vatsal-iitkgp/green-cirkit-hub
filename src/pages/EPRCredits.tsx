import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircle, FileText, Shield, TrendingUp, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import EPREnquiryModal from "@/components/EPREnquiryModal";

const EPRCredits = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              EPR Credits & Compliance
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              We are building seamless EPR compliance solutions with verified credits. Our goal is to help you meet your Extended Producer 
              Responsibility obligations with transparent and traceable solutions.
            </p>
            <Button 
              size="lg" 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-6 text-lg"
            >
              Get EPR Quote
            </Button>
          </div>

          {/* Live Rates */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Live EPR Rates</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">PET Bottles</CardTitle>
                  <CardDescription>Rigid Plastic</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">₹12.50</div>
                  <div className="text-sm text-muted-foreground">per kg</div>
                  <Badge variant="secondary" className="mt-2">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Live Rate
                  </Badge>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">PE Films</CardTitle>
                  <CardDescription>Flexible Plastic</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">₹18.75</div>
                  <div className="text-sm text-muted-foreground">per kg</div>
                  <Badge variant="secondary" className="mt-2">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Live Rate
                  </Badge>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Multi-layer</CardTitle>
                  <CardDescription>Complex Packaging</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">₹25.00</div>
                  <div className="text-sm text-muted-foreground">per kg</div>
                  <Badge variant="secondary" className="mt-2">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Live Rate
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Key Benefits</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    99.9% Traceable
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Complete traceability from waste collection to certificate generation
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    15% Lower Costs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Competitive rates with transparent pricing and no hidden charges
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    24/7 Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Round-the-clock assistance for all your EPR compliance needs
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Digital Certificates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Instant digital certificates with blockchain verification
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Government Approved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Authorized by CPCB and state pollution control boards
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    PAN India Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Complete coverage across all states with local partnerships
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  1
                </div>
                <h3 className="font-semibold mb-2">Submit Requirements</h3>
                <p className="text-sm text-muted-foreground">Share your plastic waste targets and compliance needs</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  2
                </div>
                <h3 className="font-semibold mb-2">Get Quote</h3>
                <p className="text-sm text-muted-foreground">Receive competitive pricing based on current market rates</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  3
                </div>
                <h3 className="font-semibold mb-2">Purchase Credits</h3>
                <p className="text-sm text-muted-foreground">Secure your EPR credits with transparent documentation</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  4
                </div>
                <h3 className="font-semibold mb-2">Receive Certificates</h3>
                <p className="text-sm text-muted-foreground">Get verified certificates for regulatory compliance</p>
              </div>
            </div>
          </div>

          <div className="text-center bg-muted/50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-4">Interested in EPR Compliance?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We are building comprehensive EPR solutions. Register your interest now 
              to be among the first to access our services when we launch.
            </p>
            <Button 
              size="lg" 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-6 text-lg"
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </section>

      <EPREnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
      <Footer />
    </div>
  );
};

export default EPRCredits;
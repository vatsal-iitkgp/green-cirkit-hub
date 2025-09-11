import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Target, Eye, Users, Award, Leaf, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About GreenCirkit
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Engineering sustainability through technology. We're transforming the plastic waste 
              ecosystem with innovative solutions that benefit both business and the environment.
            </p>
          </div>

          {/* What We Do */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">What We Do</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    HDPE Recycling
                  </CardTitle>
                  <CardDescription>Premium recycled granules</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We transform plastic waste into high-quality HDPE granules through advanced 
                    processing technology. Our granules meet stringent quality standards and 
                    provide a sustainable alternative to virgin plastic.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    EPR Compliance
                  </CardTitle>
                  <CardDescription>Seamless regulatory compliance</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We simplify Extended Producer Responsibility compliance through our 
                    comprehensive platform. From credit generation to certificate issuance, 
                    we handle the entire EPR lifecycle with complete transparency.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="text-center">
                  <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-lg">
                    To create a circular economy for plastics by connecting waste generators, 
                    recyclers, and manufacturers through innovative technology solutions that 
                    make sustainability profitable and scalable.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-secondary/5 border-secondary/20">
                <CardHeader className="text-center">
                  <Eye className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-lg">
                    To be the leading platform enabling a zero-waste plastic ecosystem in India, 
                    where every piece of plastic waste finds its way back into the circular economy 
                    through transparent and traceable processes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Leadership Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Leadership Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/60 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle>Rajesh Kumar</CardTitle>
                  <CardDescription>Founder & CEO</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    15+ years in waste management and sustainability. Previously led recycling 
                    initiatives at major corporations. IIT Delhi alumnus with expertise in 
                    circular economy solutions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-secondary to-secondary/60 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Shield className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle>Priya Sharma</CardTitle>
                  <CardDescription>CTO</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Technology leader with 12+ years in building scalable platforms. 
                    Former engineering head at leading startups. Specializes in blockchain 
                    and traceability systems.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-accent to-accent/60 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Award className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle>Amit Patel</CardTitle>
                  <CardDescription>Head of Operations</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Operations expert with 10+ years in supply chain and logistics. 
                    Built nationwide networks for recycling companies. Ensures quality 
                    and compliance across all processes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  Complete visibility in all our processes and transactions
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Sustainability</h3>
                <p className="text-sm text-muted-foreground">
                  Environmental responsibility in everything we do
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Uncompromising standards in products and services
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  Continuous improvement through technology
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Why Choose GreenCirkit?</h2>
            <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
              We combine deep industry expertise with cutting-edge technology to deliver 
              solutions that are not just sustainable, but also profitable and scalable. 
              Our commitment to transparency and quality has earned the trust of over 500 companies.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-semibold mb-2">Proven Track Record</h4>
                <p className="text-sm text-muted-foreground">
                  1200+ tonnes recycled, 850+ EPR credits issued
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Technology-First Approach</h4>
                <p className="text-sm text-muted-foreground">
                  Blockchain traceability, automated compliance
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">PAN India Presence</h4>
                <p className="text-sm text-muted-foreground">
                  Complete coverage with local partnerships
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
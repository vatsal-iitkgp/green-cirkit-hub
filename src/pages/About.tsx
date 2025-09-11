import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Target, Eye, Users, Award, Leaf, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
const About = () => {
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About GreenCirkit
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Engineering sustainability through technology. 
We're transforming the plastic waste ecosystem with innovative solutions that benefit both business and the environment.</p>
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
                  <p className="text-muted-foreground text-lg">To revolutionize waste management in India by providing transparent, tech-enabled recycling solutions that fulfill corporate EPR commitments while unlocking maximum value from waste. </p>
                </CardContent>
              </Card>

              <Card className="bg-secondary/5 border-secondary/20">
                <CardHeader className="text-center">
                  <Eye className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-lg">To establish India’s most advanced tech-driven recycling enterprise, pioneering digital traceability and EPR compliance — creating a future where sustainability, innovation, and profitability go hand in hand.</p>
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
                  <CardTitle>Anuj Gupta</CardTitle>
                  <CardDescription>Managing Director</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">Launching his first venture in his early 20s, Anuj Gupta quickly emerged as a visionary consultant in the real estate industry known for futuristic ideas and bold risk-taking. With decades of business acumen and strong networks across India, he has built a reputation for scaling ventures with innovation. A long-term believer in the future, he now leads GreenCirkit with a vision for a circular and sustainable future.</p>
                </CardContent>
              </Card>

              

              <Card>
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-accent to-accent/60 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Award className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle>Vatsal Gupta</CardTitle>
                  <CardDescription>Managing Director</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">A next-generation leader from IIT Kharagpur, Vatsal Gupta blends financial strategy with a deep passion for technology. Known for his data-driven mindset and bold use of digital innovation, he spearheads product development, EPR tech platforms, and market expansion. His vision positions GreenCirkit at the forefront of India’s recycling revolution and scalable tech driven growth.</p>
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
            <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">We combine deep industry expertise with cutting-edge technology to deliver solutions that are not just sustainable, but also profitable and scalable. </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-semibold mb-2">IIT Leadership Credibility</h4>
                <p className="text-sm text-muted-foreground">Commitment to scalable innovative solutions</p>
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
    </div>;
};
export default About;
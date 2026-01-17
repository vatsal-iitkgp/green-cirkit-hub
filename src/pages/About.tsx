import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Target, Eye, Users, Award, Leaf, Shield, Recycle, Zap, TrendingUp, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Creative Hero Section */}
      <section className="relative pt-20 pb-24 px-4 overflow-hidden">
        {/* Background gradients and shapes */}
        <div className="absolute inset-0 -z-10">
          <div 
            className="absolute top-0 left-0 w-full h-full opacity-60"
            style={{ backgroundImage: "var(--gradient-hero)" }}
          />
          <div 
            className="absolute -top-40 -right-40 w-[60rem] h-[60rem] rounded-full blur-3xl opacity-20"
            style={{ backgroundImage: "var(--gradient-green)" }}
          />
          <div 
            className="absolute -bottom-20 -left-40 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-15"
            style={{ backgroundImage: "var(--gradient-secondary)" }}
          />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-white/80 backdrop-blur px-4 py-2 text-sm text-[hsl(var(--primary))] shadow-sm animate-fade-in">
                <Recycle className="h-4 w-4" />
                Building India's Next-Gen Recycling Infrastructure
              </div>

              {/* Main heading with creative typography */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  <span className="block text-foreground">About</span>
                  <span className="block bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-variant))] bg-clip-text text-transparent">
                    GreenCirkit
                  </span>
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-[hsl(var(--primary))] to-transparent rounded-full"></div>
              </div>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                We are building technology-driven sustainability solutions. Our goal is to transform India's plastic waste ecosystem with innovative solutions that benefit both business and the environment.
              </p>

              {/* Planned capabilities */}
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="group cursor-default">
                  <div className="text-3xl font-bold text-foreground group-hover:text-[hsl(var(--primary))] transition-colors">
                    20+ TPD
                  </div>
                  <div className="text-sm text-muted-foreground">Planned Capacity</div>
                </div>
                <div className="group cursor-default">
                  <div className="text-3xl font-bold text-foreground group-hover:text-[hsl(var(--primary))] transition-colors">
                    100%
                  </div>
                  <div className="text-sm text-muted-foreground">Target CPCB Compliance</div>
                </div>
              </div>
            </div>

            {/* Right: Status Dashboard */}
            <div className="relative">
              {/* Floating cards with animations */}
              <div className="relative z-10 space-y-4">
                {/* Main dashboard card */}
                <div className="bg-white/90 backdrop-blur border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-sm font-medium text-muted-foreground">Current Status</div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-muted-foreground">Pre-Operational</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-foreground">Setup</div>
                      <div className="text-xs text-muted-foreground">Infrastructure Phase</div>
                      <div className="w-full bg-[hsl(var(--secondary))] rounded-full h-2">
                        <div className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-variant))] h-2 rounded-full" style={{ width: "40%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-foreground">Target</div>
                      <div className="text-xs text-muted-foreground">98%+ Quality Score</div>
                      <div className="w-full bg-[hsl(var(--secondary))] rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" style={{ width: "0%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating mini cards */}
                <div className="flex gap-3">
                  <div className="flex-1 bg-white/80 backdrop-blur border border-white/20 rounded-2xl p-4 hover:bg-white/90 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span className="text-xs text-muted-foreground">Innovation</span>
                    </div>
                    <div className="text-lg font-bold text-foreground">AI-Driven</div>
                  </div>
                  <div className="flex-1 bg-white/80 backdrop-blur border border-white/20 rounded-2xl p-4 hover:bg-white/90 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-muted-foreground">Phase</span>
                    </div>
                    <div className="text-lg font-bold text-foreground">Building</div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-[hsl(var(--primary))] to-transparent rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-12 -left-6 w-24 h-24 bg-gradient-to-br from-[hsl(var(--accent))] to-transparent rounded-full blur-xl opacity-40 animate-pulse delay-1000"></div>
            </div>
          </div>

          {/* Achievement badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur border border-white/30 rounded-full px-6 py-3 hover:bg-white/80 transition-all duration-300">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">IIT Leadership</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur border border-white/30 rounded-full px-6 py-3 hover:bg-white/80 transition-all duration-300">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">PAN India Presence</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur border border-white/30 rounded-full px-6 py-3 hover:bg-white/80 transition-all duration-300">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Blockchain Traceability</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur border border-white/30 rounded-full px-6 py-3 hover:bg-white/80 transition-all duration-300">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Zero Waste Vision</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
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
                    We aim to transform plastic waste into high-quality HDPE granules through advanced 
                    processing technology. Our goal is to produce granules that meet stringent quality standards and 
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
                    We are developing a comprehensive EPR compliance platform. From credit generation 
                    to certificate issuance, we aim to handle the entire EPR lifecycle with complete transparency.
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
                  <p className="text-muted-foreground text-lg">To revolutionize waste management in India by providing transparent, tech-enabled recycling solutions that fulfill corporate EPR commitments while unlocking maximum value from waste. </p>
                </CardContent>
              </Card>

              <Card className="bg-secondary/5 border-secondary/20">
                <CardHeader className="text-center">
                  <Eye className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-lg">To establish India's most advanced tech-driven recycling enterprise, pioneering digital traceability and EPR compliance — creating a future where sustainability, innovation, and profitability go hand in hand.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Leadership Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Leadership Team</h2>
              <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/60 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle>Anuj Gupta</CardTitle>
                  <CardDescription>Managing Director</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">An IIT Roorkee alumnus, Anuj Gupta launched his first venture in his early 20s and went on to build a strong track record across the real estate sector. Known for his forward-looking approach and execution-driven mindset, he has developed deep business acumen and long-standing networks across India. With a sustained focus on building scalable ventures, he now leads GreenCirkit with a vision to enable a circular and sustainable future.</p>
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
                  <p className="text-muted-foreground">A next-generation leader from IIT Kharagpur, Vatsal Gupta blends financial strategy with a deep passion for technology. Known for his data-driven mindset and bold use of digital innovation, he spearheads product development, EPR tech platforms, and market expansion. His vision positions GreenCirkit at the forefront of India's recycling revolution and scalable tech driven growth.</p>
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
            <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">We combine deep industry expertise with cutting-edge technology to deliver solutions that are not just sustainable, but also profitable and scalable. </p>
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
    </div>
  );
};

export default About;

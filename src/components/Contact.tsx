import { Mail, Phone, MapPin, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-green-light/20 to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Connect With Us</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Partner with us to build a circular future. Let's transform waste into value together.
          </p>
          <Button size="lg" className="text-lg px-8 py-4">
            Partner with us to build a circular future
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Leadership Team */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Leadership Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Anuj Gupta */}
                <div className="flex items-start space-x-4 p-4 bg-green-light rounded-lg">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                    AG
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-primary">Anuj Gupta</h3>
                    <p className="text-sm text-muted-foreground mb-2">Co-founder & CEO</p>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-primary" />
                        <span>anuj@greencirkit.com</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-primary" />
                        <span>+91 98765 43210</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Linkedin className="h-4 w-4 mr-2 text-primary" />
                        <span>linkedin.com/in/anujgupta</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vatsal Gupta */}
                <div className="flex items-start space-x-4 p-4 bg-green-light rounded-lg">
                  <div className="w-16 h-16 bg-green-secondary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                    VG
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-green-secondary">Vatsal Gupta</h3>
                    <p className="text-sm text-muted-foreground mb-2">Co-founder & CTO</p>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-green-secondary" />
                        <span>vatsal@greencirkit.com</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-green-secondary" />
                        <span>+91 98765 43211</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Linkedin className="h-4 w-4 mr-2 text-green-secondary" />
                        <span>linkedin.com/in/vatsalgupta</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Information */}
            <Card className="border-2 border-accent/20">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Headquarters</p>
                    <p className="text-sm text-muted-foreground">Moradabad, Uttar Pradesh, India</p>
                    <p className="text-sm text-muted-foreground">Strategic location in India's plastic hub</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">General Inquiries</p>
                    <p className="text-sm text-muted-foreground">info@greencirkit.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Business Development</p>
                    <p className="text-sm text-muted-foreground">+91 98765 43212</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Get in Touch</CardTitle>
              <p className="text-muted-foreground">
                Ready to start your sustainability journey? Let's discuss how we can help.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="Enter first name" />
                  </div>
                  <div>
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Enter last name" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="company-name">Company</Label>
                  <Input id="company-name" placeholder="Enter company name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email-contact">Email</Label>
                    <Input id="email-contact" type="email" placeholder="Enter email" />
                  </div>
                  <div>
                    <Label htmlFor="phone-contact">Phone</Label>
                    <Input id="phone-contact" placeholder="Enter phone number" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="interest">Area of Interest</Label>
                  <Input id="interest" placeholder="e.g., HDPE Granules, EPR Services, Partnership" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your requirements and how we can help..."
                    className="h-32"
                  />
                </div>
                <Button className="w-full" size="lg">
                  Send Message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary to-green-secondary p-8 rounded-2xl text-primary-foreground">
            <h3 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join the circular economy revolution. Transform your waste into value and contribute to a sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Schedule a Call
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
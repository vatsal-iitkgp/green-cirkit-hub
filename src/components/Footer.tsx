import { Leaf, Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Leaf className="h-8 w-8" />
              <span className="text-2xl font-bold">GreenCirkit</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Engineering sustainability with technology. We transform plastic waste into valuable resources through innovative technology and strategic partnerships, building a circular economy for a sustainable future.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors cursor-pointer">
                <Linkedin className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors cursor-pointer">
                <Twitter className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors cursor-pointer">
                <Instagram className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Home</a></li>
              <li><a href="#businesses" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Our Businesses</a></li>
              <li><a href="#why" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Why GreenCirkit</a></li>
              <li><a href="#roadmap" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Roadmap</a></li>
              <li><a href="#impact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Impact</a></li>
              <li><a href="#contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 text-primary-foreground/60" />
                <div>
                  <p className="text-primary-foreground/80">Moradabad, Uttar Pradesh</p>
                  <p className="text-primary-foreground/60 text-sm">India</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-foreground/60" />
                <span className="text-primary-foreground/80">info@greencirkit.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-foreground/60" />
                <span className="text-primary-foreground/80">+91 98765 43212</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/60 text-sm mb-4 md:mb-0">
              © 2024 GreenCirkit. All rights reserved. Building a circular future.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Terms of Service</a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Sustainability Report</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
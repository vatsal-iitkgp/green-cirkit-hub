import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, Shield, Clock, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EPREnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EPREnquiryModal = ({ isOpen, onClose }: EPREnquiryModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    plasticType: "",
    tonnage: "",
    timeline: "",
    requirements: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "EPR Enquiry Submitted Successfully!",
      description: "Our compliance experts will contact you with customized EPR solutions and live rates.",
    });
    onClose();
    setFormData({ name: "", company: "", email: "", phone: "", plasticType: "", tonnage: "", timeline: "", requirements: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">EPR Credits Enquiry</DialogTitle>
          <DialogDescription className="text-lg">
            Get compliant EPR certificates with 99.9% traceability and 15% lower costs.
          </DialogDescription>
        </DialogHeader>

        {/* Live Rates Section */}
        <div className="bg-gradient-to-r from-green-accent/10 to-primary/10 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-primary text-lg">Live EPR Rates (Per Kg)</h3>
            <Badge variant="secondary" className="bg-green-primary/10 text-green-primary">
              Updated Today
            </Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card/80 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-primary">₹12.50</div>
              <div className="text-sm text-muted-foreground">PET Bottles</div>
            </div>
            <div className="bg-card/80 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-primary">₹10.80</div>
              <div className="text-sm text-muted-foreground">HDPE</div>
            </div>
            <div className="bg-card/80 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-primary">₹14.20</div>
              <div className="text-sm text-muted-foreground">PP Flexible</div>
            </div>
            <div className="bg-card/80 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-primary">₹11.90</div>
              <div className="text-sm text-muted-foreground">Multi-layer</div>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <TrendingDown className="h-4 w-4 text-green-accent" />
            <span>15% Lower Costs</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-primary" />
            <span>99.9% Traceable</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-green-light" />
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-green-secondary" />
            <span>PAN India</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="plasticType">Plastic Category *</Label>
              <Input
                id="plasticType"
                name="plasticType"
                value={formData.plasticType}
                onChange={handleInputChange}
                placeholder="PET, HDPE, PP, Multi-layer, etc."
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="tonnage">Required Tonnage *</Label>
              <Input
                id="tonnage"
                name="tonnage"
                value={formData.tonnage}
                onChange={handleInputChange}
                placeholder="e.g., 50 tonnes"
                required
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="timeline">Compliance Timeline</Label>
            <Input
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
              placeholder="e.g., Quarterly, Annual"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="requirements">Additional Requirements</Label>
            <Textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              placeholder="Specific compliance needs, documentation requirements, etc."
              className="mt-1"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">Get EPR Quote</Button>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EPREnquiryModal;
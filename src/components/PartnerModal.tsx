import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PartnerModal = ({ isOpen, onClose }: PartnerModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    partnershipType: "",
    description: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({ name: "", company: "", email: "", phone: "", partnershipType: "", description: "" });
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePartnershipChange = (value: string) => {
    setFormData({ ...formData, partnershipType: value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary">Partner With Us</DialogTitle>
              <DialogDescription className="text-lg">
                Join us in creating a sustainable future. Let's discuss partnership opportunities.
              </DialogDescription>
            </DialogHeader>

            {/* Partnership Benefits */}
            <div className="bg-gradient-to-r from-primary/5 to-green-accent/5 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-primary mb-3">Partnership Benefits:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>• Shared expertise & resources</div>
                <div>• Market expansion opportunities</div>
                <div>• Sustainable impact scaling</div>
                <div>• Technology collaboration</div>
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

              <div>
                <Label htmlFor="partnershipType">Partnership Type *</Label>
                <Select onValueChange={handlePartnershipChange} required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select partnership type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="waste-supplier">Waste Collection Partner</SelectItem>
                    <SelectItem value="distributor">Distribution Partner</SelectItem>
                    <SelectItem value="technology">Technology Partner</SelectItem>
                    <SelectItem value="investor">Investment Partner</SelectItem>
                    <SelectItem value="joint-venture">Joint Venture</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Partnership Proposal</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Please describe your partnership proposal, capabilities, and how we can collaborate..."
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">Submit Partnership Request</Button>
                <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <DialogTitle className="text-2xl font-bold text-primary mb-4">Thank You!</DialogTitle>
            <DialogDescription className="text-lg mb-6">
              Your partnership request has been submitted successfully. We will contact you within 24 hours to discuss opportunities.
            </DialogDescription>
            <Button onClick={handleClose} className="px-8">Close</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PartnerModal;
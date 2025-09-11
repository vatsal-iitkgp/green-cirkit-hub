import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface HDPEEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HDPEEnquiryModal = ({ isOpen, onClose }: HDPEEnquiryModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    quantity: "",
    requirements: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({ name: "", company: "", email: "", phone: "", quantity: "", requirements: "" });
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary">HDPE Granules Enquiry</DialogTitle>
              <DialogDescription className="text-lg">
                Get premium recycled HDPE granules with ISO certification and complete traceability.
              </DialogDescription>
            </DialogHeader>

            {/* Product Info */}
            <div className="bg-gradient-to-r from-primary/5 to-green-accent/5 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-primary mb-3">Product Specifications:</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>• Grade: Industrial & Food Grade</div>
                <div>• Purity: 99.5%+</div>
                <div>• Color: Natural, Black, Custom</div>
                <div>• Packaging: 25kg bags</div>
                <div>• Certification: ISO 9001:2015</div>
                <div>• Starting from: ₹85/kg</div>
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
                <Label htmlFor="quantity">Required Quantity (MT/Month) *</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="e.g., 10 MT"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="requirements">Specific Requirements</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="Grade preferences, color specifications, delivery timelines, etc."
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">Submit Enquiry</Button>
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
              Your enquiry has been submitted successfully. We will contact you within 24 hours with detailed pricing and specifications.
            </DialogDescription>
            <Button onClick={handleClose} className="px-8">Close</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HDPEEnquiryModal;
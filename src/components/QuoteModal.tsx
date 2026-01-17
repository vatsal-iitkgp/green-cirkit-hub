import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xreeerdv"; // ⬅️ REPLACE THIS

const QuoteModal = ({ isOpen, onClose }: QuoteModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [service, setService] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("service", service);

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setIsSubmitted(true);
      form.reset();
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary">
                Get in touch with us
              </DialogTitle>
              <DialogDescription className="text-lg">
                Share your details and we’ll reach out to discuss partnerships, upcoming production,
                or collaboration opportunities.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" name="name" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="company">Company Name *</Label>
                  <Input id="company" name="company" required className="mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" name="email" type="email" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" name="phone" required className="mt-1" />
                </div>
              </div>

              <div>
                <Label>Area of Interest *</Label>
                <Select onValueChange={setService} required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hdpe-granules">HDPE Granules (Upcoming)</SelectItem>
                    <SelectItem value="epr-credits">EPR Credits</SelectItem>
                    <SelectItem value="partnership">Partnership / PIBO Discussion</SelectItem>
                    <SelectItem value="supplier">Supplier / Machinery</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="requirements">Message</Label>
                <Textarea
                  id="requirements"
                  name="message"
                  placeholder="Tell us briefly how we can help you"
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Submit
                </Button>
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <DialogTitle className="text-2xl font-bold text-primary mb-4">
              Thank you
            </DialogTitle>
            <DialogDescription className="text-lg mb-6">
              Your details have been shared successfully. Our team will get in touch with you shortly.
            </DialogDescription>
            <Button onClick={handleClose} className="px-8">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle } from "lucide-react";

const IndustryInsights = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background with subtle gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "var(--gradient-subtle)"
        }}
      />
      
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 backdrop-blur px-4 py-2 text-sm text-primary shadow-sm mb-6">
          <Mail className="h-4 w-4" />
          Industry Insights
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Get Industry Insights
        </h2>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Stay informed with the latest updates on recycling, sustainability, and EPR
        </p>

        {!subscribed ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" className="px-8">
              Subscribe
            </Button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-2 text-primary">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Thanks for subscribing! We'll keep you updated.</span>
          </div>
        )}

        {/* Trust indicators */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
          <span>• Weekly insights</span>
          <span>• Policy updates</span>
          <span>• Market trends</span>
          <span>• No spam</span>
        </div>
      </div>
    </section>
  );
};

export default IndustryInsights;
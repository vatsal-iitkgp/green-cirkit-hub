import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Recycle, TreePine, Factory, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface ImpactCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImpactCalculatorModal: React.FC<ImpactCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [plasticWeight, setPlasticWeight] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculateImpact = () => {
    const weight = parseFloat(plasticWeight);
    if (!weight || weight <= 0) return;

    // Impact calculations based on real recycling data
    const calculations = {
      co2Saved: (weight * 2.1).toFixed(1), // kg CO2 saved per kg plastic
      energySaved: (weight * 5.8).toFixed(1), // kWh energy saved
      waterSaved: (weight * 12.5).toFixed(0), // liters water saved
      landfillDiverted: weight.toFixed(1), // kg diverted from landfill
      newProducts: Math.floor(weight / 0.05), // Number of new products (assuming 50g average)
      treesEquivalent: (weight * 0.02).toFixed(2), // Tree equivalent for CO2
    };

    setResults(calculations);
  };

  const resetCalculator = () => {
    setPlasticWeight("");
    setResults(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-green-accent flex items-center justify-center">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <span>Interactive Impact Calculator</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-muted-foreground">
            Enter the amount of plastic waste you have and discover the positive environmental impact of recycling it through GreenCirkit.
          </p>

          {/* Input section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="plastic-weight" className="text-sm font-medium">
                Plastic Waste Weight (kg)
              </Label>
              <div className="mt-2 flex gap-3">
                <Input
                  id="plastic-weight"
                  type="number"
                  placeholder="Enter weight in kg"
                  value={plasticWeight}
                  onChange={(e) => setPlasticWeight(e.target.value)}
                  className="flex-1"
                  min="0"
                  step="0.1"
                />
                <Button onClick={calculateImpact} className="px-6">
                  Calculate Impact
                </Button>
              </div>
            </div>
          </div>

          {/* Results section */}
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 text-primary">
                  Your Environmental Impact
                </h3>
                
                {/* Impact grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">CO₂ Emissions Reduced</span>
                    </div>
                    <div className="text-2xl font-bold text-green-700">{results.co2Saved} kg</div>
                    <div className="text-sm text-green-600">Equivalent to {results.treesEquivalent} trees planted</div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Factory className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Energy Saved</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-700">{results.energySaved} kWh</div>
                    <div className="text-sm text-blue-600">Enough to power a home for {Math.floor(parseFloat(results.energySaved) / 30)} days</div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <TreePine className="h-5 w-5 text-cyan-600" />
                      <span className="font-medium text-cyan-800">Water Conserved</span>
                    </div>
                    <div className="text-2xl font-bold text-cyan-700">{results.waterSaved} L</div>
                    <div className="text-sm text-cyan-600">Enough for {Math.floor(results.waterSaved / 150)} shower sessions</div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Recycle className="h-5 w-5 text-emerald-600" />
                      <span className="font-medium text-emerald-800">New Products Created</span>
                    </div>
                    <div className="text-2xl font-bold text-emerald-700">{results.newProducts}</div>
                    <div className="text-sm text-emerald-600">Items that can be made from your plastic</div>
                  </motion.div>
                </div>

                {/* Call to action */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-green-accent/10 border border-primary/20 rounded-xl"
                >
                  <h4 className="text-base font-medium text-primary mb-2">
                    Ready to make this impact real?
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Partner with GreenCirkit to turn your plastic waste into sustainable value.
                  </p>
                  <div className="flex gap-3">
                    <Button size="sm" onClick={onClose}>
                      Get Started
                    </Button>
                    <Button variant="outline" size="sm" onClick={resetCalculator}>
                      Calculate Again
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Quick tips */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-2">💡 Quick Tips:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>• Average plastic bottle: ~0.03 kg</div>
              <div>• Plastic bag: ~0.006 kg</div>
              <div>• Food container: ~0.05 kg</div>
              <div>• Larger containers: ~0.1-0.5 kg</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImpactCalculatorModal;
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, Trash2, Factory, Package, Sparkles } from "lucide-react";

const PlasticJourneyParallax: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [scrollY, setScrollY] = useState(0);

  // Transform values for different elements
  const bottleY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const collectionY = useTransform(scrollYProgress, [0.2, 0.5], [100, -50]);
  const processingY = useTransform(scrollYProgress, [0.4, 0.7], [100, -50]);
  const productY = useTransform(scrollYProgress, [0.6, 1], [100, -50]);

  // Progress line
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setScrollY(latest);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const journeySteps = [
    {
      id: 1,
      icon: Zap,
      title: "Plastic Waste",
      description: "Every bottle, container, and package starts here",
      detail: "From households and businesses across India",
      color: "from-red-500 to-orange-500",
      bgColor: "from-red-50 to-orange-50",
      textColor: "text-red-700",
      progress: 0,
    },
    {
      id: 2,
      icon: Trash2,
      title: "Smart Collection",
      description: "AI-powered sorting and quality assessment",
      detail: "Technology ensures only recyclable materials proceed",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      textColor: "text-blue-700",
      progress: 0.33,
    },
    {
      id: 3,
      icon: Factory,
      title: "Tech Processing",
      description: "Advanced recycling with real-time monitoring",
      detail: "Converting waste into high-quality HDPE granules",
      color: "from-purple-500 to-indigo-500",
      bgColor: "from-purple-50 to-indigo-50",
      textColor: "text-purple-700",
      progress: 0.66,
    },
    {
      id: 4,
      icon: Package,
      title: "New Products",
      description: "Near-virgin granules ready for manufacturing",
      detail: "Creating new bottles, containers, and products",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      textColor: "text-green-700",
      progress: 1,
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-background to-secondary/20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary font-medium">
              <Sparkles className="h-4 w-4" />
              The Circular Journey
            </span>
            <h2 className="mt-6 text-4xl md:text-5xl font-bold text-foreground">
              From Waste to Wonder
            </h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow the journey of plastic waste as it transforms into valuable resources through our innovative recycling process
            </p>
          </motion.div>
        </div>

        {/* Journey Steps */}
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border transform -translate-x-1/2 hidden md:block">
            <motion.div
              className="w-full bg-gradient-to-b from-primary to-green-accent"
              style={{ height: `${scrollY * 100}%` }}
            />
          </div>

          <div className="space-y-20">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white shadow-lg mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <step.icon className="h-8 w-8" />
                  </motion.div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-2">
                    {step.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {step.detail}
                  </p>
                </div>

                {/* Visual Element */}
                <div className="flex-1 flex justify-center">
                  <motion.div
                    className={`relative w-80 h-64 rounded-2xl bg-gradient-to-br ${step.bgColor} border border-white/20 shadow-xl overflow-hidden`}
                    style={{
                      y: index === 0 ? bottleY : 
                         index === 1 ? collectionY :
                         index === 2 ? processingY : productY
                    }}
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 opacity-20"
                      animate={{
                        background: [
                          `radial-gradient(circle at 20% 20%, ${step.color.split(' ')[1]} 0%, transparent 50%)`,
                          `radial-gradient(circle at 80% 80%, ${step.color.split(' ')[1]} 0%, transparent 50%)`,
                          `radial-gradient(circle at 20% 20%, ${step.color.split(' ')[1]} 0%, transparent 50%)`,
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-center justify-center h-full">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0] 
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          delay: index * 0.5 
                        }}
                      >
                        <step.icon className={`h-24 w-24 ${step.textColor}`} />
                      </motion.div>
                    </div>

                    {/* Progress indicator */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/30 rounded-full h-2">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${step.color}`}
                          initial={{ width: "0%" }}
                          whileInView={{ width: "100%" }}
                          transition={{ duration: 1, delay: index * 0.3 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-primary to-green-accent text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <Sparkles className="h-6 w-6" />
            <span className="text-lg font-semibold">
              Ready to start your circular journey?
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlasticJourneyParallax;
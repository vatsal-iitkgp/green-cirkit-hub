import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  id: number;
  from: "gigi" | "user";
  text: string;
  options?: string[];
};

type FlowStep = "idle" | "category" | "name" | "company" | "email" | "phone" | "reach" | "done";

const CATEGORIES = [
  "Brand Owner / PIBO",
  "Raw Material Supplier",
  "Looking to Invest",
  "Recycling / EPR Query",
  "General Enquiry",
];

const REACH_OPTIONS = ["Phone Call", "Email", "WhatsApp"];

const GigiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [flowStep, setFlowStep] = useState<FlowStep>("idle");
  const [leadData, setLeadData] = useState<Record<string, string>>({});
  const [hasGreeted, setHasGreeted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  const nextId = () => ++idRef.current;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addGigi = (text: string, options?: string[]) => {
    setMessages((prev) => [...prev, { id: nextId(), from: "gigi", text, options }]);
  };

  const addUser = (text: string) => {
    setMessages((prev) => [...prev, { id: nextId(), from: "user", text }]);
  };

  const openChat = () => {
    setIsOpen(true);
    if (!hasGreeted) {
      setHasGreeted(true);
      setTimeout(() => {
        addGigi("Hi there! I'm Gigi 👋 Welcome to Green Cirkit. How can I help you today?", CATEGORIES);
        setFlowStep("category");
      }, 400);
    }
  };

  const handleOption = (option: string) => {
    addUser(option);

    if (flowStep === "category") {
      setLeadData((d) => ({ ...d, category: option }));
      if (["Brand Owner / PIBO", "Raw Material Supplier", "Looking to Invest", "Recycling / EPR Query"].includes(option)) {
        setTimeout(() => {
          addGigi("Great! I'd love to connect you with our team. Could you share your full name?");
          setFlowStep("name");
        }, 500);
      } else {
        setTimeout(() => {
          addGigi("Thanks for reaching out! Feel free to ask me anything about Green Cirkit, and I'll do my best to help. 😊");
          setFlowStep("idle");
        }, 500);
      }
    } else if (flowStep === "reach") {
      setLeadData((d) => ({ ...d, reach: option }));
      setTimeout(() => {
        addGigi("Thank you! 🎉 Someone from our team will reach out to you within the next 24 hours. Looking forward to connecting!");
        setFlowStep("done");
      }, 500);
    }
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    addUser(text);

    switch (flowStep) {
      case "name":
        setLeadData((d) => ({ ...d, name: text }));
        setTimeout(() => {
          addGigi("Thanks! And your company name?");
          setFlowStep("company");
        }, 500);
        break;
      case "company":
        setLeadData((d) => ({ ...d, company: text }));
        setTimeout(() => {
          addGigi("What's the best email to reach you at?");
          setFlowStep("email");
        }, 500);
        break;
      case "email":
        setLeadData((d) => ({ ...d, email: text }));
        setTimeout(() => {
          addGigi("And a phone / WhatsApp number?");
          setFlowStep("phone");
        }, 500);
        break;
      case "phone":
        setLeadData((d) => ({ ...d, phone: text }));
        setTimeout(() => {
          addGigi("How would you prefer us to reach out?", REACH_OPTIONS);
          setFlowStep("reach");
        }, 500);
        break;
      case "idle":
      case "done":
        setTimeout(() => {
          const lower = text.toLowerCase();
          if (lower.includes("epr") || lower.includes("recycl") || lower.includes("plastic") || lower.includes("hdpe") || lower.includes("granule")) {
            addGigi("That sounds like something our team can help with! Let me get a few details. What's your full name?");
            setFlowStep("name");
          } else if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
            addGigi("Hey! 😊 How can I assist you today?", CATEGORIES);
            setFlowStep("category");
          } else {
            addGigi("Thanks for your message! If you'd like to connect with our team, just let me know your area of interest.", CATEGORIES);
            setFlowStep("category");
          }
        }, 500);
        break;
      default:
        break;
    }
  };

  const isTextInputStep = ["name", "company", "email", "phone", "idle", "done"].includes(flowStep);

  return (
    <>
      {/* Floating Gigi Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 left-6 z-50 flex items-end gap-3"
          >
            <div className="relative cursor-pointer" onClick={openChat}>
              {/* Waving Gigi avatar */}
              <motion.div
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-2xl shadow-lg border-2 border-primary-foreground/20"
              >
                🤖
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute bottom-full left-16 mb-2 -translate-x-0 bg-card border border-border rounded-lg px-3 py-2 text-sm shadow-md whitespace-nowrap text-foreground"
              >
                <span className="font-semibold text-primary">Gigi:</span> Let me know if you need any help! 👋
                <div className="absolute -bottom-1 left-4 w-2 h-2 bg-card border-b border-r border-border rotate-45" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-6 left-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[70vh] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <div>
                  <p className="text-primary-foreground font-semibold text-sm">Gigi</p>
                  <p className="text-primary-foreground/70 text-xs">Green Cirkit Assistant</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-primary-foreground/80 hover:text-primary-foreground">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[80%] space-y-2">
                    <div
                      className={`px-3 py-2 rounded-xl text-sm leading-relaxed ${
                        msg.from === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted text-foreground rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.options && (
                      <div className="flex flex-wrap gap-1.5">
                        {msg.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleOption(opt)}
                            className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            {isTextInputStep && (
              <div className="p-3 border-t border-border shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 text-sm h-9"
                  />
                  <Button type="submit" size="icon" className="h-9 w-9 shrink-0">
                    <Send size={16} />
                  </Button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GigiChatbot;

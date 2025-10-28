import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CTA = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  function isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  const onJoin = () => {
    if (!email) {
      toast({ title: "Please enter email", variant: "destructive" });
      return;
    }
    if (!isValidEmail(email)) {
      toast({ title: "Invalid email format", description: "Please check and try again", variant: "destructive" });
      return;
    }

    try {
      const list = JSON.parse(localStorage.getItem("waitlist") || "[]");
      if (!list.includes(email)) list.push(email);
      localStorage.setItem("waitlist", JSON.stringify(list));
      toast({ title: "Successfully joined waitlist", description: email });
      setEmail("");
    } catch {
      toast({ title: "Save failed", description: "Please try again later", variant: "destructive" });
    }
  };
  return (
    <section className="py-24 px-4 relative">
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[120px]" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Early Access</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
            Enter the Era of Encrypted Freelancing
          </h2>

          <p className="text-xl text-muted-foreground mb-12">
            Join the waitlist and become one of the first users to experience the Web3 encrypted payment platform
          </p>

          {/* Email Signup Form */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-12">
            <Input 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-input/50 backdrop-blur-sm border-border/50 focus:border-primary/50 h-12"
            />
            <Button variant="hero" size="lg" className="sm:w-auto" onClick={onJoin}>
              Join Waitlist
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-border/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">FHE</div>
              <div className="text-sm text-muted-foreground">Fully Homomorphic</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">Web3</div>
              <div className="text-sm text-muted-foreground">Decentralized</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">E2E</div>
              <div className="text-sm text-muted-foreground">End-to-End Encrypted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">0%</div>
              <div className="text-sm text-muted-foreground">Platform Fees</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

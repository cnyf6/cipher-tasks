import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Animated Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />

      {/* Content */}
      <div className="container relative z-10 px-4 mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Shield className="w-5 h-5 text-primary animate-glow" />
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Powered by FHE Technology
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">
          Confidential Freelancer
          <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Payment Platform
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          Web3-Based Encrypted Freelance Payment Platform
          <br />
          <span className="text-foreground/80">
            End-to-end encrypted tasks and payments with FHE smart contracts
          </span>
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-sm">Encrypted Tasks</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm">Encrypted Payments</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm">Smart Contracts</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="hero"
            size="lg"
            className="min-w-[200px]"
            onClick={() => navigate("/token")}
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="min-w-[200px]"
            onClick={() => {
              const howItWorks = document.querySelector('#how-it-works');
              if (howItWorks) howItWorks.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Learn More
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground">End-to-End Encrypted</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">0%</div>
            <div className="text-muted-foreground">Platform Fees</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">Web3</div>
            <div className="text-muted-foreground">Decentralized</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

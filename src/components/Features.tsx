import { Card } from "@/components/ui/card";
import { Lock, DollarSign, FileCode } from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Encrypted Task Details",
    description: "Use FHE technology to encrypt task requirements and deliverables end-to-end, visible only to authorized parties",
    highlight: "Fully Homomorphic",
  },
  {
    icon: DollarSign,
    title: "Encrypted Payment Amounts",
    description: "Payment amounts are encrypted throughout storage and transmission, protecting employer budgets and freelancer income privacy",
    highlight: "Privacy Protected",
  },
  {
    icon: FileCode,
    title: "Smart Contract Escrow",
    description: "Smart contracts based on encrypted conditions automatically release payments without requiring trust in third-party intermediaries",
    highlight: "Trustless",
  },
];

const Features = () => {
  return (
    <section className="py-24 px-4 relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Core Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fully encrypted freelance payment solution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] group"
              >
                <div className="mb-6 relative">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full border border-primary/30">
                    {feature.highlight}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;

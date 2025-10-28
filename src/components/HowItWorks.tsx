import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Employer Posts Encrypted Task",
    description: "When creating a task, all requirement details and budget amounts are automatically encrypted on-chain",
  },
  {
    number: "02",
    title: "Freelancer Accepts Task",
    description: "Use private key to view encrypted task details and submit encrypted work proposals",
  },
  {
    number: "03",
    title: "Smart Contract Escrow",
    description: "Payment is locked in smart contract, verified based on encrypted conditions",
  },
  {
    number: "04",
    title: "Homomorphic Verification",
    description: "After task completion, FHE technology verifies conditions and automatically releases encrypted payment",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four steps to fully encrypted freelance payments
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12">
                {/* Step Number */}
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/50 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {step.number}
                    </span>
                  </div>
                  
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-full left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-primary/50 to-transparent" />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block w-6 h-6 text-primary/50 -ml-3 -mr-3" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

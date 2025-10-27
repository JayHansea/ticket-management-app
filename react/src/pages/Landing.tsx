import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WaveBackground } from "@/components/WaveBackground";
import { DecorativeCircle } from "@/components/DecorativeCircle";
import { CheckCircle2, Zap, Shield, BarChart3 } from "lucide-react";

const features = [
  {
    icon: CheckCircle2,
    title: "Easy Tracking",
    description:
      "Track all your tickets in one centralized dashboard with real-time updates.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Create, update, and resolve tickets instantly with our optimized workflow.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description:
      "Your data is protected with enterprise-grade security and backup systems.",
  },
  {
    icon: BarChart3,
    title: "Insightful Analytics",
    description:
      "Get detailed insights into ticket trends and team performance metrics.",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary-glow/5 overflow-hidden">
        <DecorativeCircle
          size={400}
          position={{ top: "-200px", right: "-100px" }}
          color="glow"
          opacity={0.15}
        />
        <DecorativeCircle
          size={300}
          position={{ bottom: "-150px", left: "-50px" }}
          color="primary"
          opacity={0.1}
        />

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Manage Tickets with{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Confidence
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              TicketFlow helps teams track, prioritize, and resolve issues
              faster. Say goodbye to scattered tickets and hello to streamlined
              workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-lg px-8"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <WaveBackground />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything you need to manage tickets
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make ticket management effortless
              and efficient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary-glow/5 relative">
        <DecorativeCircle
          size={250}
          position={{ top: "20%", right: "10%" }}
          color="primary"
          opacity={0.08}
        />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border rounded-2xl p-8 sm:p-12 text-center shadow-lg">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to streamline your workflow?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join teams who trust TicketFlow to manage their tickets
              efficiently.
            </p>
            <Link to="/signup">
              <Button size="lg" className="text-lg px-8">
                Start Free Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;

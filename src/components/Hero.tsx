import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";
import heroImage from "@/assets/hero-hospital-tech.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center pt-16 bg-subtle-gradient">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-foreground">Transforming</span>
                <br />
                <span className="bg-hero-gradient bg-clip-text text-transparent">Healthcare Technology</span>
                <br />
                <span className="text-foreground">for Hospitals</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Streamline operations, enhance patient care, and drive efficiency with our cutting-edge SaaS solutions designed specifically for modern healthcare facilities.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3 mx-auto">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">HIPAA Compliant</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-3 mx-auto">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <div className="text-sm text-muted-foreground">Lightning Fast</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3 mx-auto">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">24/7 Support</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img 
                src={heroImage} 
                alt="Healthcare Technology" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-hero-gradient/10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
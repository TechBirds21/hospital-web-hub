import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Users, 
  Calendar, 
  BarChart3, 
  Shield, 
  Smartphone,
  ArrowRight 
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: FileText,
      title: "Electronic Health Records",
      description: "Comprehensive EHR system with intuitive interface, real-time updates, and seamless data sharing across departments.",
      features: ["Patient History Tracking", "Prescription Management", "Lab Integration"]
    },
    {
      icon: Calendar,
      title: "Appointment Management",
      description: "Smart scheduling system that optimizes patient flow, reduces wait times, and maximizes resource utilization.",
      features: ["Online Booking", "Automated Reminders", "Resource Optimization"]
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Powerful business intelligence tools providing actionable insights for better decision-making and improved outcomes.",
      features: ["Custom Dashboards", "Performance Metrics", "Predictive Analytics"]
    },
    {
      icon: Users,
      title: "Staff Management",
      description: "Complete workforce management solution including scheduling, credentialing, and performance tracking.",
      features: ["Shift Scheduling", "Credential Tracking", "Performance Reviews"]
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Enterprise-grade security ensuring HIPAA compliance, data protection, and audit trail management.",
      features: ["HIPAA Compliance", "Data Encryption", "Audit Trails"]
    },
    {
      icon: Smartphone,
      title: "Mobile Solutions",
      description: "Native mobile apps for healthcare professionals enabling secure access to patient data anywhere, anytime.",
      features: ["iOS & Android Apps", "Offline Access", "Real-time Sync"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-subtle-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-foreground">Comprehensive Healthcare</span>
            <br />
            <span className="bg-hero-gradient bg-clip-text text-transparent">Software Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From patient management to business intelligence, our integrated platform 
            covers every aspect of modern hospital operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" size="sm" className="group/btn">
                  Learn More
                  <ArrowRight className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg">
            Explore All Features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
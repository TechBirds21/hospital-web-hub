import { Building2, Users, Award, Globe } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Building2, value: "500+", label: "Hospitals Served" },
    { icon: Users, value: "10M+", label: "Patients Helped" },
    { icon: Award, value: "99.9%", label: "Uptime Guarantee" },
    { icon: Globe, value: "25+", label: "Countries" },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-foreground">Trusted by Healthcare</span>
            <br />
            <span className="bg-primary-gradient bg-clip-text text-transparent">Leaders Worldwide</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            For over a decade, we've been at the forefront of healthcare technology innovation, 
            helping hospitals streamline operations, improve patient outcomes, and reduce costs 
            through intelligent software solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground">Our Mission</h3>
            <p className="text-lg text-muted-foreground">
              We believe that technology should enhance human care, not complicate it. 
              Our mission is to create intuitive, powerful software solutions that empower 
              healthcare professionals to focus on what matters most: their patients.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">HIPAA compliant and secure by design</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">Seamless integration with existing systems</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">24/7 expert support and training</p>
              </div>
            </div>
          </div>
          <div className="bg-subtle-gradient rounded-2xl p-8 shadow-elegant">
            <blockquote className="text-lg text-foreground mb-6">
              "MedTech Solutions transformed our hospital operations. Patient satisfaction increased by 40% 
              and our administrative costs decreased by 25% within the first year."
            </blockquote>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">DR</span>
              </div>
              <div>
                <div className="font-semibold text-foreground">Dr. Sarah Rodriguez</div>
                <div className="text-sm text-muted-foreground">Chief Medical Officer, Metro General Hospital</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Briefcase, CheckCircle, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface AboutData {
  name: string;
  motto: string;
  description: string;
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  summary: {
    yearsOfExperience: number;
    projectsCompleted: number;
    clientsSatisfied: number;
  };
}

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    fetch("/data/about.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return null;

  const stats = [
    { icon: Briefcase, label: "Years Experience", value: data.summary.yearsOfExperience },
    { icon: CheckCircle, label: "Projects Completed", value: data.summary.projectsCompleted },
    { icon: Users, label: "Clients Satisfied", value: data.summary.clientsSatisfied },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-xl text-muted-foreground italic">{data.motto}</p>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Bio */}
            <Card className="p-8 shadow-elegant">
              <h3 className="text-2xl font-bold mb-4">{data.name}</h3>
              <p className="text-muted-foreground leading-relaxed">{data.description}</p>
            </Card>

            {/* Contact Info */}
            <Card className="p-8 shadow-elegant space-y-4">
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <span>{data.contact.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary" />
                <span>{data.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{data.contact.location}</span>
              </div>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center shadow-elegant hover:shadow-glow transition-shadow">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                    {stat.value}+
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Github, Linkedin, Globe, Copy, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";

interface ContactData {
  email: string;
  phone: string;
  location: string;
}

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [contact, setContact] = useState<ContactData | null>(null);

  useEffect(() => {
    fetch("/data/about.json")
      .then((res) => res.json())
      .then((data) => setContact(data.contact));
  }, []);

  const copyEmail = () => {
    if (contact?.email) {
      navigator.clipboard.writeText(contact.email);
      toast.success("Email copied to clipboard!");
    }
  };

  if (!contact) return null;

  const contactMethods = [
    { icon: Mail, label: "Email", value: contact.email, action: () => window.location.href = `mailto:${contact.email}` },
    { icon: Phone, label: "Phone", value: contact.phone, action: () => window.location.href = `tel:${contact.phone}` },
    { icon: MapPin, label: "Location", value: contact.location },
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/yourusername" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/yourusername" },
    { icon: Globe, label: "Website", href: "https://yourwebsite.com" },
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get In <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-xl text-muted-foreground">Let's work together!</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Contact Methods */}
              <Card className="p-8 shadow-elegant">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {contactMethods.map((method) => (
                    <div key={method.label} className="flex items-start space-x-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <method.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-1">{method.label}</p>
                        <p className="font-medium">{method.value}</p>
                      </div>
                      {method.action && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={method.action}
                          className="shrink-0"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-8 shadow-elegant">
                <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-accent justify-start"
                    onClick={() => window.location.href = `mailto:${contact.email}`}
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Send Email
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={copyEmail}
                  >
                    <Copy className="h-5 w-5 mr-2" />
                    Copy Email Address
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.open("https://open.kakao.com/", "_blank")}
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    KakaoTalk
                  </Button>
                </div>

                <div className="mt-8">
                  <h4 className="text-sm font-medium text-muted-foreground mb-4">Find me on</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((link) => (
                      <Button
                        key={link.label}
                        size="icon"
                        variant="outline"
                        onClick={() => window.open(link.href, "_blank")}
                        className="hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <link.icon className="h-5 w-5" />
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="text-center mt-16 pt-8 border-t border-border">
        <p className="text-muted-foreground">
          © 2025 Your Name. Built with React + TypeScript + Tailwind CSS
        </p>
      </div>
    </section>
  );
};

export default Contact;

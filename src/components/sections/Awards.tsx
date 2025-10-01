import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, BookOpen, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface AwardItem {
  id: string;
  type: "certification" | "achievement" | "training";
  title: string;
  period: string;
  organization: string;
  description: string;
}

const typeConfig = {
  certification: { icon: Award, color: "text-blue-500", bg: "bg-blue-500/10" },
  achievement: { icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  training: { icon: BookOpen, color: "text-green-500", bg: "bg-green-500/10" },
};

const Awards = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [awards, setAwards] = useState<AwardItem[]>([]);

  useEffect(() => {
    fetch("/data/awards.json")
      .then((res) => res.json())
      .then((data) => setAwards(data));
  }, []);

  return (
    <section id="awards" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Awards & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Certifications</span>
            </h2>
            <p className="text-xl text-muted-foreground">Achievements and continuous learning</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {awards.map((award, index) => {
              const config = typeConfig[award.type];
              const Icon = config.icon;

              return (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 shadow-elegant hover:shadow-glow transition-shadow h-full">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${config.bg}`}>
                        <Icon className={`h-6 w-6 ${config.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-lg">{award.title}</h3>
                        </div>
                        <Badge variant="secondary" className="mb-3">
                          {award.period}
                        </Badge>
                        <p className="text-sm font-medium text-primary mb-2">
                          {award.organization}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {award.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Awards;

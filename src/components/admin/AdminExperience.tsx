import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  responsibilities: string[];
}

const AdminExperience = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    fetch("/data/experience.json")
      .then((res) => res.json())
      .then((data) => setExperiences(data));
  }, []);

  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      company: "",
      position: "",
      period: "",
      responsibilities: [""],
    };
    setExperiences([...experiences, newExp]);
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setExperiences(
      experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const deleteExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const addResponsibility = (expId: string) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === expId ? { ...exp, responsibilities: [...exp.responsibilities, ""] } : exp
      )
    );
  };

  const updateResponsibility = (expId: string, index: number, value: string) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              responsibilities: exp.responsibilities.map((r, i) => (i === index ? value : r)),
            }
          : exp
      )
    );
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(experiences, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "experience.json";
    link.click();
    toast.success("Data exported!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Experience Management</h2>
        <Button onClick={addExperience}>
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {experiences.map((exp) => (
        <Card key={exp.id} className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">Experience Entry</h3>
            <Button variant="destructive" size="sm" onClick={() => deleteExperience(exp.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Company</Label>
              <Input
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
              />
            </div>
            <div>
              <Label>Position</Label>
              <Input
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label>Period</Label>
            <Input
              value={exp.period}
              onChange={(e) => updateExperience(exp.id, "period", e.target.value)}
              placeholder="2021.03 - Present"
            />
          </div>
          <div>
            <Label>Responsibilities</Label>
            {exp.responsibilities.map((resp, idx) => (
              <Textarea
                key={idx}
                value={resp}
                onChange={(e) => updateResponsibility(exp.id, idx, e.target.value)}
                className="mb-2"
              />
            ))}
            <Button size="sm" variant="outline" onClick={() => addResponsibility(exp.id)}>
              Add Responsibility
            </Button>
          </div>
        </Card>
      ))}

      <Button onClick={handleExport} className="w-full">
        Export JSON
      </Button>
    </div>
  );
};

export default AdminExperience;

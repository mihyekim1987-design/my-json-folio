import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AdminAbout = () => {
  const [data, setData] = useState({
    name: "",
    motto: "",
    description: "",
    contact: { email: "", phone: "", location: "" },
    summary: { yearsOfExperience: 0, projectsCompleted: 0, clientsSatisfied: 0 },
  });

  useEffect(() => {
    fetch("/data/about.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleSave = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "about.json";
    link.click();
    toast.success("Data exported! Replace the file in public/data/about.json");
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">About Information</h2>
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="motto">Motto</Label>
          <Input
            id="motto"
            value={data.motto}
            onChange={(e) => setData({ ...data, motto: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            rows={4}
          />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.contact.email}
              onChange={(e) =>
                setData({ ...data, contact: { ...data.contact, email: e.target.value } })
              }
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={data.contact.phone}
              onChange={(e) =>
                setData({ ...data, contact: { ...data.contact, phone: e.target.value } })
              }
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={data.contact.location}
              onChange={(e) =>
                setData({ ...data, contact: { ...data.contact, location: e.target.value } })
              }
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="years">Years of Experience</Label>
            <Input
              id="years"
              type="number"
              value={data.summary.yearsOfExperience}
              onChange={(e) =>
                setData({
                  ...data,
                  summary: { ...data.summary, yearsOfExperience: parseInt(e.target.value) },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="projects">Projects Completed</Label>
            <Input
              id="projects"
              type="number"
              value={data.summary.projectsCompleted}
              onChange={(e) =>
                setData({
                  ...data,
                  summary: { ...data.summary, projectsCompleted: parseInt(e.target.value) },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="clients">Clients Satisfied</Label>
            <Input
              id="clients"
              type="number"
              value={data.summary.clientsSatisfied}
              onChange={(e) =>
                setData({
                  ...data,
                  summary: { ...data.summary, clientsSatisfied: parseInt(e.target.value) },
                })
              }
            />
          </div>
        </div>
        <Button onClick={handleSave} className="w-full">
          Export JSON
        </Button>
      </div>
    </Card>
  );
};

export default AdminAbout;

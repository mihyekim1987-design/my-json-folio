import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const AdminProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: `proj-${Date.now()}`,
        title: "",
        image: "/placeholder.svg",
        tags: [],
        techStack: "",
        description: "",
        contribution: "",
        outcome: "",
        links: { demo: "", github: "" },
      },
    ]);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(projects, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "projects.json";
    link.click();
    toast.success("Data exported!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects Management</h2>
        <Button onClick={addProject}>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {projects.map((proj, idx) => (
        <Card key={proj.id} className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">Project {idx + 1}</h3>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setProjects(projects.filter((p) => p.id !== proj.id))}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                value={proj.title}
                onChange={(e) => {
                  const newProjects = [...projects];
                  newProjects[idx].title = e.target.value;
                  setProjects(newProjects);
                }}
              />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input
                value={proj.image}
                onChange={(e) => {
                  const newProjects = [...projects];
                  newProjects[idx].image = e.target.value;
                  setProjects(newProjects);
                }}
              />
            </div>
          </div>
          <div>
            <Label>Tags (comma-separated)</Label>
            <Input
              value={proj.tags.join(", ")}
              onChange={(e) => {
                const newProjects = [...projects];
                newProjects[idx].tags = e.target.value.split(",").map((t: string) => t.trim());
                setProjects(newProjects);
              }}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={proj.description}
              onChange={(e) => {
                const newProjects = [...projects];
                newProjects[idx].description = e.target.value;
                setProjects(newProjects);
              }}
            />
          </div>
        </Card>
      ))}

      <Button onClick={handleExport} className="w-full">
        Export JSON
      </Button>
    </div>
  );
};

export default AdminProjects;

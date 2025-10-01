import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdminSkills = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch("/data/skills.json")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const addCategory = () => {
    setCategories([...categories, { category: "", skills: [{ name: "", level: 50 }] }]);
  };

  const addSkill = (catIndex: number) => {
    const newCategories = [...categories];
    newCategories[catIndex].skills.push({ name: "", level: 50 });
    setCategories(newCategories);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(categories, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "skills.json";
    link.click();
    toast.success("Data exported!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Skills Management</h2>
        <Button onClick={addCategory}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {categories.map((cat, catIdx) => (
        <Card key={catIdx} className="p-6 space-y-4">
          <div>
            <Label>Category Name</Label>
            <Input
              value={cat.category}
              onChange={(e) => {
                const newCats = [...categories];
                newCats[catIdx].category = e.target.value;
                setCategories(newCats);
              }}
            />
          </div>
          {cat.skills.map((skill: any, skillIdx: number) => (
            <div key={skillIdx} className="grid grid-cols-2 gap-4">
              <div>
                <Label>Skill Name</Label>
                <Input
                  value={skill.name}
                  onChange={(e) => {
                    const newCats = [...categories];
                    newCats[catIdx].skills[skillIdx].name = e.target.value;
                    setCategories(newCats);
                  }}
                />
              </div>
              <div>
                <Label>Level (0-100)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={skill.level}
                  onChange={(e) => {
                    const newCats = [...categories];
                    newCats[catIdx].skills[skillIdx].level = parseInt(e.target.value);
                    setCategories(newCats);
                  }}
                />
              </div>
            </div>
          ))}
          <Button size="sm" variant="outline" onClick={() => addSkill(catIdx)}>
            Add Skill
          </Button>
        </Card>
      ))}

      <Button onClick={handleExport} className="w-full">
        Export JSON
      </Button>
    </div>
  );
};

export default AdminSkills;

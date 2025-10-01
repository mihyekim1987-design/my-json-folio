import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminAwards = () => {
  const [awards, setAwards] = useState<any[]>([]);

  useEffect(() => {
    fetch("/data/awards.json")
      .then((res) => res.json())
      .then((data) => setAwards(data));
  }, []);

  const addAward = () => {
    setAwards([
      ...awards,
      {
        id: `award-${Date.now()}`,
        type: "certification",
        title: "",
        period: "",
        organization: "",
        description: "",
      },
    ]);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(awards, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "awards.json";
    link.click();
    toast.success("Data exported!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Awards Management</h2>
        <Button onClick={addAward}>
          <Plus className="h-4 w-4 mr-2" />
          Add Award
        </Button>
      </div>

      {awards.map((award, idx) => (
        <Card key={award.id} className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">Award {idx + 1}</h3>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setAwards(awards.filter((a) => a.id !== award.id))}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <Label>Type</Label>
            <Select
              value={award.type}
              onValueChange={(value) => {
                const newAwards = [...awards];
                newAwards[idx].type = value;
                setAwards(newAwards);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="certification">Certification</SelectItem>
                <SelectItem value="achievement">Achievement</SelectItem>
                <SelectItem value="training">Training</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                value={award.title}
                onChange={(e) => {
                  const newAwards = [...awards];
                  newAwards[idx].title = e.target.value;
                  setAwards(newAwards);
                }}
              />
            </div>
            <div>
              <Label>Period</Label>
              <Input
                value={award.period}
                onChange={(e) => {
                  const newAwards = [...awards];
                  newAwards[idx].period = e.target.value;
                  setAwards(newAwards);
                }}
                placeholder="2022.06"
              />
            </div>
          </div>
          <div>
            <Label>Organization</Label>
            <Input
              value={award.organization}
              onChange={(e) => {
                const newAwards = [...awards];
                newAwards[idx].organization = e.target.value;
                setAwards(newAwards);
              }}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={award.description}
              onChange={(e) => {
                const newAwards = [...awards];
                newAwards[idx].description = e.target.value;
                setAwards(newAwards);
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

export default AdminAwards;

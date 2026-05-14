import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";

const AddTask = ({ handleAddTask }) => {
  const [taskTitle, setTaskTitle] = React.useState("");

  const addTask = async () => {
    if (taskTitle.trim()) {
      try {
        await api.post("/tasks", { title: taskTitle });
        setTaskTitle("");
        toast.success("Công việc đã được thêm thành công!");
        if (handleAddTask) handleAddTask();
      } catch (error) {
        console.error("Error adding task:", error);
        toast.error("Có lỗi xảy ra khi thêm công việc!");
      }
    } else {
      toast.error("Vui lòng nhập nội dung công việc!");
    }
  };
  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="Bạn cần làm gì?"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus-border-primary/50 focus:ring-primary/20 "
          onKeyPress={(e) => e.key === "Enter" && addTask()}
        />
        <Button
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300"
          onClick={addTask}
        >
          <Plus className="size-4" /> Thêm
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;

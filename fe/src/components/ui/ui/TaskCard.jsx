import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, CheckCircle, Circle, SquarePen, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import api from "@/lib/axios";

const TaskCard = ({ task, index, handleTaskChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(task.title);

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      updatedTitle.trim() && (await updateTask());
      setIsEditing(false);
    }
  };

  const updateTask = async () => {
    try {
      setIsEditing(false);
      await api.put(`/tasks/${task._id}`, {
        title: updatedTitle,
        status: task.status,
        completedAt: task.completedAt,
      });
      toast.success("Công việc đã được cập nhật thành công!");
      handleTaskChange();
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Có lỗi xảy ra khi cập nhật công việc!");
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Công việc đã được xóa thành công!");
      handleTaskChange();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Có lỗi xảy ra khi xóa công việc!");
    }
  };

  const toggleStatus = async () => {
    try {
      const newStatus = task.status === "active" ? "completed" : "active";
      const completedAt = newStatus === "completed" ? new Date().toISOString() : null;
      await api.put(`/tasks/${task._id}`, { ...task, status: newStatus, completedAt });
      toast.success("Công việc đã được cập nhật thành công!");
      handleTaskChange();
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Có lỗi xảy ra khi cập nhật công việc!");
    }
  };

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "completed" && "opacity-75",
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-4 justify-between">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 rounded-full border-2 border-primary transition-colors duration-200 size-8",
            task.status === "completed"
              ? "text-success hover:text-success/80"
              : "text-foreground hover:text-primary",
          )}
          onClick={toggleStatus}
        >
          {task.status === "completed" ? (
            <CheckCircle className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              type="text"
              defaultValue={task.title}
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              placeholder="Cần làm gì?"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditing(false);
                updatedTitle.trim() && updateTask();
              }}
            />
          ) : (
            <div>
              <p
                className={cn(
                  "font-medium text-foreground",
                  task.status === "completed" && "line-through",
                )}
              >
                {task.title}
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <Calendar className="size-3" />
                {new Date(task.createdAt).toLocaleDateString("vi-VN")}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => {
              setIsEditing(true);
              setUpdatedTitle(task.title || "");
            }}
          >
            <SquarePen className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-destructive hover:text-destructive"
            onClick={() => deleteTask(task._id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
export default TaskCard;

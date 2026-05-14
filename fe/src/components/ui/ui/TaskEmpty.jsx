import React from "react";
import { Card } from "@/components/ui/card";
import { Circle } from "lucide-react";

const TaskEmpty = ({ filter = "ALL" }) => {
  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="space-y-3">
        <Circle className="mx-auto size-12 text-muted-foreground" />
        <div>
          <h3 className="font-medium text-foreground">
            {filter === "ACTIVE"
              ? "Không có công việc nào đang thực hiện"
              : filter === "COMPLETED"
                ? "Không có công việc nào đã hoàn thành"
                : "Không có công việc nào cả"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {filter === "ALL"
              ? "Hãy thêm công việc để bắt đầu làm việc!"
              : filter === "ACTIVE"
                ? 'Chuyển sang "Tất cả" để xem tất cả công việc của bạn.'
                : 'Chuyển sang "Tất cả" để xem tất cả công việc của bạn.'}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TaskEmpty;

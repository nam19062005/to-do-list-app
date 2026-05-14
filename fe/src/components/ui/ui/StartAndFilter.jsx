import { FilterType } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";
import { Filter } from "lucide-react";

const StartAndFilter = ({
  completedTasksCount = 0,
  activeTasksCount = 0,
  filter = "ALL",
  setfilter,
}) => {
  return (
    <div className=" flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      {/* Phần thống kê */}
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/20"
        >
          {activeTasksCount} {FilterType.ACTIVE}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-white/50 text-success  border-success/20"
        >
          {completedTasksCount} {FilterType.COMPLETED}
        </Badge>
      </div>
      {/* Phần lọc */}
      <div className="flex flex-col gap-2 sm:flex-row">
        {Object.entries(FilterType).map(([key, value]) => (
          <Button
            key={key}
            variant={filter === key ? "default" : "outline"}
            size="sm"
            className="capitalize"
          onClick={() => setfilter(key)}
          >
            <Filter className="size-4" /> {value}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StartAndFilter;

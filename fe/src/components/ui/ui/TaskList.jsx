import React from "react";
import TaskEmpty from "./TaskEmpty";
import TaskCard from "./TaskCard";

const TaskList = ({ filterTasks, filter, handleTaskChange }) => {
  if (!filterTasks || filterTasks.length === 0) {
    return <TaskEmpty filter={filter}></TaskEmpty>;
  }

  return (
    <div className="space-y-4">
      {filterTasks.map((task, index) => (
        <TaskCard
          key={index}
          task={task}
          index={index}
          handleTaskChange={handleTaskChange}
        ></TaskCard>
      ))}
    </div>
  );
};

export default TaskList;

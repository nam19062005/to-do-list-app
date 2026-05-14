import DateTimeFilter from "@/components/ui/ui/DateTimeFilter";
import Header from "@/components/ui/ui/header";
import AddTask from "@/components/ui/ui/AddTask";
import StartAndFilter from "@/components/ui/ui/StartAndFilter";
import TaskList from "@/components/ui/ui/TaskList";
import TaskListPagination from "@/components/ui/ui/TaskListPagination";
import Footer from "@/components/ui/ui/Footer";
import React, { useEffect } from "react";
import api from "@/lib/axios";
import { visibleTaskslimit } from "@/lib/data";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = React.useState([]);
  const [activeTasksCount, setActiveTasksCount] = React.useState(0);
  const [completedTasksCount, setCompletedTasksCount] = React.useState(0);
  const [filter, setFilter] = React.useState("ALL");
  const [dateQuery, setDateQuery] = React.useState("today");
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks", { params: { filter: dateQuery } });
      setTaskBuffer(response.data.tasks);
      setActiveTasksCount(response.data.activeTasksCount);
      setCompletedTasksCount(response.data.completedTasksCount);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "ACTIVE":
        return task.status === "active";
      case "COMPLETED":
        return task.status === "completed";
      default:
        return true;
    }
  });

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskslimit);

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskslimit,
    page * visibleTaskslimit
  );

  if (visibleTasks.length === 0 && page > 1) {
    setPage(page - 1);
  }

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  const handleTaskChange = React.useCallback(() => {
    fetchTasks();
  }, [dateQuery]);

  return (
    <div className="min-h-screen w-full relative bg-white">
      {/* Cool Blue Glow Left */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
        radial-gradient(
          circle at top left,
          rgba(70, 130, 180, 0.5),
          transparent 70%
        )
      `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full md:w-full px-4 max-w-2xl p-6 mx-auto space-y-6">
          {/* // Đầu trang */}
          <Header />
          {/* // Thêm nhiệm vụ */}
          <AddTask handleAddTask={handleTaskChange} />
          {/* // Lọc và sắp xếp */}
          <StartAndFilter
            activeTasksCount={activeTasksCount}
            completedTasksCount={completedTasksCount}
            filter={filter}
            setfilter={setFilter}
          />
          {/* // Danh sách nhiệm vụ */}
          <TaskList
            filterTasks={visibleTasks}
            filter={filter}
            handleTaskChange={handleTaskChange}
          />
          {/* // Phân trang và lọc theo ngày */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
            <TaskListPagination
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
          </div>
          {/* // Chân trang */}
          <Footer
            activeTasksCount={activeTasksCount}
            completedTasksCount={completedTasksCount}
          />
        </div>
      </div>
    </div>
  );
};
export default HomePage;

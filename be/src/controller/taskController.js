import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  const { filter = "today" } = req.query;
  const today = new Date();
  let statrtDate;
  switch (filter) {
    case "today":
      statrtDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );
      break;
    case "week":
      const dayOfWeek = today.getDay();
      statrtDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - dayOfWeek,
      );
      break;
    case "month":
      statrtDate = new Date(today.getFullYear(), today.getMonth(), 1);
      break;
    case "all":
    default: {
      statrtDate = null;
    }
  }

  const query = statrtDate ? { createdAt: { $gte: statrtDate } } : {};
  try {
    const results = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeTasksCount: [
            { $match: { status: "active" } },
            { $count: "count" },
          ],
          completedTasksCount: [
            { $match: { status: "completed" } },
            { $count: "count" },
          ],
        },
      },
    ]);
    const tasks = results[0].tasks;
    const activeTasksCount = results[0].activeTasksCount[0]
      ? results[0].activeTasksCount[0].count
      : 0;
    const completedTasksCount = results[0].completedTasksCount[0]
      ? results[0].completedTasksCount[0].count
      : 0;
    res.status(200).json({ tasks, activeTasksCount, completedTasksCount });
  } catch (error) {
    console.error("Lỗi khi lấy nhiệm vụ", error);
    res.status(500).json({ message: "Lỗi khi lấy nhiệm vụ" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title });
    const newtask = await task.save();
    res.status(201).json(newtask);
  } catch (error) {
    console.error("Lỗi khi tạo nhiệm vụ", error);
    res.status(500).json({ message: "Lỗi khi tạo nhiệm vụ" });
  }
};
// Cập nhật nhiệm vụ theo id
export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, status, completedAt },
      { new: true },
    );
    if (!task) {
      return res.status(404).json({ message: "Nhiệm vụ không tồn tại" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Lỗi khi cập nhật nhiệm vụ", error);
    res.status(500).json({ message: "Lỗi khi cập nhật nhiệm vụ" });
  }
};
// Xóa nhiệm vụ theo id
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Nhiệm vụ không tồn tại" });
    }
    res.status(200).json({ message: "Xóa nhiệm vụ thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa nhiệm vụ", error);
    res.status(500).json({ message: "Lỗi khi xóa nhiệm vụ" });
  }
};
// Logic các controller cho nhiệm vụ

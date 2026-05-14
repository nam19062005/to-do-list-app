import mongoose from "mongoose";
// mỗi task sẽ có tiêu đề, trạng thái và thời gian hoàn thành
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ["active", "completed"],
    default: "active"
  },
  completedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
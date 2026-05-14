import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Kết nối MongoDB thành công");
    } catch (error) {
        console.error("Kết nối MongoDB thất bại", error);
        process.exit(1);//đóng ứng dụng nếu kết nối thất bại
    }
}
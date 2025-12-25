import mongoose from "mongoose"
import dotenv from "dotenv";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error conection to monogDB: ${error.message}`);
        process.exit(1); // 1 is failure ,0 is success
    }
}
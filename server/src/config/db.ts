import mongoose from "mongoose";

export const db_connection = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI! as string);
        console.log("DB Connected Successfully:", connection.connection.host);
    } catch (error) {
        console.error("DB Connection error:", error);
        process.exit(1);   
    }
}

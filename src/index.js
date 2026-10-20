import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cors from 'cors';
import { app, server } from "./lib/socket.js";

dotenv.config();


const PORT = process.env.PORT;
// app.use(express.json());  // for limited file size

app.use(express.json({limit: "10mb"})); // for upto 10mb file limit
// app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
// app.use(cors());
app.use(cors({
    // origin: "http://localhost:5173",
    origin: "https://chat-app-frontend-liart-psi.vercel.app",
    credentials: true,
}))
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
server.listen(PORT, () => {
    console.log("server is running on port: "+ PORT );
    connectDB();
});
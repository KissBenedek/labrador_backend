import express from "express";
import cors from "cors";
import { initializeDB } from "./database.js";
import doggoRouter from "./routes/doggo.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", doggoRouter)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message });
});

const startServer = async () => {
    await initializeDB();
    app.listen(3020, () => console.log("The server is running on port 3020"));
}

startServer();
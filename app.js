import express from "express";
import cors from "cors";


const app = express();

app.use(cors());
app.use(express.json());


const startServer = async () => {

    app.listen(3020, () => console.log("The server is running on port 3020"));
}

startServer();
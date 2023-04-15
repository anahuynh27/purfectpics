import { config } from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";

//dotenv
config();

//setting up server
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Server Online");
});

const apiRouter = require("./api");
app.use("/api", apiRouter);

const { client } = require("./db");
const PORT = 3000 || process.env;
app.listen(PORT, async () => {
    try {
        console.log(`server is running on http://localhost:${PORT}/`);
        await client.connect()
    } catch (error) {
        client.close()
    }
});
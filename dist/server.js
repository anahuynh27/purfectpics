var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { config } from "dotenv";
import express from "express";
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
app.get("/", (req, res, next) => {
    res.send("Server Online");
});
const apiRouter = require("./api");
app.use("/api", apiRouter);
const { client } = require("./db");
const PORT = 3000 || process.env;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`server is running on http://localhost:${PORT}/`);
        yield client.connect();
    }
    catch (error) {
        client.close();
    }
}));

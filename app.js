import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import morgan from "morgan";
import { initSocketServer } from "./util/index.js";
import { authRoutes, userRoutes } from "./routes/index.js";

const app = express();
const server = http.createServer(app);
initSocketServer(server);

//configura Body Parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//configure static folder
app.use(express.static("uploads"));

//configure Header HTTP - cors
app.use(cors());

//configure logger HTTP request
app.use(morgan("dev"));

//Configure toutings

app.use("/api", authRoutes);
app.use("/api", userRoutes);

export { server };

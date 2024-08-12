import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { breakTextIntoLines } from "./utils/constant.js"
import { fileURLToPath } from 'url';
 
const PORT = process.env.PORT || 3000;

dotenv.config();

//esmoduleFix
// const __filename=fileURLToPath(import.meta.url);
// const __dirname=path.dirname(__filename);
 
//rest object
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/test", (req, res) => {
res.send("Hello Working File")
});



// app.use("*", function (req, res) {
// res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// Server
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import pg from "pg";
const { Pool } = pg;
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';  

dotenv.config();
 
const PORT = 8080; 
//esmoduleFix
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
const app = express();

app.use(cors());
app.use(bodyParser.json());
const connectionString =
  "postgresql://postgres:pqNjVnDCOahVJwrwRhkgkLlspDeEICbn@monorail.proxy.rlwy.net:43207/railway";

const pool = new Pool(
  {
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  },
  (err, client) => {
    if (err) {
      console.error("Error acquiring client", err.stack);
    } else {
      console.log("Connected to Postgres");
    }
  }
);

app.get("/api/v1/banner", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM ban_data ORDER BY id DESC LIMIT 1"
    );
    const banner = result.rows[0] || {
      description: "Test!",
      timer: 30,
      link: "#TEST",
    };
    console.log("Banner data fetched successfully:", banner);
    
    res.json(banner);
  } catch (err) {
    console.error("Error fetching banner data:", err);
    res.status(500).json({ error: err });
  }
});

app.post("/api/v1/banner", async (req, res) => {
  const { description, timer, link,status } = req.body;
  const query =
    "INSERT INTO ban_data (description, timer, link,status) VALUES ($1, $2, $3, $4)";
  const values = [description, timer, link,status];

  try {
    await pool.query(query, values);
    res.status(201).json({ message: "Banner data saved successfully" });
  } catch (err) {
    console.error("Error saving banner data:", err);
    res.status(500).json({ error: err });
  }
});
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

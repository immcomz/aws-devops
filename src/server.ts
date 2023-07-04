import express, { Request, Response } from "express";
import cors from "cors";
import { Pool, Connection } from "pg";
import dotenv from "dotenv";
import config from "config";

const app = express();
dotenv.config();
const port = process.env.PORT || config.get("port");
// const user = process.env.DB_USER || config.get("user");
// const host = process.env.DB_HOST || config.get("host");
// const database = process.env.DATABASE || config.get("database");
// const password = process.env.PASSWORD || config.get("password");
// const db_port = process.env.DB_PORT || config.get("db_port");

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const pool = new Pool({
  // user: user,
  // host: host,
  // database: database,
  // password: password,
  // port: 5432,
  user: config.get("user"),
  host: config.get("host"),
  database: config.get("database"),
  password: config.get("password"),
  port: config.get("db_port"),
});
console.log(process.env.DB_USER);
// pool
//   .connect()
//   .then(() => {
//     console.log("connected");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.use(cors());
app.get("/api/patients", async (req: Request, res: Response) => {
  try {
    const query = "SELECT * FROM patients";
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

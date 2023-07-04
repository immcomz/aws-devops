"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("config"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || config_1.default.get("port");
// const user = process.env.DB_USER || config.get("user");
// const host = process.env.DB_HOST || config.get("host");
// const database = process.env.DATABASE || config.get("database");
// const password = process.env.PASSWORD || config.get("password");
// const db_port = process.env.DB_PORT || config.get("db_port");
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
const pool = new pg_1.Pool({
    // user: user,
    // host: host,
    // database: database,
    // password: password,
    // port: 5432,
    user: config_1.default.get("user"),
    host: config_1.default.get("host"),
    database: config_1.default.get("database"),
    password: config_1.default.get("password"),
    port: config_1.default.get("db_port"),
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
app.use((0, cors_1.default)());
app.get("/api/patients", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "SELECT * FROM patients";
        const result = yield pool.query(query);
        res.json(result.rows);
    }
    catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

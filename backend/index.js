import express from "express";
import mysql from "mysql2/promise";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// --------------------
// DB CONNECTION (POOL)
// --------------------
const pool = mysql.createPool({
  host: process.env.DB_HOST || "db",   // Docker service name
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "app_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Retry DB connection (important for Docker startup timing)
async function connectDB() {
  while (true) {
    try {
      const conn = await pool.getConnection();
      console.log("✅ MySQL connected");
      conn.release();
      break;
    } catch (err) {
      console.log("⏳ Waiting for DB...");
      await new Promise(res => setTimeout(res, 2000));
    }
  }
}

// --------------------
// ROUTES
// --------------------

// Health check
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Example route: get users
app.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Example route: create user
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    const [result] = await pool.query(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Insert failed" });
  }
});

// --------------------
// GLOBAL ERROR HANDLER
// --------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// --------------------
// START SERVER
// --------------------
async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

startServer();
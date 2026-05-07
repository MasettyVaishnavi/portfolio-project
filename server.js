const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed ❌");
    console.log(err);
  } else {
    console.log("Connected to MySQL Database ✅");
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend + Database connected 🚀");
});

// Add Project API
app.post("/add-project", (req, res) => {
  const { title, description, github_link, live_link } = req.body;

  const sql = `
    INSERT INTO projects (title, description, github_link, live_link)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [title, description, github_link, live_link], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error inserting project");
    }
    res.send("Project added successfully ✅");
  });
});

// Get All Projects API
app.get("/projects", (req, res) => {
  const sql = "SELECT * FROM projects";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error fetching projects");
    }
    res.json(result);
  });
});

// Contact Form API
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  const sql = `
    INSERT INTO contacts (name, email, message)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error saving contact message");
    }
    res.send("Message saved successfully ✅");
  });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
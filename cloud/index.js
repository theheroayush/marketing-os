const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const { SKILLS } = require("../skills-data.js");

const app = express();
app.use(cors());
app.use(express.json());

// Database connection pool
const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Setup DB schema on start helper
async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS marku_context (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await pool.query(`
      INSERT INTO marku_context (id, name, content)
      VALUES (1, 'Acme Corp', 'Acme Corp makes high-quality anvils for coyotes. Target audience: Coyotes in the American Southwest. Price: ₹999.')
      ON CONFLICT (id) DO NOTHING
    `);
  } catch (err) {
    console.error("DB Initialization error:", err.message);
  }
}

// Ensure DB is initialized
initDb();

// Routes

// 1. GET /get_product_context
app.get("/get_product_context", async (req, res) => {
  try {
    const result = await pool.query("SELECT name, content FROM marku_context WHERE id = 1");
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product context not found in DB" });
    }
    const { name, content } = result.rows[0];
    res.json({ profile: { name, content } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 2. POST /update_product_context
app.post("/update_product_context", async (req, res) => {
  try {
    const { name, content } = req.body;
    if (!name || !content) {
      return res.status(400).json({ error: "Missing name or content in payload" });
    }
    await pool.query(
      `INSERT INTO marku_context (id, name, content, updated_at) 
       VALUES (1, $1, $2, CURRENT_TIMESTAMP)
       ON CONFLICT (id) DO UPDATE SET name = $1, content = $2, updated_at = CURRENT_TIMESTAMP`,
      [name, content]
    );
    res.json({ success: true, message: "Product context updated successfully in cloud DB" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 3. GET /list_skills
app.get("/list_skills", (req, res) => {
  try {
    const skillsList = SKILLS.map(s => ({
      id: s.id,
      name: s.name,
      category: s.cat,
      tagline: s.tagline,
      description: s.desc
    }));
    res.json(skillsList);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 4. POST /execute_marketing_skill
app.post("/execute_marketing_skill", async (req, res) => {
  try {
    const { skillId, userInput } = req.body;
    if (!skillId || !userInput) {
      return res.status(400).json({ error: "Missing skillId or userInput in request body" });
    }

    const skill = SKILLS.find(s => s.id === skillId);
    if (!skill) {
      return res.status(404).json({ error: `Skill '${skillId}' not found` });
    }

    let productContextText = "No product context loaded.";
    const result = await pool.query("SELECT content FROM marku_context WHERE id = 1");
    if (result.rows.length > 0) {
      productContextText = result.rows[0].content;
    }

    const prompt = `--- ACTIVE PRODUCT MARKETING CONTEXT ---
${productContextText}

--- MARKETING SYSTEM INSTRUCTIONS ---
${skill.system}

--- USER REQUEST ---
${userInput}

--- INSTRUCTIONS ---
Using the product marketing context and the marketing system instructions above, execute the user's request. Output the complete result directly.`;

    res.json({ prompt });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Port configuration for local testing of the cloud script
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`MarkU Cloud Server running on port ${PORT}`);
});

module.exports = app;

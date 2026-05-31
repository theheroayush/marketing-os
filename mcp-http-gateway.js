/**
 * MarkU HTTP Gateway for ChatGPT Custom Actions / GPTs
 * Exposes local context and marketing skills as standard REST endpoints.
 * Run this local daemon to connect ChatGPT to your local brand context.
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const { SKILLS } = require("./skills-data.js");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/get_product_context" && req.method === "GET") {
    try {
      const contextPath = path.join(process.cwd(), "marku-context.json");
      if (!fs.existsSync(contextPath)) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "marku-context.json not found" }));
        return;
      }
      const data = JSON.parse(fs.readFileSync(contextPath, "utf-8"));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } catch (e) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: e.message }));
    }
  } 
  else if (url.pathname === "/list_skills" && req.method === "GET") {
    try {
      const skillsList = SKILLS.map(s => ({
        id: s.id,
        name: s.name,
        category: s.cat,
        tagline: s.tagline,
        description: s.desc
      }));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(skillsList));
    } catch (e) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: e.message }));
    }
  } 
  else if (url.pathname === "/execute_marketing_skill" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", () => {
      try {
        const payload = JSON.parse(body || "{}");
        const { skillId, userInput } = payload;
        
        if (!skillId || !userInput) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Missing skillId or userInput in request body" }));
          return;
        }

        const skill = SKILLS.find(s => s.id === skillId);
        if (!skill) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: `Skill '${skillId}' not found` }));
          return;
        }

        let productContextText = "No product context loaded.";
        const contextPath = path.join(process.cwd(), "marku-context.json");
        if (fs.existsSync(contextPath)) {
          const data = JSON.parse(fs.readFileSync(contextPath, "utf-8"));
          if (data && data.profile && data.profile.content) {
            productContextText = data.profile.content;
          }
        }

        const prompt = `--- ACTIVE PRODUCT MARKETING CONTEXT ---
${productContextText}

--- MARKETING SYSTEM INSTRUCTIONS ---
${skill.system}

--- USER REQUEST ---
${userInput}

--- INSTRUCTIONS ---
Using the product marketing context and the marketing system instructions above, execute the user's request. Output the complete result directly.`;

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ prompt }));
      } catch (e) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
  } 
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`MarkU HTTP Gateway listening on port ${PORT}`);
});

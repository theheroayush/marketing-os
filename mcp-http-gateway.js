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

const server = http.createServer(async (req, res) => {
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
  else if (url.pathname === "/update_product_context" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", () => {
      try {
        const payload = JSON.parse(body || "{}");
        const { name, content } = payload;
        if (!name || !content) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Missing name or content in payload" }));
          return;
        }
        const contextData = { profile: { name, content } };
        const contextPath = path.join(process.cwd(), "marku-context.json");
        fs.writeFileSync(contextPath, JSON.stringify(contextData, null, 2), "utf-8");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, message: "Product context updated successfully" }));
      } catch (e) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
  }
  else if (url.pathname === "/list_whatsapp_groups" && req.method === "GET") {
    try {
      const response = await fetch("http://127.0.0.1:3005/groups");
      if (!response.ok) {
        throw new Error(`Hermes bridge returned status ${response.status}`);
      }
      const data = await response.json();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } catch (e) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: `Failed to fetch groups from WhatsApp bridge: ${e.message}` }));
    }
  }
  else if (url.pathname === "/send_whatsapp_message" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", async () => {
      try {
        const payload = JSON.parse(body || "{}");
        const { chatId, message } = payload;
        if (!chatId || !message) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Missing chatId or message in payload" }));
          return;
        }
        const response = await fetch("http://127.0.0.1:3005/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chatId, message })
        });
        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || `Hermes bridge returned status ${response.status}`);
        }
        const resData = await response.json();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, resData }));
      } catch (e) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: `Failed to send WhatsApp message via bridge: ${e.message}` }));
      }
    });
  }
  else if (url.pathname === "/save_email_draft" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", () => {
      try {
        const payload = JSON.parse(body || "{}");
        const { subject, body: emailBody, recipient } = payload;
        if (!subject || !emailBody) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Missing subject or body in payload" }));
          return;
        }
        const draftsDir = path.join(process.cwd(), "drafts");
        if (!fs.existsSync(draftsDir)) {
          fs.mkdirSync(draftsDir, { recursive: true });
        }
        const sanitizedSubject = subject.replace(/[^a-zA-Z0-9_-]/g, "_").substring(0, 50);
        const filename = `draft_${Date.now()}_${sanitizedSubject}.txt`;
        const filepath = path.join(draftsDir, filename);
        
        const fileContent = `Recipient: ${recipient || "Not specified"}
Subject: ${subject}
Date: ${new Date().toISOString()}
--------------------------------------------------------------------------------
${emailBody}
`;
        fs.writeFileSync(filepath, fileContent, "utf-8");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, filename, filepath }));
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

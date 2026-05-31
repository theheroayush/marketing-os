/**
 * MarkU Model Context Protocol (MCP) Server
 * Exposes product context and marketing skills to LLMs via stdio JSON-RPC.
 */

const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const { CallToolRequestSchema, ListToolsRequestSchema } = require("@modelcontextprotocol/sdk/types.js");
const fs = require("fs");
const path = require("path");

// Load skills data
const { SKILLS } = require("./skills-data.js");

const server = new Server(
  {
    name: "marku-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define list tools request handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_product_context",
        description: "Exposes the active product positioning and target audience context exported from the MarkU UI.",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "list_skills",
        description: "List all 39 marketing skills available in the MarkU framework, including their category, name, and tagline.",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "execute_marketing_skill",
        description: "Combine a marketing skill's system instructions with the active product context and user input to output a structured execution prompt.",
        inputSchema: {
          type: "object",
          properties: {
            skillId: {
              type: "string",
              description: "The unique identifier of the skill (e.g. 'page-cro', 'copywriting', 'cold-email')",
            },
            userInput: {
              type: "string",
              description: "The specific instructions or task description for this skill session",
            },
          },
          required: ["skillId", "userInput"],
        },
      },
    ],
  };
});

// Define call tool request handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  if (name === "get_product_context") {
    try {
      const contextPath = path.join(process.cwd(), "marku-context.json");
      if (!fs.existsSync(contextPath)) {
        return {
          content: [
            {
              type: "text",
              text: "Error: marku-context.json not found in the current working directory. Please export the MCP configuration from the MarkU app's Settings or History view, and place the file in the project directory.",
            },
          ],
          isError: true,
        };
      }
      const data = JSON.parse(fs.readFileSync(contextPath, "utf-8"));
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error reading product context: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }
  
  if (name === "list_skills") {
    try {
      const skillsList = SKILLS.map(skill => ({
        id: skill.id,
        name: skill.name,
        category: skill.cat,
        tagline: skill.tagline,
        description: skill.desc,
      }));
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(skillsList, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error listing skills: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }
  
  if (name === "execute_marketing_skill") {
    const { skillId, userInput } = args;
    try {
      const skill = SKILLS.find(s => s.id === skillId);
      if (!skill) {
        return {
          content: [
            {
              type: "text",
              text: `Error: Skill '${skillId}' not found. Use list_skills to see all valid skill IDs.`,
            },
          ],
          isError: true,
        };
      }
      
      let productContextText = "No product context loaded. Please configure it in MarkU or export marku-context.json.";
      const contextPath = path.join(process.cwd(), "marku-context.json");
      if (fs.existsSync(contextPath)) {
        try {
          const data = JSON.parse(fs.readFileSync(contextPath, "utf-8"));
          if (data && data.profile && data.profile.content) {
            productContextText = data.profile.content;
          }
        } catch (e) {
          productContextText = `Failed to parse product context: ${e.message}`;
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
      
      return {
        content: [
          {
            type: "text",
            text: prompt,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error executing skill: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }
  
  throw new Error(`Unknown tool: ${name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MarkU MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});

# Marketing OS MCP Server Configuration Guide

This guide explains how to configure your AI assistants (Cursor, Claude Desktop, ChatGPT) to load the Marketing OS MCP server.

## Prerequisites
1. Ensure Node.js (v18 or higher) is installed.
2. Ensure dependencies are installed:
   ```bash
   npm install
   ```

## Starting the MCP Server
To start the MCP server locally:
```bash
npm run mcp
```

---

## 1. Claude Desktop Configuration
To load the server in Claude Desktop, edit your `claude_desktop_config.json` file.

* **File Location**:
  * **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
  * **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

* **Configuration**:
  Add the following entry under the `mcpServers` object (ensure you replace the path with your actual absolute path if it changes):
  ```json
  {
    "mcpServers": {
      "marketing-os-mcp": {
        "command": "node",
        "args": [
          "C:\\Users\\prabh\\.gemini\\antigravity\\scratch\\marketing-os\\mcp-server.js"
        ]
      }
    }
  }
  ```

---

## 2. Cursor Configuration
To add the MCP server in Cursor:
1. Open Cursor Settings (**Ctrl+,** or **Cmd+,**).
2. Navigate to **Features** -> **MCP**.
3. Click **+ Add New MCP Server**.
4. Fill in the following details:
   * **Name**: `marketing-os`
   * **Type**: `command`
   * **Command**: `node C:\Users\prabh\.gemini\antigravity\scratch\marketing-os\mcp-server.js`
5. Click **Save**.

---

## 3. ChatGPT Configuration (Custom GPTs / Actions)
Since ChatGPT runs in the cloud, it cannot connect to your local environment directly. The HTTP gateway (`mcp-http-gateway.js`) exposes your local marketing OS as a standard REST API.

### Step 1: Run the local HTTP Gateway
Start the HTTP gateway server on port `3000` (make sure you run this from your project root):
```bash
node mcp-http-gateway.js
```

### Step 2: Establish a Secure Public Tunnel
Expose the local server to the cloud using `ngrok` (download and install `ngrok` if not already installed):
```bash
ngrok http 3000
```
Copy the forwarding HTTPS URL generated (e.g., `https://a1b2-cd34.ngrok-free.app`).

### Step 3: Create a Custom GPT in ChatGPT
1. Log in to ChatGPT and click on your profile/workspace name -> **My GPTs** -> **Create a GPT**.
2. Go to the **Configure** tab.
3. Scroll down and click **Create new action**.
4. In the **Authentication** section:
   - Select **None** (for simple local testing), OR
   - Select **API Key** -> Auth Type **Custom** -> set Header Name to `Authorization` and set a secret token. *(Note: If you use an API Key, ensure you edit `mcp-http-gateway.js` to validate the header token).*
5. In the **Schema** box, copy and paste the contents of [chatgpt-openapi.json](file:///C:/Users/prabh/.gemini/antigravity/scratch/marketing-os/chatgpt-openapi.json).
6. **CRITICAL**: Replace `"url": "https://YOUR_TUNNEL_SUBDOMAIN.ngrok-free.app"` in the schema with your actual `ngrok` forwarding HTTPS URL from Step 2.
7. Under **Privacy Policy**, paste any valid URL (e.g. `https://yourdomain.com/privacy` or your ngrok URL).
8. Save the Action and publish the Custom GPT (either "Only me" or "Anyone with a link").


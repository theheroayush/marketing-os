const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const serverPath = path.join(__dirname, '..', 'mcp-server.js');
console.log(`Starting MCP server at: ${serverPath}`);

const server = spawn('node', [serverPath], {
  cwd: path.join(__dirname, '..'),
  env: process.env
});

let stdoutBuffer = '';
const pendingRequests = new Map();
let messageId = 1;

server.stderr.on('data', (data) => {
  console.log(`[Server Stderr]: ${data.toString().trim()}`);
});

server.on('exit', (code) => {
  console.log(`Server exited with code ${code}`);
  if (code !== null && code !== 0) {
    process.exit(1);
  }
});

function sendRequest(method, params) {
  const id = messageId++;
  const requestObj = {
    jsonrpc: '2.0',
    id,
    method,
    params
  };
  const jsonStr = JSON.stringify(requestObj) + '\n';
  console.log(`[Client -> Server]: Sending ${method} (id: ${id})`);
  server.stdin.write(jsonStr);
  return new Promise((resolve, reject) => {
    pendingRequests.set(id, { resolve, reject });
  });
}

function sendNotification(method, params) {
  const notificationObj = {
    jsonrpc: '2.0',
    method,
    params
  };
  const jsonStr = JSON.stringify(notificationObj) + '\n';
  console.log(`[Client -> Server]: Sending Notification ${method}`);
  server.stdin.write(jsonStr);
}

server.stdout.on('data', (chunk) => {
  stdoutBuffer += chunk.toString();
  let newlineIndex;
  while ((newlineIndex = stdoutBuffer.indexOf('\n')) !== -1) {
    const line = stdoutBuffer.substring(0, newlineIndex).trim();
    stdoutBuffer = stdoutBuffer.substring(newlineIndex + 1);
    if (line) {
      try {
        const response = JSON.parse(line);
        console.log(`[Server -> Client]: Received message (id: ${response.id})`);
        if (response.id && pendingRequests.has(response.id)) {
          const { resolve, reject } = pendingRequests.get(response.id);
          pendingRequests.delete(response.id);
          if (response.error) {
            reject(response.error);
          } else {
            resolve(response.result);
          }
        }
      } catch (err) {
        console.error('Failed to parse line from stdout:', line, err);
      }
    }
  }
});

async function runTests() {
  try {
    // 1. Send initialize request
    console.log('\n--- Test 1: Initialize Handshake ---');
    const initResult = await sendRequest('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: {
        name: 'mcp-test-client',
        version: '1.0.0'
      }
    });
    console.log('Initialize Result keys:', Object.keys(initResult));
    console.log('Protocol Version:', initResult.protocolVersion);
    if (initResult.protocolVersion !== '2024-11-05') {
      throw new Error(`Unexpected protocol version: ${initResult.protocolVersion}`);
    }

    // 2. Send initialized notification
    sendNotification('notifications/initialized');

    // 3. List tools
    console.log('\n--- Test 2: List Tools ---');
    const toolsResult = await sendRequest('tools/list', {});
    console.log('Available Tools:', toolsResult.tools.map(t => t.name));
    const toolNames = toolsResult.tools.map(t => t.name);
    const expectedTools = ['get_product_context', 'list_skills', 'execute_marketing_skill'];
    for (const tool of expectedTools) {
      if (!toolNames.includes(tool)) {
        throw new Error(`Missing expected tool: ${tool}`);
      }
    }
    console.log('SUCCESS: All expected tools are registered!');

    // 4. Get product context
    console.log('\n--- Test 3: Get Product Context ---');
    const contextResult = await sendRequest('tools/call', {
      name: 'get_product_context',
      arguments: {}
    });
    console.log('Get Product Context Result Content:', contextResult.content);
    if (contextResult.isError) {
      throw new Error(`get_product_context failed: ${contextResult.content[0].text}`);
    }
    const contextData = JSON.parse(contextResult.content[0].text);
    console.log('Loaded Product Name:', contextData.profile.name);
    if (contextData.profile.name !== 'Acme Corp') {
      throw new Error(`Unexpected product name in context: ${contextData.profile.name}`);
    }
    console.log('SUCCESS: Product context read successfully!');

    // 5. List skills
    console.log('\n--- Test 4: List Skills ---');
    const skillsResult = await sendRequest('tools/call', {
      name: 'list_skills',
      arguments: {}
    });
    const skillsList = JSON.parse(skillsResult.content[0].text);
    console.log(`Total skills retrieved: ${skillsList.length}`);
    if (skillsList.length !== 39) {
      throw new Error(`Expected 39 skills, got ${skillsList.length}`);
    }
    console.log('First skill in list:', skillsList[0]);
    console.log('SUCCESS: 39 skills retrieved successfully!');

    // 6. Execute marketing skill
    console.log('\n--- Test 5: Execute Marketing Skill ---');
    const execResult = await sendRequest('tools/call', {
      name: 'execute_marketing_skill',
      arguments: {
        skillId: 'copywriting',
        userInput: 'Write a landing page headline for Acme Corp anvils'
      }
    });
    console.log('Execute Result Content snippet:', execResult.content[0].text.substring(0, 300));
    if (!execResult.content[0].text.includes('Acme Corp makes high-quality anvils')) {
      throw new Error('Execute result did not include product context!');
    }
    if (!execResult.content[0].text.includes('Write a landing page headline')) {
      throw new Error('Execute result did not include user input request!');
    }
    console.log('SUCCESS: Marketing skill executed and prompt assembled correctly!');

    console.log('\n=========================================');
    console.log('ALL MCP SERVER TESTS PASSED SUCCESSFULLY!');
    console.log('=========================================');
    
    server.kill();
    process.exit(0);
  } catch (err) {
    console.error('Test run failed with error:', err);
    server.kill();
    process.exit(1);
  }
}

setTimeout(runTests, 1000);

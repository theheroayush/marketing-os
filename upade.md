# Project Update Journal — Marketing OS (MarkU)

## 📌 Project Overview
MarkU is an AI Marketing OS client-side application designed to run on the web and as a hybrid app (via Capacitor). It offers a suite of marketing skills (39 in total) ranging from SEO, CRO, copywriting, and outreach, to growth and analytics strategy.

### Core Stack
- **Frontend Core**: Semantic HTML5, CSS custom properties (variables), Tailwind CSS CDN.
- **Application Logic**: Vanilla JavaScript (`app.js`), modular skills metadata (`skills-data.js`).
- **Hybrid Native Wrappers**: Capacitor for packaging into Android/iOS applications.
- **Service Worker**: PWA support (`sw.js`) for offline caching of app shell assets.

---

## 🛠️ Resolved Issues & Fixes

### 1. Blank Screen Rendering Bug (Fixed)
- **Issue**: The application rendered as a blank screen in browser environments. 
- **Cause**: In `index.html`, a missing `</style>` closing tag inside the head section caused the browser to parse all subsequent HTML elements (including the body and app scripts) as part of the CSS stylesheet block.
- **Resolution**: Inserted the missing `</style>` tag on line 91 of `index.html`.
- **Status**: Checked and verified; page now renders correctly, sidebar navigation functions, and the dashboard widgets display as expected.

---

### 3. Glassmorphic Chat Bubbles (Fixed/Implemented)
- **Design Upgrade**: Redesigned the chat message bubbles to feature gradient-filled user messages with drop shadows, and translucent glassmorphism bases for assistant messages featuring high blur backdrop-filter (`blur(20px)`), delicate borders (`var(--border)`), and premium styling using the Outfit font.
- **Status**: Implemented in `app.js` and ready for build.

### 4. Cross-Platform Android Build Sync (Fixed/Implemented)
- **Progress**: Cleaned Gradle build cache successfully to resolve corrupted transforms cache metadata issues. Built the native Android package (`BUILD SUCCESSFUL` in 4m 2s) and deployed/launched the debug APK on `emulator-5554` under package `com.aiagencymarketing.marku`. Verified rendering successfully.

### 5. UI/UX Refinement and Visual Bug Fixes (Fixed/Implemented)
- **Design & Layout Polish**:
  1. **Desktop Double Header Overlap**: Added `.app-header { display: none !important; }` inside the desktop media query block in `styles.css` to hide the mobile header on viewport widths >= 1024px, eliminating duplicate headers.
  2. **Sidebar Logo Alignment**: Removed `margin-bottom` from `.sidebar-logo-img` to align the logo image and brand text vertically.
  3. **Mobile Workspace Switcher Card**: Replaced inline flex styling with `.project-switcher` classes. Stacks vertically on mobile (providing full width for dropdowns) and switches to row layout on desktop viewports.
  4. **Interactive Quick Actions & Bento Cards**: Connected "Create Post" to the Social Content skill, "New Strategy" to the Skills Hub, and "Performance" to the Analytics view. Wired Bento cards to navigate to the Campaigns view.
  5. **Premium UI Polish**: Added glassmorphic glows (`.dashboard-card`) and hover translations/shadows to dashboard cards and quick action buttons.
- **Status**: Implemented in `styles.css` and `app.js`, packaged via web build and verified with Capacitor native sync.

### 6. Missing renderQuickSkill Runtime Exception (Fixed)
- **Issue**: Navigating away from the dashboard to Content, Campaigns, or Analytics views crashed the application immediately with `ReferenceError: renderQuickSkill is not defined`.
- **Cause**: Function was referenced but never declared in `app.js`.
- **Resolution**: Defined the `renderQuickSkill(id, name, tagline, emoji, color)` function in `app.js` using translucent glassmorphism styles (`rgba(255,255,255,0.05)`) and thin glowing borders (`1px solid var(--border)`).
- **Status**: Checked and verified; web build completed successfully and synced to Capacitor Android project.

---

## 🎨 UI/UX Refinement Plan (Proposed)

An audit of `index.html`, `styles.css`, and `app.js` revealed several layout misalignment issues and opportunities for premium design polish:

### Proposed Fixes & Adjustments:
1. **Desktop Double Header Overlap**: Hide `.app-header` on viewport widths $\ge 1024\text{px}$ using CSS media queries. This eliminates header duplication on desktop screens.
2. **Sidebar Logo Alignment**: Remove the bottom margin from `.sidebar-logo-img` and add it to the parent `.sidebar-logo` container instead. This aligns the branding logo and the text horizontally.
3. **Mobile Workspace Switcher Card**: Replace inline flex row styles in `app.js` with responsive classes (`.project-switcher`). On mobile views, the switcher elements stack vertically to give the dropdown selection field full width.
4. **Interactive Quick Actions**: Hook up the dashboard's "Quick Action" buttons to transition to their respective app paths rather than being static placeholders.
5. **Premium Glassmorphic Highlights**: Add soft hover border glows, backdrop saturations, and fluid transistions to dashboard cards and navigation items.

### Benefits:
- Restores clean, professional layouts on desktop and mobile viewports.
- Reclaims vertical space and eliminates layout overlays.
- Standardizes styling away from inline JavaScript injections.
- Elevates product look-and-feel with premium glassmorphism.

### Drawbacks/Consequences:
- Standard CSS changes with backward compatibility, representing zero risk.


---

## 🌐 Git & CI/CD Operations Design

### 1. Git Repository & Branching Status (Inspected)
* **Remote Repository**: `https://github.com/theheroayush/marketing-os.git` (origin)
* **Primary Branch**: `main` (tracks `origin/main`)
* **Active Branch Patterns on Remote**:
  - `bolt/*` (Feature and search optimizations)
  - `palette/*` (UI/UX design and accessibility upgrades)
  - `sentinel/*` (Security patches and XSS fixes)
  - `jules/*` (Developer-specific branch logs)
* **Existing Workflows**: Implemented `.github/workflows/ci.yml` (automated build and Capacitor sync verification).
* **Workspace Status**: Modified files exist in working directory (`app.js`, `index.html`, `package.json`, `styles.css`).

---

### 2. Implemented CI/CD Setup (`.github/workflows/ci.yml`)
To ensure build integrity and cross-platform native syncing before code integration:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-sync:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Repository
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: 20
        cache: 'npm'

    - name: Install Dependencies
      run: npm ci || npm install

    - name: Run Web Build
      run: npm run build

    - name: Verify Web Build Artifacts
      run: |
        if [ ! -d "dist" ]; then
          echo "Error: 'dist' directory not generated by build.js!"
          exit 1
        fi
        if [ ! -f "dist/index.html" ] || [ ! -f "dist/app.js" ] || [ ! -f "dist/styles.css" ]; then
          echo "Error: Missing critical assets in the dist/ folder!"
          exit 1
        fi

    - name: Capacitor Sync Validation
      run: |
        npx cap sync android
```

---

### 3. Remote Syncing & Release SOP
Follow this Standard Operating Procedure (SOP) for team alignment and code promotions:

#### **A. Code Pulling & Syncing**
1. Before starting a development session, always pull latest from `main`:
   ```bash
   git checkout main
   git pull origin main
   ```
2. Create feature/bugfix branches off the latest `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

#### **B. Local Verification**
1. Test and build your code locally before pushing:
   ```bash
   npm run build
   ```
2. Verify Capacitor config synchronization:
   ```bash
   npx cap sync android
   ```

#### **C. Creating & Merging PRs**
1. Push branch to remote repository:
   ```bash
   git push origin feature/your-feature-name
   ```
2. Open a Pull Request targeting `main`.
3. Ensure the CI build validation pipeline succeeds.
4. Squash and merge after review to maintain clean Git history.

---

### 4. Git Release Coordination Checklist
Before pushing local changes to the remote repository, execute this checklist to guarantee alignment and safety:

- [ ] **1. Pre-Staging Verification**:
  * Run local web build and ensure compilation succeeds without errors:
    ```bash
    npm run build
    ```
  * Verify Capacitor config synchronization compiles correctly:
    ```bash
    npx cap sync android
    ```
- [ ] **2. Staging & Tracking**:
  * Track and stage all modified and untracked files:
    ```bash
    git add app.js index.html package.json styles.css build.js update.md upade.md .github/workflows/ci.yml
    ```
- [ ] **3. Commit Creation**:
  * Commit the staged files using structured, semantic commit messages:
    ```bash
    git commit -m "feat: implement CI/CD workflow, build scripts, and release coordination SOP"
    ```
- [ ] **4. Upstream Synchronization Check**:
  * Fetch and rebase to prevent integration conflicts:
    ```bash
    git fetch origin
    git rebase origin/main
    ```
- [ ] **5. Remote Promotion**:
  * Push to the remote origin:
    ```bash
    git push origin main
    ```
    *(Note: If direct push to `main` is protected by branch rules, push to a tracking release branch, e.g., `release/v1.0.3`, and open a Pull Request).*

---

## 🚀 Proposed Roadmap: MarkU Headless & Closed-Loop Execution OS

### 1. Executive Summary & Value Proposition
MarkU is transitioning from a client-side chat app into a headless marketing execution and optimization platform. In addition to MCP & UCP connectors linking MarkU's product context to Cursor/Claude/ChatGPT, we are adding:
- **Execution & Automation Layer**: Scheduled social posting (LinkedIn, X, Facebook), automated email sequence delivery (SMTP, Resend, SendGrid), and direct paid ad injections (Meta & Google Ads).
- **Built-in CRM & Lead Hub**: Visual Kanban lead tracking and automated outreach coordination.
- **Closed-Loop Feedback Loops**: Auto-collection of outreach analytics (clicks, conversions, CTR) to dynamically optimize prompt generation weights and copywriting profiles in MarkU's backend database.
- **Cost Offloading**: Users leverage their existing $20/month flat-rate chat subscriptions (ChatGPT Plus, Claude Pro, Cursor Pro) to run audits and execution via MCP/UCP. They pay **₹0** in pay-per-token API developer fees.

### 2. Architecture Overview
- **Connectors**: Local MCP (stdio JSON-RPC) for local editors/Claude Desktop, and Cloud UCP (REST/OpenAPI spec via Express.js/Vercel) for ChatGPT Custom GPT integrations.
- **Offloaded Inference**: Headless connections offload prompt generation to subscription client containers, keeping token costs at zero.
- **Execution**: Background queues (BullMQ) triggering social schedules and email drip sequences.
- **Continuous Optimization**: Nightly validation checks processing conversion data and updating AI prompt modifiers to scale winning copywriting patterns.

### 3. Monetization Strategy (in ₹)
- **Local Solo (Free)**: Local MCP connector + local context profiles. (₹0)
- **MarkU Pro (Solo Execution)**: Syncing workspaces + cloud UCP + basic automation (up to 1,000 cold emails/month). (₹999/month or ₹9,990/year)
- **MarkU Teams (Scale Execution & CRM)**: Enterprise brand management, unlimited social/email execution, visual Kanban CRM, and closed-loop optimization loops. (₹2,999/user/month or ₹29,990/year)

### 4. Cost-Efficiency & Zero-Infrastructure MVP Hosting
To enable ₹0 operational overhead for the MVP launch, MarkU leverages a serverless, subscription-driven topology:
- **Static PWA Frontend**: Hosted on **Vercel's global CDN (Free/Hobby tier)** with zero hosting cost.
- **UCP Middleware**: Deployed as serverless/edge routing functions on **Vercel Edge Functions**, scaling down to zero when inactive.
- **Edge Database**: Backed by **Neon PostgreSQL Serverless Free Tier** (0.5 GiB, dynamic compute auto-sleep).
- **Bring Your Own Key (BYOK)**: Supports client-side custom API keys in the client app as a backup, while recommending headless subscriptions for high-volume tasks.

### 5. Implementation Phases & Milestones
- **Phase 1: Local MCP Server (Weeks 1-3) — Cost: ₹1,50,000**
  - Stdio connector using `@modelcontextprotocol/sdk`. Exposes core resources.
- **Phase 2: Cloud Sync & UCP REST API (Weeks 4-7) — Cost: ₹2,50,000**
  - Express.js backend hosted on Vercel with Neon PostgreSQL database + sync daemon.
- **Phase 3: Execution Layer — Social Media & Email APIs (Weeks 8-11) — Cost: ₹3,50,000**
  - LinkedIn, X, Facebook posting APIs, background workers for Resend/SendGrid drip sequences.
- **Phase 4: Execution Layer — Paid Ad Triggers (Weeks 12-13) — Cost: ₹1,50,000**
  - Direct campaign integration with Meta Ads and Google Ads.
- **Phase 5: Lead Hub & CRM Pipeline (Weeks 14-16) — Cost: ₹2,00,000**
  - Visual prospect tracking, intake webhooks, and AI follow-up generators.
- **Phase 6: Closed-Loop Analytics & Optimization (Weeks 17-19) — Cost: ₹3,00,000**
  - Tracking telemetry, DB aggregations, and reinforcement-style context adjustments.
- **Phase 7: Security Audit, Documentation & GTM (Weeks 20-22) — Cost: ₹2,00,000**
  - GDPR audit, OAuth credential scoping, optimization of Vercel/Neon free-tier limits, and launch guides.

**Total Budget**: ₹16,00,000 | **Total Timeline**: 22 Weeks

### 6. Risks & Mitigations
- **PII Storage / GDPR**: Implement zero-knowledge databases for leads, providing instant export/delete options.
- **API deprecations**: Wrap social/ads handlers in clean adapter patterns to protect from upstream spec updates.
- **Ad Budget Abuse**: Limit ads triggers to drafts. Require manual confirmation in the PWA prior to any budget deployment.
- **Optimization Bias**: Implement statistical significance thresholds before letting telemetry rewrite context prompts.

---
## 🛠️ Phase 1 Complete: Local MCP Server Implementation
We have successfully implemented and completed **Phase 1: Local MCP Server** to allow external LLMs (Claude Desktop, Cursor, VS Code, ChatGPT) to connect directly to MarkU.

### 🌟 Exposed Tools & Functions
1. **`get_product_context`**
   - **Purpose**: Reads `marku-context.json` from the active directory and exposes the active product positioning, target audience, and context details.
   - **Output**: JSON string containing active profile positioning data.
2. **`list_skills`**
   - **Purpose**: Exposes metadata (ID, name, category, tagline, description) of all 39 marketing skills.
   - **Output**: JSON array of available skills.
3. **`execute_marketing_skill`**
   - **Purpose**: Accepts a `skillId` and `userInput`, loads the active product context, combines the skill's specific system prompt instructions with the context and user request, and outputs a formatted execution prompt.
   - **Output**: The combined prompt payload for execution in the LLM.

### ⚙️ Code Changes
- **`mcp-server.js`**: Created Node stdio-based server using `@modelcontextprotocol/sdk` to export the tools.
- **`skills-data.js`**: Modified the exports block at the end of the file to support conditional loading in both Node.js (CommonJS `module.exports`) and browser global window space.
- **`package.json`**: Configured `"mcp": "node mcp-server.js"` scripts for startup execution.

### 🎨 Sprint Update: Mobile Navigation Polish, Visual Alignment, & MCP Settings Card Integration (Completed)

To address layout alignment bugs and complete the client-side integration of Phase 1 (MCP), we have performed the following UI/UX and logic enhancements:

#### 1. Mobile Bottom Navigation Polish
- **Issue**: Under screen widths ≤ 480px (typical mobile screens), the bottom navigation bar buttons wrapped their labels, causing layouts to stack vertically, overlap content, or exceed screen height.
- **Resolution**: Added CSS media queries to `styles.css` targeting `max-width: 480px` to resize `.bottom-nav` padding, and set `.nav-item` minimum width from `50px` to `40px`. Locked navigation label wrapping with `white-space: nowrap;` and optimized font scaling.

#### 2. Header and Dashboard Clean-ups
- **Header Action Flexing**: Added `.header-actions { display: flex; align-items: center; gap: 8px; }` to `styles.css` to ensure action icons inside the header align horizontally on mobile.
- **Title Layout Polish**: Updated `.view-title` in `styles.css` to render with a premium white-to-dim text gradient, providing modern contrast against the dark background.
- **Dashboard Overlap Fix**: Removed the inline `-20px` negative margin from the profile switcher section in `app.js` to prevent the profile card from overlapping the dashboard view title.

#### 3. Settings View: Dedicated MCP Integration Panel
- **New Feature Card**: Injected a dedicated glassmorphic card within the Settings view (after the Appearance panel) titled "MCP Integration". It explains the purpose of the Model Context Protocol server.
- **Download Handler**: Integrated the `app.exportMcpConfig()` method which reads the active brand positioning profile, builds a JSON payload (`marku-context.json`), and downloads it directly to the user's workspace.
- **Header Action Button**: Replaced duplicate settings triggers with a clean backup & settings export layout on the history section header.

#### 4. Build and Synchronization Validation
- **Local Web Build**: Successfully compiled static resources to the `dist/` directory via `npm run build`.
- **Native Synchronization**: Synchronized the new static production assets with the native Android shell via `npx cap sync android`.

### 🧪 QA Verification Results (Verified & Signed Off)
- **Automated Handshake**: Checked and verified standard stdio transport JSON-RPC 2.0 handshake using a custom client script (`scratch/test-mcp.js`). Correctly returns protocol version `2024-11-05`.
- **Tool Discovery**: Confirmed all 3 tools are correctly registered:
  - `get_product_context`: Exposes `marku-context.json` active profile context.
  - `list_skills`: Lists all 39 marketing skills metadata cleanly.
  - `execute_marketing_skill`: Successfully builds combined prompt payload from active context, skill system instructions, and user request.
- **Environment Compatibility**: Confirmed that `skills-data.js` updates do not cause browser crashes or console warnings under standard PWA environments, while exporting properly in Node.js modules.
- **Settings Card Integration**: Verified that the settings view successfully renders the new MCP Integration card, and the download action successfully generates and downloads `marku-context.json`.
- **Rupee Formatting**: Confirmed that Indian Rupee formatting is correctly preserved as `₹` in context loads.
- **Cross-Platform Sync**: Cleaned the android assets folder and ran `npx cap sync android` successfully without any compile issues or build conflicts.

### 🚀 Next Steps
- Stage and commit the local changes (`README_MCP.md`, `mcp-server.js`, `qa_report.md`, `scratch/test-mcp.js`, `chatgpt-openapi.json`).
- Promote changes to Git and build/sync the android app workspace.

---

## 🤖 ChatGPT Custom GPT Actions Integration (Added)
- **Feature**: Added support for connecting ChatGPT Custom GPTs to the local Marketing OS HTTP gateway via OpenAPI and ngrok.
- **Artifacts Created**:
  - `chatgpt-openapi.json`: Standard OpenAPI 3.1.0 schema documenting `/get_product_context`, `/list_skills`, and `/execute_marketing_skill`.
- **Documentation Updated**:
  - Expanded `README_MCP.md` with step-by-step instructions for tunnel routing (`ngrok http 3000`), Custom Action credential configuration, and OpenAPI schema loading.

### 📝 Simplified Instructions Explained (Log)
- Provided a highly simplified, clear step-by-step tutorial to guide the user in setting up their Custom GPT with the local HTTP gateway and ngrok connection.

### 🌐 Vercel Deployment Decision (Log)
- Analyzed deploying the HTTP gateway on Vercel. Decided that for **Phase 1 (Local MVP)**, local execution with `ngrok` is preferred because the gateway reads local files (`marku-context.json`).
- Recommended waiting until **Phase 2 (Cloud Sync & REST DB)** to deploy on Vercel, when a serverless PostgreSQL database (Neon) will store the context centrally, allowing ChatGPT to access it 24/7 without needing a local laptop to be on.





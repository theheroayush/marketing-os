# MarkU Cloud Deployment Guide (Phase 2 & 3)

This guide shows you how to deploy the MarkU Marketing OS API to Vercel (running serverless) backed by a Neon serverless PostgreSQL database. This allows ChatGPT Custom GPT Actions to run 24/7 even when your laptop is turned off.

---

## Prerequisites
1. A **GitHub** account.
2. A **Vercel** account (free Hobby tier).
3. A **Neon.tech** account (free tier).

---

## Step 1: Create Your Neon PostgreSQL Database
1. Log in to [Neon](https://neon.tech/).
2. Create a new project (e.g. `marku-db`).
3. Select **PostgreSQL 16** (or default) and the region closest to you.
4. Copy the connection string provided in your Dashboard. It will look like:
   `postgresql://[user]:[password]@[host]/neondb?sslmode=require`
5. Save this URL. You will use it in Vercel.

---

## Step 2: Push Your Code to GitHub
Ensure all your local changes (including `cloud/index.js`, `vercel.json`, and the updated `package.json`) are committed and pushed to your GitHub repository:
```bash
git add .
git commit -m "feat: add cloud database and vercel serverless support"
git push origin main
```

---

## Step 3: Deploy to Vercel
1. Log in to [Vercel](https://vercel.com/).
2. Click **Add New** -> **Project**.
3. Import your GitHub repository (`marketing-os`).
4. In the **Configure Project** screen:
   - Expand the **Environment Variables** section.
   - Add a new variable:
     - **Name**: `NEON_DATABASE_URL`
     - **Value**: *[Paste your Neon connection string from Step 1]*
5. Click **Deploy**.
6. Vercel will build your Express app and deploy it. In less than 1 minute, you will get a production URL like `https://marketing-os-three.vercel.app`.

---

## Step 4: Update Your Custom GPT Action
1. Copy the Vercel production URL.
2. Edit your OpenAPI schema [chatgpt-openapi.json](file:///C:/Users/prabh/.gemini/antigravity/scratch/marketing-os/chatgpt-openapi.json):
   - Replace the `servers.url` value with your Vercel production URL:
     ```json
     "servers": [
       {
         "url": "https://marketing-os-three.vercel.app",
         "description": "MarkU Cloud Gateway"
       }
     ]
     ```
3. Update the Action schema inside your Custom GPT in ChatGPT with this new configuration.
4. Now your GPT can read and write context 24/7!

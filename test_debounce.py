from playwright.sync_api import sync_playwright, expect
import time

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use mobile viewport to ensure bottom nav is visible
        context = browser.new_context(viewport={"width": 375, "height": 812})
        page = context.new_page()

        try:
            page.goto("http://localhost:3000/dist/index.html")

            # Wait for app to initialize and skills to render
            page.wait_for_selector(".quick-action-btn", timeout=5000)

            # Open a skill chat to see the header buttons
            page.evaluate("app.openSkill('social-content')")

            # Wait for header to appear
            page.wait_for_selector(".skill-header", timeout=5000)

            # Take screenshot of the chat view
            page.screenshot(path="/app/verification.png", full_page=True)
            print("Screenshot saved to /app/verification.png")

        finally:
            browser.close()

if __name__ == "__main__":
    verify_frontend()

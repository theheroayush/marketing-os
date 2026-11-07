from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Ensure we have the local files via a file URL, or start the server.
        # The file URI works well for vanilla web apps.
        page.goto("file:///app/dist/index.html")

        # Click on the start button if needed, or bypass welcome screen
        try:
            # Let's see if we are at Welcome, we can navigate directly using evaluate
            page.evaluate("app.navigate('skills')")
        except Exception:
            pass

        time.sleep(1) # wait for render

        # Try to type into the search box
        try:
            search_input = page.locator("#skills-search")
            search_input.fill("SEO")
            time.sleep(1)
        except Exception:
            pass

        page.screenshot(path="/home/jules/verification/verification.png")
        browser.close()

if __name__ == "__main__":
    run()

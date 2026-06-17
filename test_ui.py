import os
import time
from playwright.sync_api import sync_playwright

def run():
    os.system("mkdir -p /home/jules/verification/screenshots")

    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()

        # Load custom runner locally via file protocol which bypasses any HTTP blocks
        pwd = os.getcwd()
        page.goto(f"file://{pwd}/run_app_test.html", wait_until="load")
        time.sleep(2)

        has_app = page.evaluate("typeof window.app !== 'undefined'")
        print(f"App initialized: {has_app}")

        # Manually trigger navigation to dashboard
        page.evaluate("window.app.navigate('dashboard')")
        time.sleep(1)

        # Verify dashboard loaded
        title = page.evaluate("() => { const el = document.querySelector('.view-title'); return el ? el.innerText : null; }")
        print(f"Dashboard title: {title}")

        # Switch views to trigger state reads (history needs sessions)
        page.evaluate("window.app.navigate('history')")
        time.sleep(1)

        # Take a screenshot
        page.screenshot(path="/home/jules/verification/screenshots/bolt_opt.png")
        print("Screenshot taken.")

        context.close()
        browser.close()

if __name__ == "__main__":
    run()

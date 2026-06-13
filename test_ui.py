import time
import os
import glob
from playwright.sync_api import sync_playwright

def run():
    os.system("rm -rf /home/jules/verification")
    os.system("mkdir -p /home/jules/verification/videos /home/jules/verification/screenshots")

    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()

        # Intercept CDN requests to prevent timeouts
        page.route("**/cdn.tailwindcss.com*", lambda route: route.fulfill(status=200, body="window.tailwind = {};", content_type="application/javascript"))
        page.route("**/fonts.googleapis.com*", lambda route: route.abort())
        page.route("**/fonts.gstatic.com*", lambda route: route.abort())

        page.goto("http://localhost:3000/run_app_test.html", wait_until="networkidle")
        time.sleep(2)  # Wait for app init
        page.screenshot(path="/home/jules/verification/screenshots/verification.png")

        try:
            print("Is app defined?", page.evaluate("typeof window.app !== 'undefined'"))
        except Exception as e:
            print(f"Error during test: {e}")

        finally:
            context.close()
            browser.close()

    # print path to video
    videos = glob.glob("/home/jules/verification/videos/*.webm")
    if videos:
        print(f"Video saved to {videos[0]}")
    else:
        print("No video saved")

if __name__ == "__main__":
    run()

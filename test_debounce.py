import time
import os
from playwright.sync_api import sync_playwright

def run():
    # Make sure we have a fresh videos dir
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

        page.goto("http://localhost:3000/#skills", wait_until="networkidle")
        time.sleep(2)  # Wait for app init

        try:
            print("Is app defined?", page.evaluate("typeof window.app !== 'undefined'"))
            print("Is skills-search present?", page.evaluate('document.getElementById("skills-search") !== null'))

            if page.evaluate('document.getElementById("skills-search") !== null'):
                input_selector = "#skills-search"

                # Type some text to trigger search and debounce
                page.type(input_selector, "seo", delay=100) # Type slowly
                time.sleep(1) # wait for debounce

                # verify there are results
                cards = page.locator("#view-skills .card")
                count = cards.count()
                print(f"Number of cards matching 'seo': {count}")
                if count == 0:
                    print("ERROR: No cards found after search!")

                # Verify focus is preserved (the setTimeout in handleSearch)
                focused = page.evaluate("document.activeElement.id")
                print(f"Focused element ID: {focused}")

                # Verify the clear button
                page.click("button:has-text('×')")
                time.sleep(1) # wait for debounce / clear render

                cards = page.locator("#view-skills .card")
                new_count = cards.count()
                print(f"Number of cards after clear: {new_count}")

                if count < new_count:
                    print("Debounce test passed.")
                else:
                    print("Debounce test failed or clear search failed.")

            # Take screenshot
            page.screenshot(path="/home/jules/verification/screenshots/verification.png")
            page.wait_for_timeout(1000)

        except Exception as e:
            print(f"Error during test: {e}")

        finally:
            context.close()
            browser.close()

if __name__ == "__main__":
    run()

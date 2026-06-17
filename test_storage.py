from playwright.sync_api import sync_playwright
import time
import json

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:3000/run_app_test.html", wait_until="networkidle")

        # Test initial state
        has_cache = page.evaluate("typeof window.app !== 'undefined'")
        print(f"App defined: {has_cache}")

        # Simulate getting active profile (should use defaults and init cache)
        active_id = page.evaluate("() => { return localStorage.getItem('marku_active_profile'); }")
        print(f"Initial raw active profile: {active_id}")

        # Call the navigation logic to dashboard which triggers Storage methods
        page.evaluate("window.app.navigate('dashboard')")
        time.sleep(1)

        # Create a new profile
        page.evaluate("""
            window.modalTeam = ['test@example.com'];
            document.body.innerHTML += '<input id=\"modal-project-name\" value=\"Test Project\">';
            window.app.saveNewProfileFromModal();
        """)
        time.sleep(1)

        # Check localStorage to ensure cache was synced
        profiles_str = page.evaluate("() => { return localStorage.getItem('marku_profiles'); }")
        print(f"Profiles in localStorage: {profiles_str}")
        if profiles_str:
            profiles = json.loads(profiles_str)
            print(f"Number of profiles: {len(profiles)}")
            if len(profiles) > 1 and profiles[1]["name"] == "Test Project":
                print("Cache sync to localStorage SUCCESS")
            else:
                print("Cache sync to localStorage FAILED")

        browser.close()

if __name__ == "__main__":
    run()

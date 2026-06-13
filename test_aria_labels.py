import re
import os

# Function to parse raw HTML
def check_aria_labels():
    with open('index.html', 'r') as f:
        index_html = f.read()

    with open('app.js', 'r') as f:
        app_js = f.read()

    print("Testing index.html...")
    if 'aria-label="Search"' in index_html and 'aria-label="Notifications"' in index_html:
        print("✅ index.html has correct aria-labels")
    else:
        print("❌ index.html missing aria-labels")

    print("Testing app.js...")
    if 'aria-label="Export Customized PDF"' in app_js and 'aria-label="New Session"' in app_js and 'aria-label="Setup API Key"' in app_js:
        print("✅ app.js has correct aria-labels")
    else:
        print("❌ app.js missing aria-labels")

if __name__ == "__main__":
    check_aria_labels()

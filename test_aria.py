import time
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context()
        page = context.new_page()

        # Intercept CDN requests to prevent timeouts
        page.route('**/cdn.tailwindcss.com*', lambda route: route.fulfill(status=200, body='window.tailwind = {};', content_type='application/javascript'))
        page.route('**/fonts.googleapis.com*', lambda route: route.abort())
        page.route('**/fonts.gstatic.com*', lambda route: route.abort())

        page.goto('http://localhost:3000', wait_until='commit')
        page.wait_for_selector('.header-actions', timeout=5000)

        print('Search btn:', page.evaluate('''document.querySelector('button[aria-label="Search"]') !== null'''))
        print('Notifications btn:', page.evaluate('''document.querySelector('button[aria-label="Notifications"]') !== null'''))

        context.close()
        browser.close()

if __name__ == '__main__':
    run()

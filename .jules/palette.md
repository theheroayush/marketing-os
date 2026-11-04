## 2024-05-24 - Accessibility for Icon-only Buttons
**Learning:** Found multiple icon-only buttons missing `aria-label`s, which prevents screen readers from understanding the button's purpose. The icons themselves also didn't have `aria-hidden="true"`, causing screen readers to potentially read the ligature text (e.g. "search", "notifications", "close") unnecessarily.
**Action:** Always ensure icon-only buttons have an `aria-label` and the interior decorative elements (like Material Symbol spans) have `aria-hidden="true"` to prevent redundant screen reader announcements.

## 2023-10-02 - Icon-only buttons lack ARIA labels
**Learning:** Found multiple icon-only buttons in `app.js` using `.icon-btn` without `aria-label` attributes. This breaks accessibility for screen reader users as they hear "button" without context.
**Action:** Adding `aria-label` to these buttons to improve accessibility.

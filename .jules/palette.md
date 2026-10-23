## 2024-05-14 - Icon-only buttons with ligatures need `aria-hidden` on the icon span

**Learning:** When using Material Symbols ligatures (where the text content of the span is the icon name, like `<span class="material-symbols-outlined">search</span>`) inside an icon-only button with an `aria-label`, screen readers may redundantly read both the button's `aria-label` and the ligature text if the span isn't explicitly hidden.

**Action:** Always add `aria-hidden="true"` to the inner `<span>` element containing the material symbols ligature when it is inside an `aria-label`ed button or is otherwise purely decorative.

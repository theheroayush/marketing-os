# Design System: The Intelligent Luminary

## 1. Overview & Creative North Star

**Creative North Star: "The Digital Atelier"**
This design system moves away from the sterile, cold aesthetics of traditional AI to embrace the warmth of high-end consulting. It is designed to feel like a bespoke leather-bound planner or a private gallery—spaces where every detail is intentional, and intelligence is delivered with a human touch.

To achieve this, we reject the "template" look. We favor **intentional asymmetry**, where content isn't always perfectly centered but flows with an editorial rhythm. We utilize **tonal depth** instead of structural lines, creating a UI that feels "grown" rather than "built." By layering cream tones and soft gold accents, we establish a sense of "The Intelligent Luminary"—a guide that is authoritative yet approachable, sophisticated yet profoundly simple.

---

## 2. Colors

The palette is a sophisticated interplay of warmth and authority. It avoids the harshness of pure black and white in favor of a "printed" feel.

### The Palette
- **Core Background:** `surface` (#fef9f1) — A warm, expansive canvas.
- **Primary Accent:** `primary` (#904900) — A rich, earthy gold used for critical actions and brand moments.
- **Typography:** `on_surface` (#1d1c17) — A deep, "bitter chocolate" brown that provides high legibility without the sterile vibe of pure black.
- **Accents:** `tertiary` (#735735) — Used for supporting sophisticated elements.

### The "No-Line" Rule
Standard 1px borders are strictly prohibited for sectioning. We define boundaries through **chromatic shifts**. Use `surface_container_low` against `surface` to denote a new content area. If you feel the need to "draw a line," use a change in background color instead.

### Surface Hierarchy & Nesting
Think of the UI as sheets of fine handmade paper stacked atop one another:
1.  **Base:** `surface` (#fef9f1)
2.  **Raised Sections:** `surface_container_low` (#f8f3eb)
3.  **Active Cards/Modals:** `surface_container_lowest` (#ffffff)
4.  **Recessed Areas:** `surface_dim` (#ded9d2)

### The "Glass & Gradient" Rule
For floating mobile elements (like a bottom navigation bar or a sticky header), use **Glassmorphism**. Apply `surface_container_low` at 80% opacity with a `20px` backdrop blur. For primary CTAs, use a subtle linear gradient from `primary` (#904900) to `primary_container` (#b15f14) at a 135-degree angle to add a "burnished metal" luster.

---

## 3. Typography

The typography uses **Plus Jakarta Sans** to balance modern precision with open, friendly letterforms.

*   **The Heroic Display:** `display-lg` (3.5rem) is used sparingly for high-impact editorial statements. It should always have a tight letter-spacing (-0.02em) to feel "locked in."
*   **The Authoritative Headline:** `headline-md` (1.75rem) serves as the primary voice for AI-generated insights.
*   **The Narrative Body:** `body-lg` (1rem) is the workhorse. We prioritize line height (1.6) to ensure the agency’s advice feels readable and calm.
*   **The Technical Label:** `label-md` (0.75rem) in All Caps with +0.05em tracking is used for metadata, lending a "luxury watch" precision to the data.

---

## 4. Elevation & Depth

We move away from the "floating shadow" look of 2014 toward **Tonal Layering**.

*   **The Layering Principle:** A card should not "float" via a shadow; it should be revealed by being a lighter shade (`surface_container_lowest`) than the background beneath it.
*   **Ambient Shadows:** If a shadow is required for a floating action button, use a custom shadow: `0px 12px 32px rgba(29, 28, 23, 0.06)`. The tint is derived from our `on_surface` brown, not black, to maintain warmth.
*   **The "Ghost Border" Fallback:** For input fields or secondary containers, use a 1px border using `outline_variant` (#dac2b3) at **20% opacity**. It should be felt, not seen.
*   **Glassmorphism:** Use `surface_variant` with 60% opacity for overlays to create a "frosted vellum" effect that keeps the user grounded in their previous context.

---

## 5. Components

### Buttons
*   **Primary:** Filled with the gold gradient. Roundedness: `md` (0.375rem). No shadow.
*   **Secondary:** No fill. `Ghost Border` (outline-variant at 20%). Text in `on_surface`.
*   **Tertiary:** Text only, `title-sm` weight, with a `primary` gold underline (2px) offset by 4px.

### Cards & Lists
*   **The Golden Rule:** **No dividers.** Separate list items with `2.5` (0.85rem) of vertical white space or a subtle background shift to `surface_container_high`.
*   **Mobile-First Cards:** Use a `1.5` (0.5rem) internal padding and `lg` (0.5rem) corner radius.

### Input Fields
*   **Style:** Minimalist. No bottom line only; use a full enclosure with a `surface_container_low` fill and a `Ghost Border`. Focus state transitions the border to `primary` gold at 100% opacity.

### The "Consultant" Bottom Sheet
*   Since this is a high-end mobile app, use expansive bottom sheets for AI interactions. They should use `surface_container_lowest`, have a `xl` (0.75rem) top-only corner radius, and include a subtle `primary` gold drag handle.

---

## 6. Do's and Don'ts

### Do
*   **Use Asymmetry:** Place a headline on the left and a small supporting label on the far right to create an editorial feel.
*   **Embrace Margin:** Use the `8` (2.75rem) spacing token for screen gutters to let the content breathe.
*   **Tonal Transitions:** Use `surface_container` tiers to guide the eye from the general to the specific.

### Don't
*   **Don't use 100% Black:** It kills the warmth of the "Luminary" brand.
*   **Don't use "System" Blue for Links:** All interactive elements must stay within the gold/brown/cream spectrum.
*   **Don't use Hard Corners:** Avoid `none` or `sm` roundedness unless for very small labels. We want the UI to feel "soft-touch."
*   **Don't use 1px Dividers:** They create visual "stutter." Rely on the spacing scale to create separation.
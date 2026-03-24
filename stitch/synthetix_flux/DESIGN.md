# Design System Strategy: The Intelligent Luminary

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Intelligent Luminary."** 

We are moving away from the static, boxy layouts of traditional "SaaS" templates and moving toward a high-end editorial experience that feels alive. Because the brand is driven by AI, the UI must feel like a sentient partner—fluid, glowing, and deeply layered. We achieve this through **Intentional Asymmetry** and **Tonal Depth**. Instead of rigid grids, we use overlapping elements and varying surface heights to guide the eye, creating a "Mobile-First" experience that feels like an premium digital magazine rather than a database.

## 2. Colors & Surface Architecture
This system utilizes a "Deep Galactic" palette, where innovation is represented by light-emitting accents against a sophisticated, multi-dimensional dark void.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning. Structural definition must be achieved through background shifts. For example, a `surface-container-low` section should sit directly on a `surface` background to define its boundary. We define space through mass and tone, not lines.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of smoked glass. Use the `surface-container` tiers to define importance:
*   **Base Layer:** `surface` (#10062d)
*   **Secondary Content:** `surface-container-low` (#160b36)
*   **Primary Interactive Cards:** `surface-container` (#1c113f)
*   **Feature Callouts:** `surface-container-high` (#231649)

### The "Glass & Gradient" Rule
To capture the "AI Intelligence" vibe, use **Glassmorphism** for floating elements (e.g., Navigation bars, Modals). Use semi-transparent `surface-variant` colors with a `backdrop-blur` of 20px–40px. 
*   **Signature Textures:** Apply a subtle linear gradient to main CTAs transitioning from `primary` (#a3a6ff) to `primary-container` (#9396ff) at a 135-degree angle. This adds "visual soul" and a sense of energy.

## 3. Typography: Editorial Authority
The typography strategy pairs the technical precision of **Manrope** with the high-fashion, tech-forward personality of **Plus Jakarta Sans**.

*   **The Power Pair:** Use `display-lg` (Plus Jakarta Sans) for hero statements to convey bold intelligence. Pair this with `body-md` (Manrope) for dense marketing data to ensure maximum readability on small screens.
*   **Intentional Scale:** We utilize extreme contrast in scale. A `display-sm` headline sitting next to a `label-sm` metadata tag creates a sophisticated, editorial hierarchy that feels custom-built for high-end mobile devices.
*   **Boldness as Utility:** On mobile, use `title-lg` for all section headers to ensure "scannability" for the busy marketing executive.

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "heavy" for this aesthetic. We use **Tonal Layering** to convey lift.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. The subtle shift in hex code creates a soft, natural lift that mimics ambient light in a dark environment.
*   **Ambient Shadows:** If a "floating" element (like a FAB) requires a shadow, use a blur value of `32px` at `8%` opacity. The shadow color should be a tinted version of `on-surface` (#eae1ff), not pure black.
*   **The "Ghost Border" Fallback:** If accessibility requires a container boundary, use the `outline-variant` token (#4b426a) at **15% opacity**. Never use 100% opaque borders.
*   **Refraction:** For top-tier premium components, apply a `1px` top-border (inner stroke) using `primary` at 20% opacity to mimic the "rim light" found on glass edges.

## 5. Components: Fluid Primitives

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary-container`), `full` roundedness. No border.
*   **Secondary:** `surface-container-highest` fill with `on-surface` text. 
*   **States:** On `hover/press`, use `primary-dim` (#6063ee) to create a "pulsing" light effect.

### Input Fields
*   **Structure:** No bottom line. Use `surface-container-low` as the field background with `md` (0.75rem) rounded corners.
*   **Focus:** Transition the background to `surface-container-high` and apply a "Ghost Border" of `primary` at 30% opacity.

### Cards & Lists
*   **The "No-Divider" Rule:** Forbid 1px horizontal dividers. Use the Spacing Scale (specifically `8` or `2rem`) to create "Active Negative Space."
*   **AI Insight Cards:** Use `secondary-container` (#6f00be) as a subtle glow background for AI-generated suggestions, differentiating them from standard user data.

### Progress Indicators (The "Intelligence" Component)
*   **The Neural Loader:** Instead of a circular spinner, use a morphing organic shape (SVG) using the `tertiary` (#8ce7ff) color to represent the AI "thinking."

## 6. Do’s and Don’ts

### Do:
*   **Do** use `full` roundedness for interactive elements (buttons, chips) to maintain the "approachable" feel.
*   **Do** leverage the `secondary` (#c180ff) accent for "Success" or "AI-Active" states to represent innovation.
*   **Do** use the `16` (4rem) spacing token for top-level section padding to give the content room to breathe.

### Don't:
*   **Don't** use pure `#000000` for backgrounds; always use `surface` (#10062d) to maintain tonal depth.
*   **Don't** use traditional icons; use "Duotone" icons that utilize `primary` and `primary-container` to match the layered aesthetic.
*   **Don't** center-align long-form body text. Keep it left-aligned (flush left) to maintain the editorial grid's "spine."
# Design Guidelines for bunnycode.ai

## Design Approach
**Reference-Based Approach**: Inspired by o.xyz's minimal, high-contrast, futuristic aesthetic with cyberpunk sci-fi elements while maintaining clean, professional execution.

## Core Design Elements

### A. Typography
- **Headings**: Bold, geometric sans-serif (e.g., Space Grotesk, Rajdhani, Orbitron) with wide letter-spacing
- **Body**: Simple, clean sans-serif (e.g., Inter, DM Sans)
- **Main Title**: Massive scale, all caps "BUNNYCODE.AI" spanning nearly full width
- **Tagline**: Small uppercase text with tracking
- **Hierarchy**: Hero title → Section headings → Body text → Micro-copy

### B. Layout System
- **Spacing**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- **Hero**: Full viewport (100vh) with centered content
- **Sections**: Slim, clean sections with ample white space
- **Grid**: 3-column layout for service cards and timeline steps
- **Container**: max-w-7xl for main content areas

### C. Visual Effects & Atmosphere
- **Background**: Very light gray/white with faint vertical lines and subtle noise texture
- **Glitch Effects**: Chromatic aberration on main title (RGB split with offset shadows, slight horizontal distortion)
- **Scanlines**: Gentle animated overlay across hero section
- **Matrix Element**: Large, faint circular shape with binary digits/code at low opacity behind hero text
- **Animations**: Minimal glitch on title (tiny horizontal shifts, clipped sections every few seconds)

### D. Component Library

**Navigation Bar**:
- Thin, minimal fixed top bar
- Left: "bunnycode.ai" text logo
- Center: "SERVICES", "SHOWCASE", "ABOUT", "CONTACT" links
- Right: Small pill button "GET AUTOMATED"
- Hover: Slight letter-spacing increase with faint accent

**Hero Section**:
- Massive "BUNNYCODE.AI" wordmark with glitch treatment
- Tagline: "AI-NATIVE AUTOMATIONS FOR TEAMS THAT MOVE FAST."
- Bottom: Grayscale client logo row (rectangular placeholders with text labels)
- Caption: "TRUSTED BY TEAMS WORLDWIDE"

**Service Cards** ("What We Automate"):
- 3 columns: Sales & Lead Workflows, Internal Ops & Reporting, Content & Outreach Systems
- Subtle borders, hover lift animation, tiny glitch line effect on hover

**Timeline** ("How It Works"):
- Horizontal 3-step: "01 / Audit", "02 / Build", "03 / Optimize"
- Thin connecting lines, numbered labels, short descriptions

**CTA Section** ("Get Started"):
- Centered block with heading
- Solid button "BOOK A CALL" + ghost button "VIEW SHOWCASE"
- Hover: Small scale-up with glow shadow

**Footer**:
- Minimal layout on light background
- Left: "© bunnycode.ai"
- Right: "Privacy", "Contact" inline links

### E. Color Treatment
While colors are specified later, the design uses:
- High-contrast black/dark gray on very light backgrounds
- Accent colors for glitch effects only (neon blue, cyan, magenta, yellow)
- Grayscale for client logos
- Monochromatic base with strategic neon accents

## Images
**No hero background image** - instead use pure background with effects (noise, scanlines, vertical lines, matrix circle). Client logos are simple grayscale placeholders, not real brand assets.

## Responsive Behavior
- **Desktop**: Full glitch effects, wide wordmark, 3-column layouts
- **Mobile**: Stack navigation, reduce wordmark size (maintain glitch style), single column for cards and timeline, preserve minimal aesthetic
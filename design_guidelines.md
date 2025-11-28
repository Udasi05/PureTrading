# Pure Trading - Design Guidelines

## Design Approach
**Reference-Based Design**: Directly inspired by Funding Pips (fundingpips.com) with fintech-focused UI patterns. The design emphasizes trust, professionalism, and data-driven trading signals while maintaining accessibility for beginning traders.

## Core Layout System

**Spacing Primitives**: Use Tailwind units of 4, 8, 12, 16, and 24 for consistent rhythm (p-4, gap-8, py-12, mt-16, mb-24)

**Container Strategy**:
- Full-width hero sections with inner max-w-7xl containers
- Content sections: max-w-6xl centered
- Text-heavy sections: max-w-4xl for readability

## Typography Hierarchy

**Font Stack**: 
- Primary: Inter or Manrope (Google Fonts) - clean, modern sans-serif for fintech
- Accent: Space Grotesk for headings - bold, commanding presence

**Scale**:
- Hero headline: text-5xl md:text-6xl lg:text-7xl, font-bold
- Section headings: text-3xl md:text-4xl, font-bold
- Subsection titles: text-2xl, font-semibold
- Body text: text-base md:text-lg, font-normal, leading-relaxed
- Small text/labels: text-sm, font-medium
- Price displays: text-4xl md:text-5xl, font-bold (strikethrough price: text-2xl, opacity-50, line-through)

## Homepage Structure

**1. Hero Section** (h-screen min-h-[600px])
- Split layout: 60/40 text-to-visual ratio
- Left: Headline rotation through taglines ("Start New Forex Trading Journey", "Pass PropFirms Evaluation", etc.)
- Large CTA button (px-8 py-4 text-lg) with membership offer "Join at ₹9"
- Right: Trading dashboard mockup or chart visualization
- Trust indicators below CTA: "500+ Traders", "Daily Signals", "3 Sessions Coverage"

**2. Problem-Solution Grid** (py-24)
- 2-column layout (md:grid-cols-2 gap-12)
- Left column: Pain points ("Losing Streaks?", "Can't Pass Evaluations?", "No Market Vision?")
- Right column: Solutions with checkmark icons
- Each item: icon + heading (text-xl) + description (text-base)

**3. What You Get Section** (py-24)
- Prominent pricing card (max-w-md mx-auto)
- Strike-through ₹499 → highlighted ₹9 offer
- Bulleted list with icons:
  - 3 Premium Ebooks
  - Technical Analysis PDF (market structure, liquidity, swap & sweep)
  - Daily signals with lot sizes, entry/exit, risk management
  - Trade rationale for each signal
- Secondary CTA button

**4. Instruments Coverage** (py-16)
- 4-column grid (grid-cols-2 lg:grid-cols-4 gap-6)
- Cards for FX, Gold, Silver, Crypto
- Each card: large icon + instrument name + "Daily Analysis"

**5. Session Timeline** (py-24)
- Horizontal timeline or 3-column grid
- Asian, London, New York sessions
- Display session times + "Live Signals" badge
- Emphasize 24/7 coverage

**6. Telegram Integration** (py-16)
- 2-column split
- Left: Telegram icon + channel benefits
- Right: Screenshot mockup of signal format in Telegram
- Show sample signal structure: Instrument | Lot Size | Entry | TP/SL | Rationale

**7. Trust & Proof** (py-24)
- Economic calendar preview (embedded widget or static preview)
- Sources mentioned: Forex Factory, Investing.com
- "Trade Anywhere" section with icons: Office, Travel, Business - emphasizing ease

**8. Final CTA** (py-24)
- Centered, bold headline
- Large button with pricing
- Subtext: "No analysis stress. Just execute."

## Component Library

**Buttons**:
- Primary CTA: px-8 py-4 rounded-lg text-lg font-semibold, shadow-lg
- Secondary: px-6 py-3 rounded-lg text-base font-medium, border-2
- Buttons on images: backdrop-blur-md bg-white/20 border border-white/30

**Cards**:
- Border: border rounded-xl p-6 md:p-8
- Shadow: shadow-sm hover:shadow-xl transition-shadow
- Spacing: Internal padding p-6, gap-4 between elements

**Icons**: 
- Use Heroicons via CDN
- Size: w-8 h-8 for features, w-12 h-12 for section headers
- Placement: Icons left-aligned with text in features, centered above text in grid cards

**Price Display**:
- Container: Highlighted badge or card with subtle border
- Old price: line-through, reduced opacity, smaller text
- New price: Large, bold, positioned prominently
- Currency symbol: Same size as price, not superscript

**Navigation**:
- Sticky header (sticky top-0 z-50)
- Logo left, nav links center/right
- CTA button in header (smaller, px-4 py-2)
- Mobile: Hamburger menu with slide-in drawer

## Member Dashboard (Post-Purchase)

**Layout**: Sidebar + main content area
- Sidebar (w-64): Navigation to Ebooks, PDF, Signals, Calendar, Profile
- Main area: Dashboard cards showing today's signals, upcoming economic events, recent performance

**Signal Card Design**:
- Header: Instrument + Session badge
- Grid layout: Entry/Exit/SL in columns
- Lot size prominently displayed
- Rationale section with text-sm
- Timestamp and status indicator

## Images

**Hero Section**: 
- Trading chart/dashboard visualization showing multiple currency pairs
- Can be actual screenshot mockup or abstract financial graphics
- Position: Right side of hero, taking 40% width
- Alternative: Full-bleed background with overlay gradient

**Telegram Section**:
- Screenshot of Telegram channel showing formatted signal
- Mobile phone mockup displaying signal notification
- Position: Right column of Telegram integration section

**Instruments Icons**:
- Currency symbols for FX
- Gold bar icon for Gold
- Silver icon for Silver  
- Bitcoin/crypto symbol for Crypto

**Trust Badges**:
- No need for actual customer photos
- Use abstract icons or brand logos (Forex Factory, Investing.com) where mentioned

## Accessibility & Polish

- Focus states: 2px outline with offset on all interactive elements
- Form inputs: Consistent border, padding (px-4 py-3), rounded corners
- Error states: Red border + error message below input (text-sm)
- Loading states: Skeleton screens for dynamic content
- Responsive breakpoints: Mobile-first, md: 768px, lg: 1024px, xl: 1280px

## Animations

Minimal and purposeful:
- Hero CTA: Gentle pulse on page load (animate once)
- Hover states: Scale 1.05 transform for cards
- Page transitions: Fade in content (300ms ease)
- No scroll-triggered animations
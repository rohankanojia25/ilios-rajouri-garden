# ilios — Santorini on Ring Road (Rajouri Garden, New Delhi)

> **Greek/Mediterranean-inspired luxury rooftop lounge, kitchen & bar.**
> C-6/1, Ring Road, near Mayapuri Chowk Flyover, Mansarover Garden, Rajouri Garden, New Delhi 110015.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Lighthouse 95+](https://img.shields.io/badge/Lighthouse-95%2B-green?style=for-the-badge&logo=lighthouse&logoColor=white)](https://pagespeed.web.dev/)

---

## 🌟 Overview

**ilios** (meaning "sun" in Greek) is a premier luxury rooftop lounge and multi-cuisine restaurant located on Ring Road in Rajouri Garden, New Delhi. 

This repository contains the complete single-page, mobile-first, production-ready website built with vanilla HTML, inline CSS, and inline JavaScript with zero external runtime dependencies.

### Key Highlights
- **Direct WhatsApp Table Bookings**: Bypasses aggregator commissions (VenueLook, Sloshout, Zomato) with pre-filled encoded WhatsApp chat messages.
- **Dynamic IST Live Gig Engine**: Automatically computes and displays the next 4 real upcoming event dates in Indian Standard Time (`Asia/Kolkata`) from a recurring weekly schedule (Wed, Fri, Sat, Sun).
- **Tabbed Interactive Menu**: Configured from a single JavaScript object (`MENU_DATA`) for easy updates. Includes authentic green veg and red non-veg indicators.
- **VIP Table Preferences**: Visual cards for Arch Booths (4–6), Stage-side VIP (6–10), and Rooftop Santorini Corners (2–4).
- **Private Parties & Celebrations**: Direct event inquiry flow for birthdays, anniversaries, corporate mixers, and kitty parties.
- **Full Schema.org JSON-LD**: Rich local restaurant metadata with coordinates, opening hours, 4.7★ review count, and geo tags.

---

## 🎨 Design Direction

- **Palette**:
  - `--chalk: #F6F2EA` (Whitewashed plaster backgrounds)
  - `--aegean: #12355B` (Primary headings, text accents)
  - `--dome: #2F6FB5` (Santorini dome blue links and accents)
  - `--sun: #C9A15A` (Candlelight gold buttons, thin rules, sun motifs)
  - `--ink: #0B1626` (Night sections, live music calendar, footer)
- **Typography**: 
  - Display: *Cormorant Garamond* (Google Fonts)
  - Body: *Manrope* (Google Fonts)
- **Motifs**: Grecian arch frames (`border-radius: 160px 160px 16px 16px`), Greek meander (key) dividers, delicate sun marks, and starry night gradients.
- **Contrast**: WCAG AA compliant. Primary gold buttons strictly use dark ink (`#0B1626`) text for razor-sharp readability.

---

## 📱 Responsive & Mobile-First

- Tested seamlessly across: `360px`, `390px`, `430px`, `768px`, `1024px`, `1280px`, and `1440px`.
- Sticky bottom mobile action bar (`56px`) with 1-tap WhatsApp and Call buttons under `768px`.
- Zero horizontal overflow.
- `prefers-reduced-motion` compliance built-in.

---

## 🚀 Live Deployment via GitHub Pages

To host this website for free via GitHub Pages:
1. Navigate to **Repository Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select `Deploy from a branch`.
3. Choose branch `main` and folder `/ (root)`.
4. Click **Save**. The website will be live at `https://rohankanojia25.github.io/ilios-rajouri-garden/`.

---

## 📋 Owner Audit Checklist (`CONFIRM` / `REPLACE`)

Search for `CONFIRM` or `REPLACE` in `index.html` to update operational values:
- [ ] **WhatsApp & Phone**: Confirm `+91 70650 41400` as the primary reservation line.
- [ ] **Hours**: Verify 12:00 Noon – 12:00 Midnight timing.
- [ ] **Real Photos**: Swap Unsplash placeholders with real high-res interior and rooftop photos.
- [ ] **Menu Prices**: Confirm pricing in `MENU_DATA` array.
- [ ] **FSSAI License**: Enter 14-digit FSSAI license number in the footer.
- [ ] **Social Media**: Link official Instagram, Facebook, Zomato, and Swiggy handles.

---

## 📄 License

Proprietary © 2023–2026 ilios Lounge, Kitchen & Bar. All rights reserved.

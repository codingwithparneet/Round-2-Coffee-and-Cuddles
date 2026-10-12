# Coffee & Cuddles — Specialty Coffee House Website

A bespoke, calm, and minimalist website designed for **Coffee & Cuddles**, founded by **Digvijay Kaushal** (former Indian Foreign Service diplomat) and **Vaishnavi Sharma** (historian & photographer) on Rajpur Road, Dehradun.

---

## ☕ Design Philosophy & Palette

- **Palette**: Warm linen beige (`#FAF6F0`), oatmeal card surfaces (`#F3ECE1`), rich roasted coffee brown (`#764423`), and deep espresso charcoal (`#26201B`), accented with muted terracotta (`#A15538`) and mountain sage (`#6D7F66`).
- **Typography**: Editorial serif (*Playfair Display*) paired with clean, comfortable sans-serif (*Plus Jakarta Sans*).
- **Aesthetic**: Premium, unhurried, generous whitespace, inspired by independent literary reviews and Japanese kissatens.

---

## 🌟 Key Features & Requirements

1. **Header & Navigation**:
   - Monogram logo (`C&C`) and brand title.
   - Dynamic **"Today's Status" Badge** automatically calculating live Dehradun / IST operating hours (8:00 AM – 10:00 PM) with a gentle pulsing indicator.
   - Direct phone dialler action (`tel:+9198XXXXXXXX`) for mobile visitors.
   - **Light Beige & Dark Espresso Mode** toggle.

2. **Hero Section**:
   - Calm, confident greeting: *"Every cup, a different corner of the world"*.
   - Direct table reservation CTA and opening hours pill.

3. **Coffee of the Month**:
   - Editorial spotlight on the *Ethiopian Coffee Ceremony (Addis Ababa)*, honoring Digvijay & Vaishnavi's first posting in 2004.

4. **Our Story**:
   - The couple’s narrative in their own words: from JNU and late-night chai at Ganga Dhaba to 20 years across Addis Ababa, Rome, Hanoi, and Bogota, learning from growers in 60+ countries, and settling in Dehradun.
   - Photographed portraits for both founders.

5. **The Cafe at a Glance**:
   - Structured overview cards for location, hours, 40 seats (main room, window bar, terrace), in-house roasting, quiet atmosphere, and facilities.

6. **The Coffee Menu (Strictly No Prices)**:
   - All 21 coffees from the client brief across 8 categories:
     - *Espresso* (Espresso, Doppio, Americano, Ristretto)
     - *Espresso & Milk* (Cortado, Flat White, Cappuccino, Caffe Latte, Mocha)
     - *Signature* (Spanish Latte, Kerala Filter Kaapi, Vietnamese Egg Coffee)
     - *Traditional* (Turkish Coffee, Ethiopian Coffee Ceremony)
     - *Slow Brew* (V60 Pour Over, French Press, Aeropress)
     - *Cold* (Cold Brew, Iced Latte)
     - *Dessert* (Affogato)
     - *House Blend* (Hills Special — Coorg beans)
   - Dual-axis filtering by **Category** and **Tasting Profile** (Chocolate & Caramel, Fruity & Floral, Sweet & Creamy, Bold, Spiced & Earthy).
   - Instant search across drinks, countries, and tasting notes.
   - "Also on the menu" section for teas, hot chocolate, pastries, and light plates.

7. **Interactive World Coffee Map**:
   - Interactive SVG map pinning all 21 global inspiration cities with smooth popups and quick links to the menu.

8. **The Space (Magazine Spread)**:
   - Asymmetric editorial grid featuring the sunlit window bar, misty terrace overlooking the Mussoorie hills, brew bar, and travel library.
   - Lightbox modal with photography notes.

9. **Home Brewing Workshops**:
   - Dedicated card for the monthly weekend masterclass, strictly limited to 8 guests.

10. **Table Reservation Form**:
    - Accessible inline validation without browser popup alerts.
    - 10-digit phone number validation.
    - Date restriction (no past dates).
    - Time restriction (8:00 AM – 9:30 PM).
    - Radio buttons for seating (Main room, Window bar, Terrace, No preference).
    - **Gentle pet terrace notification**: Automatically suggests the terrace if pets are checked with other seating options.
    - Consent checkbox.
    - **Confirmation Receipt**: Seamlessly replaces the form on submit with all repeated reservation details.

11. **Ambient Cafe Soundscape**:
    - Built-in Web Audio API synthesizer generating soft cafe vinyl crackle and warm acoustic jazz chord swells with a single tap.

---

## 🚀 How to Run Locally

Because this is a pure static website with zero external build dependencies:

1. **Directly open in browser**:
   - Double-click [`index.html`](index.html).

2. **Or run with Python**:
   ```bash
   python -m http.server 8000
   ```
   Open [http://localhost:8000](http://localhost:8000) in your web browser.

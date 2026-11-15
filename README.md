# Try First — borrow before you buy

**Try First** helps someone check whether they need a purchase before spending money: ask a friend to lend a similar item, wait, then decide. It is aimed first at impulse purchases of gadgets and hobby gear.

**Live demo:** [lovely-sunburst-7ac1c2.netlify.app](https://lovely-sunburst-7ac1c2.netlify.app)

## Try it in two minutes

1. Open the [live demo](https://lovely-sunburst-7ac1c2.netlify.app/?demo=1). The visible **Demo mode** switch is also available; demo buffers last 45 seconds. Normal buffers last 48 hours.
2. Choose **Seed demo data** to load one buffer ready for a decision and one already skipped, or enter an item and price and start a demo buffer.
3. On a ready buffer, choose **Skip · save it**. Use **Share saved result** to download a share card.
4. Choose **Ask a friend to lend it**. Open the copied link in another browser to see the buddy card. The friend can offer to lend an item or send a nudge, then use the CTA to start their own buffer.
5. Open **Stats** to see the counters stored in that browser.

## How the Zero-CAC loop works

The buyer shares a concrete request: “Can you lend me this before I buy one?” The friend gets a useful role, can reply in their existing chat app, and sees a CTA to put their own purchase on pause. A skipped purchase can produce a shareable savings card. Each invitation and result gives the product a natural path to another person without paid ads.

## Architecture and privacy

- Static HTML, CSS, and JavaScript; no framework or runtime server is required.
- `core.js` contains the timer, buddy-link, and metric-summary logic. Browser data is stored in `localStorage`.
- No account or payment details are collected. Product name, price, and timer are stored in the current browser.
- Buddy links carry the item, owner label, price, and timer timestamp in the URL fragment. A reply opens the device share sheet or copies text; it is sent through the user’s existing chat app.
- The optional product URL is currently manual reference only; the app does not fetch product-page metadata.
- The app has no shared database. Buffers and stats do not synchronize between browsers. “Invites opened” and “invitees who started” are counted only in the browser where that event occurs, so they are not global acquisition analytics.

## Tests

Run the core tests with Node.js:

```sh
node --test tests/core.test.js
```

They cover timer states, real and demo durations, buddy-link round trips, and the Skip percentage calculation.

## Deployment

The HackOnVibe repo workflow still builds a static artifact, but the organizers have confirmed automatic publishing on their domain is turned off for this hackathon. The working demo is hosted on Netlify. `netlify.toml` configures a connected Netlify site to copy only `index.html` and `core.js` into `dist/` before publishing. The team’s Netlify URL should be the one entered in the HackOnVibe submission cabinet.

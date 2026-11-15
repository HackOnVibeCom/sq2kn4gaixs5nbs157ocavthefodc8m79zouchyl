# Customer journey — Try First

## Discovery

A person sees a friend’s “Can you lend me this before I buy one?” link or a share card showing a purchase they waited on and skipped. The prompt is concrete and easy to answer; the recipient does not need to create an account to view the buddy card.

## First use

The visitor enters the item and its price, then starts a buffer. The normal timer is 48 hours. A judge or first-time visitor can use the visible 45-second demo switch, add `?demo=1`, or seed sample data to reach the decision screen immediately.

## Invite

From a buffer card, the buyer copies a buddy link. The friend sees the item, price, and whether the timer is still running, then chooses **I can lend one to try** or **I can’t lend one — send a nudge**. The response is composed for the device’s share sheet or copied for the user to send in their existing chat.

## Repeat

The friend can use **Put your own purchase on pause** to start a buffer of their own. Once a timer is due, the buyer chooses Buy, Skip, or Wait more. A Skip can become a downloadable result card and another shareable invitation.

## Measurement limits

The current version keeps events in browser-local storage. The `/stats` view reports that browser’s counts only; it does not aggregate activity across the buyer’s and friend’s devices. Seeded examples are demo data, not real users or traction.

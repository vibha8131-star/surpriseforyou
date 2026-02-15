# Good Luck Card — small interactive web card

This is a tiny interactive web page you can personalize and share via a link. It's designed to be cheerful and playful — click "Throw confetti" and try the personalization field.

Files added
- `index.html` — the card page. It supports a query parameter `?name=` to personalize the greeting.
- `styles.css` — styles used by the page.
- `script.js` — JS for confetti, personalization, and share-link handling.

How to use

1. Open `index.html` locally in a browser to preview. For best sharing, host it (see below).
2. To personalize using a link, append `?name=HerName` to the page URL. Example:

```
https://your-username.github.io/repo-name/?name=Sara
```

WhatsApp sharing

- The card now includes a "Share on WhatsApp" button that opens WhatsApp Web (or the WhatsApp app on mobile) with a prefilled message that includes the card URL. This works across modern browsers. Example prefilled message:

```
Hey Vedika! I made this little good-luck card for you — check it out: https://your-username.github.io/repo-name/?name=Vedika
```

Tips for sending via WhatsApp
- Open the hosted URL in your browser and click "Apply" (if you changed the name) so the share link updates. Then click "Share on WhatsApp" or copy the URL displayed and paste it into a WhatsApp chat.
- For mobile, opening the wa.me link will open the WhatsApp app directly. For desktop, it will open WhatsApp Web in a new tab.

Hosting (recommended) — GitHub Pages

1. Create a new GitHub repository and push these files to the repository root.
2. In the repository Settings, enable Pages and choose the `gh-pages` or `main` branch and `/ (root)` as the folder.
3. GitHub will publish a URL like `https://your-username.github.io/repo-name/` — copy that and add `?name=...` when you want to send it.

Quick alternate hosting options
- Netlify Drop: drag & drop the project folder to Netlify (no setup).
- Vercel: import repository and deploy (free personal use).

Share tips
- Copy the full URL shown on the card (the page updates the share link automatically when you personalize).
- If you want a short link, use any link shortener of your choice after hosting.

Customization ideas
- Add more playful animations or custom messages.
- Replace colors in `styles.css` to match the recipient's favorites.

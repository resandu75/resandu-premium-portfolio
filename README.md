# Resandu Dewujith — Premium Personal Portfolio (Enhanced Edition)

A more polished **premium personal portfolio website** for **Resandu Dewujith**, upgraded with:
- a stronger **red-accent premium UI**
- real **personal photos** integrated into the design
- a built-in **profile video / reel section**
- improved layout and overall more professional visual presentation
- React frontend + Node/Express backend + SQLite contact message storage

## Main improvements in this version
- Hero section redesigned to feel more modern and premium
- Personal branding improved with real photo cards instead of generic visual-only hero content
- New **Profile Reel** section using the provided short video
- Better section spacing, cleaner typography, stronger visual hierarchy
- Elegant blend of **red, dark charcoal and subtle cyan** accent tones
- Contact form still connected to the backend API and SQLite storage

## Tech stack
- **Frontend:** React, Vite, Framer Motion, Lucide React
- **Backend:** Node.js, Express, Helmet, express-rate-limit
- **Database:** SQLite (better-sqlite3)

## Included personal media
The following assets are already integrated into the website:
- Hero / profile photo based on provided SLIIT campus image
- Two additional portrait images in About / visual sections
- Short MP4 video integrated into a dedicated reel section

Media files are stored in:
- `frontend/public/media/`

## Run locally
Requires **Node.js 20+** and npm.

1. Open the project folder.
2. Install dependencies:

```bash
npm install
npm run install:all
```

3. Create `backend/.env` from `backend/.env.example`.
4. Set a strong value for `ADMIN_TOKEN`.
5. Start both frontend and backend:

```bash
npm run dev
```

6. Open:

```text
http://localhost:5173
```

## Production build
```bash
npm run build
npm start
```

Production server runs on:

```text
http://localhost:4000
```

## Contact form API
The contact form stores messages in SQLite.

Private inbox endpoint:

```bash
curl -H "Authorization: Bearer YOUR_PRIVATE_ADMIN_TOKEN" http://localhost:4000/api/admin/messages
```

## Files you may want to customize later
- `frontend/src/App.jsx` → content, links, sections
- `frontend/src/style.css` → colors, layout, spacing, premium UI styling
- `frontend/public/media/` → photos and video
- `frontend/public/Resandu_Dewujith_CV.pdf` → CV file
- `backend/server.js` → API and SQLite storage

## Notes
- The site now uses the provided personal images and video directly.
- If you later want different crops or more images, just replace the files in `frontend/public/media/` and update references in `App.jsx` if needed.
- This is still a portfolio starter project. Review and test before deployment.

## Author
Resandu Dewujith
- GitHub: https://github.com/resandu75
- LinkedIn: https://www.linkedin.com/in/resandu-dewujith-621788412
- Email: resandudewujith040@gmail.com

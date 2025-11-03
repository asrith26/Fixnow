# Deployment Plan: Connect Frontend and Backend, Deploy to Vercel and Render

## Steps to Complete

- [x] Modify `backend/server.js` to remove static file serving and catch-all route for API-only deployment on Render
- [x] Update `vercel.json` to remove API proxy (since frontend will call backend directly via REACT_APP_API_URL)
- [ ] Deploy backend to Render:
  - Create a new Web Service on Render
  - Connect to GitHub repository
  - Set build command: `npm install`
  - Set start command: `npm start`
  - Set environment variables: MONGO_URI, etc.
  - Deploy and obtain the backend URL
- [ ] Update `vercel.json` with the actual Render backend URL
- [ ] Deploy frontend to Vercel:
  - Import project from GitHub
  - Set build settings: build command `npm run build`, output directory `build`
  - Set environment variable: REACT_APP_API_URL to the Render backend URL
  - Deploy
- [ ] Test the deployed app for accessibility from other devices

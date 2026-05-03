# Deployment Guide for Prepnova

## Environment Setup

### Client (.env)
The `.env` file is already created with the backend URL configured.

```
VITE_API_URL=https://prepnova.onrender.com
VITE_APP_NAME=AI Interview Analyzer
```

### Server (.env)
Create a `.env` file in the `server/` directory using `.env.example` as template:

```
PORT=3001
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=https://your-frontend-url.onrender.com
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=https://prepnova.onrender.com
```

## Deployment on Render

1. **Connect your GitHub repository** to Render
2. **Create two web services**:
   - **Backend Service**: 
     - Build Command: `cd server && npm install`
     - Start Command: `cd server && npm start`
   - **Frontend Service**:
     - Build Command: `cd client && npm install && npm run build`
     - Start Command: `npx serve -s client/dist -l 3000`

3. **Set Environment Variables** for each service (see .env.example files)

4. **Deploy**: Push to main branch - Render will auto-deploy

## Local Development

### Client
```bash
cd client
npm install
npm run dev
```

### Server
```bash
cd server
npm install
npm start
```

## Project Structure
- `/client` - React frontend (Vite)
- `/server` - Node.js backend (Express)
- Both can be deployed independently or together

## Notes
- Backend URL: https://prepnova.onrender.com
- Frontend will be deployed separately on Render
- CORS is configured to accept requests from both local development and production

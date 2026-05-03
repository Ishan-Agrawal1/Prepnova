# RENDER DEPLOYMENT SETUP - Complete Guide

## ✅ Project is now ready for deployment!

Your Prepnova project has been configured for deployment with the following changes:

### Changes Made:

1. **Created `.env` file** (client)
   - Backend URL configured: `https://prepnova.onrender.com`

2. **Updated CORS configuration** (server/server.js)
   - Now accepts requests from localhost (dev) and production URLs
   - Accepts `FRONTEND_URL` environment variable

3. **Added deployment files:**
   - `.env.example` (server) - Template for server environment variables
   - `render.yaml` - Render deployment configuration
   - `DEPLOYMENT.md` - Deployment documentation
   - Updated `.gitignore` - Excludes .env files

4. **Enhanced client build:**
   - Added `serve` package for production serving
   - Optimized `vite.config.js` with code splitting and minification
   - Added `start` script for production server

---

## 🚀 Deploy on Render in 5 Steps:

### Step 1: Prepare Your Repository
```bash
git add .
git commit -m "Prepare project for Render deployment"
git push origin main
```

### Step 2: Connect Repository to Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Select your GitHub repository
4. Click "Connect"

### Step 3: Backend Configuration

**Service Name:** `prepnova-server`

**Build & Deploy Settings:**
- Build Command: `cd server && npm install`
- Start Command: `cd server && npm start`
- Node Version: `18` or `20` (recommended)

**Environment Variables:**
```
MONGODB_URI = your_mongodb_atlas_connection_string
BETTER_AUTH_SECRET = (generate a random 32+ character string)
BETTER_AUTH_URL = https://prepnova-server.onrender.com
FRONTEND_URL = https://prepnova-client.onrender.com
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your-email@gmail.com
SMTP_PASS = your-gmail-app-password
OPENAI_API_KEY = (optional, for AI features)
```

### Step 4: Frontend Configuration

**Service Name:** `prepnova-client`

**Build & Deploy Settings:**
- Build Command: `cd client && npm install && npm run build`
- Start Command: `cd client && npm run start`
- Node Version: `18` or `20` (recommended)

**Environment Variables:**
```
VITE_API_URL = https://prepnova-server.onrender.com
NODE_ENV = production
```

### Step 5: Deploy
1. Click "Deploy" for both services
2. Wait for builds to complete (first deployment takes 5-10 minutes)
3. Your app will be live at the Render-assigned URLs!

---

## 🔐 Environment Variables Setup:

### Required for Backend:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/prepnova` |
| `BETTER_AUTH_SECRET` | Authentication secret (32+ chars) | Use a strong random string |
| `BETTER_AUTH_URL` | Backend URL for auth | `https://prepnova-server.onrender.com` |
| `FRONTEND_URL` | Frontend URL for CORS | `https://prepnova-client.onrender.com` |
| `SMTP_USER` | Gmail address for emails | `your-email@gmail.com` |
| `SMTP_PASS` | Gmail app-specific password | Generate from Google Account |

### Optional:
- `OPENAI_API_KEY` - For AI coach features
- `PORT` - Default is 3001 (usually no need to change)

---

## 📋 Pre-Deployment Checklist:

- [ ] `.env` file created with correct backend URL
- [ ] `.env.example` files updated with all required variables
- [ ] GitHub repository pushed with all changes
- [ ] MongoDB Atlas cluster created and connection string obtained
- [ ] Gmail app password generated (if using email features)
- [ ] BETTER_AUTH_SECRET generated (32+ random characters)
- [ ] Render account created and connected to GitHub
- [ ] render.yaml file is in repository root

---

## 🔗 Getting Required Credentials:

### MongoDB Atlas:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (free tier available)
3. Create database user
4. Get connection string with your credentials
5. Update `MONGODB_URI` with this string

### Gmail App Password:
1. Enable 2-factor authentication on your Google Account
2. Go to [Google Account Security](https://myaccount.google.com/security)
3. Create "App passwords" for "Mail" and "Windows Computer"
4. Use this password as `SMTP_PASS` (not your Gmail password!)

### Generate BETTER_AUTH_SECRET:
```bash
# On your local machine
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 📊 Render Free Plan Limitations:

- ⏸️ Services spin down after 15 mins of inactivity
- 💾 Limited memory (~512MB)
- 📊 Limited bandwidth
- ✅ Good for development and light production use

**For production, consider upgrading to Starter Plan ($7/month)**

---

## 🐛 Troubleshooting:

### Frontend won't connect to backend:
- Check `VITE_API_URL` in frontend environment variables
- Verify CORS is configured in `server.js`
- Check backend service is running and healthy

### Build fails:
- Check build logs in Render dashboard
- Ensure `package.json` has all required dependencies
- Verify Node version compatibility

### MongoDB connection errors:
- Verify `MONGODB_URI` format is correct
- Check IP whitelist in MongoDB Atlas (allow all: `0.0.0.0/0`)
- Ensure database user has appropriate permissions

---

## 📝 After Deployment:

1. Test the application on both frontend and backend URLs
2. Check browser console for any errors
3. Verify API calls are reaching the backend
4. Test authentication (signup/login)
5. Monitor Render dashboard for performance metrics

---

## 🔄 Updates & Redeployment:

Simply push to your GitHub main branch:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Render will automatically detect changes and redeploy both services!

---

## 📞 Support:

- Render Docs: https://render.com/docs
- Better Auth Docs: https://better-auth.vercel.app
- MongoDB Atlas: https://docs.atlas.mongodb.com

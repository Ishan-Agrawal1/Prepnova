# Vercel + Render Deployment Guide

## Frontend on Vercel + Backend on Render

### Issue: "state_mismatch" Error

This error occurs when Better Auth can't verify the callback state. It usually means:
- Callback URL mismatch between frontend and backend
- CORS misconfiguration
- BETTER_AUTH_URL not matching actual backend URL

### Solution:

#### Step 1: Vercel Environment Variables

Set these in your Vercel project settings:

```
VITE_API_URL=https://prepnova.onrender.com
VITE_APP_NAME=AI Interview Analyzer
```

#### Step 2: Render Backend Environment Variables

Make sure your Render backend has:

```
BETTER_AUTH_URL=https://prepnova.onrender.com
FRONTEND_URL=https://your-vercel-frontend-url.vercel.app
```

**Important:** Replace `your-vercel-frontend-url` with your actual Vercel deployment URL!

#### Step 3: Update Server CORS

The server is already configured to accept dynamic CORS origins from the `FRONTEND_URL` environment variable.

#### Step 4: Verify Auth Client

The client now uses `VITE_API_URL` environment variable, which Vercel will set automatically.

### Deployment Steps:

1. **Deploy Backend first** (if not already done):
   - Push to main → Render auto-deploys
   - Note your backend URL: `https://prepnova.onrender.com`

2. **Deploy Frontend to Vercel**:
   ```bash
   npm install -g vercel
   cd client
   vercel
   ```

3. **After Vercel deployment**:
   - Get your Vercel URL (e.g., `prepnova-client.vercel.app`)
   - Update Render backend's `FRONTEND_URL` environment variable
   - Redeploy backend on Render (or just wait for auto-redeploy)

4. **Test the callback flow**:
   - Try signing up or logging in
   - You should be redirected back without the state_mismatch error

### Troubleshooting:

**Still getting "state_mismatch"?**

1. Clear browser cookies for prepnova.onrender.com
2. Clear browser cookies for your vercel app
3. Hard refresh (Ctrl+Shift+R)
4. Check that BETTER_AUTH_URL on backend exactly matches your Render service URL
5. Verify FRONTEND_URL is set correctly on backend

**Can't connect to backend?**

1. Check browser console for CORS errors
2. Verify VITE_API_URL is set correctly in Vercel
3. Check that Render backend is running (visit https://prepnova.onrender.com)

**Gmail OAuth not working?**

1. Add your Vercel URL to Google OAuth allowed redirect URIs
2. Make sure both frontend and backend have matching BETTER_AUTH_URL
3. Check that cookies are being sent with credentials

### Files Created:
- `.env.production` - Production environment for Vercel
- `.env.local` - Local development (fixed commenting issue)

### Environment Variables Summary:

**Vercel Frontend (.env):**
- `VITE_API_URL` = Backend URL
- `VITE_APP_NAME` = App name

**Render Backend (.env):**
- `BETTER_AUTH_URL` = Backend service URL (for auth callbacks)
- `FRONTEND_URL` = Frontend app URL (for CORS)
- `MONGODB_URI` = Database connection
- `BETTER_AUTH_SECRET` = Auth secret
- `SMTP_*` = Email configuration

Both should match and be consistent for authentication to work properly!

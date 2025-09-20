# E-commerce App Deployment Guide

## Prerequisites
- Vercel account (free)
- MongoDB Atlas account
- Cloudinary account

## Step 1: Deploy Backend

1. **Push to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy Backend to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repo
   - **Root Directory**: Set to `backend`
   - **Framework Preset**: Other
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty

3. **Set Environment Variables** in Vercel:
   - Go to Project Settings → Environment Variables
   - Add these variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   JWT_SECRET=your_jwt_secret
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=your_admin_password
   ```

4. **Deploy** - Vercel will automatically deploy

## Step 2: Deploy Frontend (Web)

1. **Create new Vercel project**:
   - Import same GitHub repo
   - **Root Directory**: Set to `web`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

2. **Set Environment Variables**:
   ```
   VITE_BACKEND_URL=https://your-backend-url.vercel.app
   ```

3. **Deploy**

## Step 3: Deploy Admin Panel

1. **Create new Vercel project**:
   - Import same GitHub repo
   - **Root Directory**: Set to `admin`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

2. **Set Environment Variables**:
   ```
   VITE_BACKEND_URL=https://your-backend-url.vercel.app
   ```

3. **Deploy**

## Step 4: Update URLs

After deployment, update the frontend environment variables with your actual backend URL:
- Go to each frontend project's Environment Variables
- Update `VITE_BACKEND_URL` to your backend's Vercel URL
- Redeploy both frontend projects

## URLs Structure
- Backend: `https://your-backend.vercel.app`
- Web App: `https://your-web.vercel.app`
- Admin Panel: `https://your-admin.vercel.app`

## Notes
- All three apps will be deployed separately
- Make sure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Cloudinary credentials should be from your production environment

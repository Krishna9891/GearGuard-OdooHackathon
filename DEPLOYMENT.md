# GearGuard Vercel Deployment Guide

## Prerequisites
- GitHub repository with your code pushed
- Vercel account (sign up at vercel.com)
- PostgreSQL database (recommended for production)

## Deployment Steps

### Option 1: Deploy Both Frontend & Backend Together (Recommended)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/new
   - Import your GitHub repository

2. **Configure Project**
   - Framework Preset: `Vite`
   - Root Directory: `gearguard-frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Add Environment Variables**
   
   For Frontend:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```

   For Backend (create separate deployment):
   ```
   NODE_ENV=production
   JWT_SECRET=your-secure-random-jwt-secret
   DATABASE_URL=your-postgresql-connection-string
   CORS_ORIGIN=https://your-frontend-url.vercel.app
   DB_DIALECT=postgres
   ```

### Option 2: Deploy Separately

#### Deploy Backend First:

1. **Create New Project in Vercel**
   - Import your repository
   - Root Directory: `gearguard-backend`
   - Framework: `Other`

2. **Add Environment Variables** (in Vercel Dashboard):
   ```
   NODE_ENV=production
   JWT_SECRET=generate-a-secure-random-string
   DATABASE_URL=your-postgresql-connection-string
   CORS_ORIGIN=*
   DB_DIALECT=postgres
   PORT=5000
   ```

3. **Deploy** and note your backend URL (e.g., `https://gearguard-backend.vercel.app`)

#### Deploy Frontend:

1. **Create New Project in Vercel**
   - Import your repository
   - Root Directory: `gearguard-frontend`
   - Framework: `Vite`

2. **Add Environment Variable**:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```

3. **Deploy**

## Database Setup

### PostgreSQL (Recommended for Production)

You can use one of these providers:
- **Vercel Postgres**: https://vercel.com/docs/storage/vercel-postgres
- **Neon**: https://neon.tech (free tier available)
- **Supabase**: https://supabase.com (free tier available)
- **Railway**: https://railway.app

Example connection string format:
```
postgresql://username:password@host:5432/database?sslmode=require
```

## Post-Deployment

1. **Update CORS_ORIGIN** in backend environment variables with your frontend URL
2. **Test the application** at your Vercel URL
3. **Run database migrations** if needed
4. **Monitor logs** in Vercel dashboard

## Troubleshooting

### Backend Issues:
- Check environment variables are set correctly
- Verify DATABASE_URL is valid
- Check Vercel function logs for errors

### Frontend Issues:
- Ensure VITE_API_URL points to correct backend
- Check browser console for CORS errors
- Verify build completed successfully

## Quick Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy backend
cd gearguard-backend
vercel

# Deploy frontend
cd ../gearguard-frontend
vercel
```

## Environment Variables Checklist

### Backend:
- [ ] NODE_ENV=production
- [ ] JWT_SECRET
- [ ] DATABASE_URL
- [ ] CORS_ORIGIN
- [ ] DB_DIALECT=postgres

### Frontend:
- [ ] VITE_API_URL

## Important Notes

1. **SQLite won't work on Vercel** - use PostgreSQL for production
2. **Update your backend CORS** to accept requests from your frontend domain
3. **Keep JWT_SECRET secure** - use a strong random string
4. **Enable auto-deployments** from your GitHub main branch

## Support
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

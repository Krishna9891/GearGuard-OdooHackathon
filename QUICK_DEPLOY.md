# ⚡ Quick Deployment Checklist

## Before Deploying

- [x] Code pushed to GitHub
- [x] .gitignore updated
- [x] README updated
- [ ] Get PostgreSQL database URL
- [ ] Generate secure JWT secret

## Vercel Deployment Steps

### 1️⃣ Deploy Backend First

Go to https://vercel.com/new
- **Import**: Your GitHub repo
- **Root Directory**: `gearguard-backend`
- **Framework**: Other

**Environment Variables:**
```
NODE_ENV=production
JWT_SECRET=PASTE_YOUR_SECRET_HERE
DATABASE_URL=PASTE_YOUR_POSTGRES_URL
DB_DIALECT=postgres
CORS_ORIGIN=*
```

✅ Click Deploy → Copy the backend URL

### 2️⃣ Deploy Frontend

Create new project in Vercel
- **Import**: Same GitHub repo
- **Root Directory**: `gearguard-frontend`
- **Framework**: Vite

**Environment Variable:**
```
VITE_API_URL=https://YOUR_BACKEND_URL.vercel.app/api
```

✅ Click Deploy

### 3️⃣ Update CORS

Go back to backend settings → Update `CORS_ORIGIN`:
```
CORS_ORIGIN=https://your-frontend-url.vercel.app
```

Redeploy backend.

## Free PostgreSQL Options

1. **Neon** (Recommended): https://neon.tech
   - Sign up → Create project → Copy connection string
   
2. **Supabase**: https://supabase.com
   - Create project → Settings → Database → Connection string
   
3. **Vercel Postgres**: In Vercel dashboard → Storage → Create

## Generate JWT Secret

Run in terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Demo Credentials
- Admin: `admin@gearguard.com` / `Password123!`
- Tech: `mitch@gearguard.com` / `Password123!`

## Troubleshooting

❌ **Build failed?** Check logs in Vercel dashboard
❌ **API not connecting?** Verify VITE_API_URL in frontend settings
❌ **CORS errors?** Update CORS_ORIGIN in backend with frontend URL
❌ **Database errors?** Verify DATABASE_URL format and credentials

## Test After Deployment

1. Open frontend URL
2. Try logging in
3. Create a maintenance request
4. Drag cards on Kanban board
5. Check dashboard analytics

---

🎉 **You're live!** Share your deployment URL!

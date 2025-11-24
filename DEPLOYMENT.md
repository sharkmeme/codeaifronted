# Deployment Guide - bunnycode.ai

This project is configured for **split deployment**:
- **Frontend** → Vercel (React/Vite)
- **Backend** → Replit (Express API)

---

## 🚀 Quick Start

### Backend Deployment (Replit)

1. **Your backend is already running on Replit!**
   - The Express API is serving at your Replit URL
   - Example: `https://your-project.replit.app`

2. **Required Secrets** (Already configured in Replit Secrets):
   ```
   ADMIN_API_KEY=<your-admin-key>
   SUPABASE_URL=<your-supabase-url>
   SUPABASE_ANON_KEY=<your-supabase-key>
   SMTP_HOST=<smtp-server>
   SMTP_PORT=<smtp-port>
   SMTP_USER=<email>
   SMTP_PASS=<password>
   ALERT_EMAIL=<notification-email>
   SESSION_SECRET=<random-secret>
   ```

3. **Backend URL**: Copy your Replit app URL (you'll need this for Vercel)
   - Format: `https://your-project.replit.app`
   - Or use your custom Replit domain if configured

---

### Frontend Deployment (Vercel)

#### Step 1: Push to GitHub
```bash
# If not already a git repo
git init
git add .
git commit -m "Prepare for Vercel deployment"

# Create a new GitHub repo, then:
git remote add origin https://github.com/yourusername/bunnycode-ai.git
git push -u origin main
```

#### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Import your GitHub repository
4. Configure the project:

**Root Directory**: `client`

**Build Settings**:
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Environment Variables**:
Add this variable:
```
VITE_API_BASE_URL=https://your-project.replit.app
```
Replace `your-project.replit.app` with your actual Replit backend URL.

5. Click **"Deploy"**

#### Step 3: Update CORS (After First Deploy)

After Vercel deploys, you'll get a URL like `https://bunnycode-ai.vercel.app`

**Important**: The CORS configuration already allows all `*.vercel.app` domains (including preview deployments), so no changes needed!

If you want to restrict to specific Vercel URLs, update `server/middleware/security.ts`:

```typescript
export const allowedOrigins = [
  'https://bunnycode.ai',
  'https://www.bunnycode.ai',
  'https://your-project.vercel.app',  // Add your Vercel URL
  'http://localhost:5173',
  // ... other origins
];
```

---

## 🌐 Custom Domain Setup

### Vercel Custom Domain (bunnycode.ai)

1. In your Vercel project → **Settings** → **Domains**
2. Add your domain: `bunnycode.ai`
3. Follow Vercel's DNS instructions:
   - Add A record pointing to Vercel's IP
   - Or add CNAME record pointing to `cname.vercel-dns.com`

4. Update `client/.env` (or Vercel environment variables):
   ```
   VITE_API_BASE_URL=https://api.bunnycode.ai
   ```

### Backend Subdomain (api.bunnycode.ai)

**Option A: Use Replit as backend (current setup)**
- Point `api.bunnycode.ai` → your Replit app URL via CNAME
- Or use Replit's custom domain feature

**Option B: Host backend elsewhere**
- Deploy the `/server` directory to any Node.js host
- Update Vercel's `VITE_API_BASE_URL` to the new backend URL

---

## 🧪 Testing the Deployment

After deploying both frontend and backend:

1. **Test Form Submission**:
   - Visit your Vercel URL
   - Submit both contact forms
   - Check your email for notifications
   - Verify leads in Supabase dashboard

2. **Test Calendly Integration**:
   - Click "Schedule a Call" button
   - Verify popup opens correctly

3. **Test Mobile Responsiveness**:
   - Open on mobile device
   - Test horizontal swipe on project cards
   - Verify 50vh hero height on mobile

4. **SEO Verification**:
   - Visit `https://your-site.vercel.app/sitemap.xml`
   - Visit `https://your-site.vercel.app/robots.txt`

---

## 🔐 Security Notes

The backend includes:
- ✅ CORS restrictions (Vercel domains allowed)
- ✅ Rate limiting (5 form submissions/minute)
- ✅ Input sanitization (XSS protection)
- ✅ Security headers (Helmet, HSTS)
- ✅ API key protection on admin endpoints

**Production Checklist**:
- [x] ADMIN_API_KEY set in Replit Secrets
- [ ] Supabase credentials configured
- [ ] SMTP email configured
- [ ] Custom domain DNS configured (if applicable)

---

## 📝 Environment Variables Reference

### Frontend (Vercel)
```bash
VITE_API_BASE_URL=https://your-backend.replit.app
```

### Backend (Replit)
```bash
# Required
ADMIN_API_KEY=<random-key-32-chars>
SUPABASE_URL=<supabase-project-url>
SUPABASE_ANON_KEY=<supabase-anon-key>

# Email notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<email>
SMTP_PASS=<app-password>
ALERT_EMAIL=<notification-email>

# Session security
SESSION_SECRET=<random-secret>

# Auto-set by Replit (don't manually set)
NODE_ENV=production
```

---

## 🔄 Local Development

To test the split setup locally:

1. **Start backend** (default):
   ```bash
   npm run dev
   ```
   Runs at `http://localhost:5000`

2. **Start frontend with separate backend**:
   - Create `client/.env`:
     ```
     VITE_API_BASE_URL=https://your-backend.replit.app
     ```
   - Run frontend:
     ```bash
     cd client
     npm run dev
     ```

---

## 📊 Monitoring

**Backend Logs** (Replit):
- Check Replit console for API errors
- Monitor rate limiting messages
- Check Supabase dashboard for lead submissions

**Frontend Logs** (Vercel):
- Check Vercel dashboard → Deployments → Logs
- Monitor browser console for API call errors

---

## 🆘 Troubleshooting

### "CORS Error" when submitting forms
**Fix**: Verify `VITE_API_BASE_URL` in Vercel matches your Replit backend URL exactly (including `https://`)

### Forms not submitting
**Check**:
1. Backend is running on Replit
2. `VITE_API_BASE_URL` is set correctly in Vercel
3. CORS allows your Vercel domain
4. Rate limiting isn't blocking (max 5 submissions/minute)

### Email notifications not sending
**Check**:
1. SMTP credentials are correct in Replit Secrets
2. `ALERT_EMAIL` is set
3. Backend logs show email sending

### 500 Error on form submission
**Check**:
1. Supabase credentials are valid
2. Backend logs in Replit console
3. All required fields are being sent

---

## 📞 Support

For deployment issues:
- **Vercel**: Check [Vercel documentation](https://vercel.com/docs)
- **Replit**: Check [Replit deployments guide](https://docs.replit.com/category/deployments)
- **Supabase**: Check [Supabase dashboard](https://supabase.com/dashboard)

---

**Last Updated**: November 24, 2025

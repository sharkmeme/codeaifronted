# bunnycode.ai Frontend

This is the frontend-only export of bunnycode.ai for deployment on Vercel.

## Prerequisites

- Node.js 18 or higher
- npm or yarn

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your backend API URL:
```
VITE_API_BASE_URL=http://localhost:5000
```

4. Start development server:
```bash
npm run dev
```

The app will run on `http://localhost:5173`

## Deployment on Vercel

### Step 1: Push to GitHub

Create a new GitHub repository and push this `frontend_export` folder as the root:

```bash
cd frontend_export
git init
git add .
git commit -m "Initial frontend export"
git branch -M main
git remote add origin https://github.com/your-username/bunnycode-frontend.git
git push -u origin main
```

### Step 2: Configure Vercel

1. **Import Project**: Connect your GitHub repository to Vercel
2. **Framework Preset**: Vite
3. **Root Directory**: Leave as `.` or empty (default - repository root)
4. **Build Settings**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `npm install`

5. **Environment Variables**:
   Add the following environment variable in Vercel's dashboard:
   ```
   VITE_API_BASE_URL=https://your-backend.replit.app
   ```
   Replace `your-backend.replit.app` with your actual Replit backend URL.

### Step 3: Deploy

Click **Deploy** and Vercel will build and deploy your frontend.

### Important Notes

- The build outputs to `client/dist`, so make sure Vercel's "Output Directory" is set to `client/dist`
- The frontend expects the backend API to be accessible at the URL specified in `VITE_API_BASE_URL`
- Make sure your backend CORS configuration allows your Vercel domain

## Project Structure

```
frontend_export/
├── client/              # React application
│   ├── src/            # Source files
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components  
│   │   ├── routes/     # Route components
│   │   ├── lib/        # Utilities and helpers
│   │   └── hooks/      # Custom React hooks
│   ├── public/         # Static assets
│   └── dist/           # Build output (generated)
├── shared/             # Shared types and schemas
├── attached_assets/    # Additional assets
├── vite.config.ts      # Vite configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
├── tsconfig.json       # TypeScript configuration
├── package.json        # Dependencies
├── .env.example        # Environment variables template
└── README.md           # This file
```

## Backend Integration

This frontend connects to a separate backend API running on Replit. The backend URL is configured via the `VITE_API_BASE_URL` environment variable.

The frontend makes API calls to:
- `POST /api/leads` - Submit contact form

Make sure your backend:
1. Is deployed and accessible
2. Has CORS configured to allow your Vercel domain
3. Has the `/api/leads` endpoint implemented

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `https://your-backend.replit.app` |

## Troubleshooting

### Build Fails

If the build fails:
- Check Node.js version (should be 18+)
- Verify all environment variables are set correctly
- Run `npm install` to ensure dependencies are installed
- Check the Vercel build logs for specific errors

### API Connection Issues

If the frontend can't connect to the backend:
- Verify `VITE_API_BASE_URL` is set correctly in Vercel
- Ensure backend CORS allows your Vercel domain (`*.vercel.app`)
- Check backend is running and accessible
- Verify the API endpoint paths match

### Deployment Issues

- Make sure **Output Directory** in Vercel is set to `client/dist`, not just `dist`
- Ensure **Root Directory** is set to `.` (repository root)
- Check that `npm run build` works locally before deploying

## Support

For issues or questions, contact the development team.

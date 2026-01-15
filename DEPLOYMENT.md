# Deployment Guide - BetterPlugins Hub

## Quick Start Deployment

### Option 1: Vercel (Recommended for Next.js)

**Pros**: Easy, fast, automatic deployments, free tier available  
**Estimated time**: 5 minutes

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the project

3. **Add Environment Variables**
   - Go to Settings → Environment Variables
   - Add all variables from `.env.local`:
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
     - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
     - `NEXT_PUBLIC_FIREBASE_APP_ID`
     - `NEXT_PUBLIC_ADMIN_EMAILS`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app is live! 🎉

### Option 2: Firebase Hosting

**Pros**: Integrated with Firebase, good for full-stack apps  
**Estimated time**: 10 minutes

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase Hosting**
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Set public directory to `.next`
   - Configure as single-page app: No
   - Overwrite .next/404.html: No

4. **Build the Project**
   ```bash
   npm run build
   ```

5. **Deploy**
   ```bash
   firebase deploy --only hosting
   ```

### Option 3: Netlify

**Pros**: Great developer experience, easy rollbacks  
**Estimated time**: 5 minutes

1. **Push to GitHub**

2. **Connect on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select GitHub and your repo

3. **Configure Build**
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Add Environment Variables**
   - Go to Settings → Build & deploy → Environment
   - Add all Firebase variables

5. **Deploy**
   - Netlify auto-deploys on push

## Pre-Deployment Checklist

- [ ] All environment variables are set
- [ ] Firebase Firestore database is created
- [ ] Firebase Storage is enabled
- [ ] Google authentication is configured
- [ ] Admin emails are set in `NEXT_PUBLIC_ADMIN_EMAILS`
- [ ] `.env.local` is in `.gitignore` (NOT committed)
- [ ] Website builds without errors: `npm run build`
- [ ] TypeScript checks pass: `npm run typecheck`
- [ ] Test admin login works
- [ ] Test plugin creation, editing, deletion
- [ ] Test JAR file upload

## Post-Deployment

### Setup Custom Domain

**Vercel**:
1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions

**Firebase Hosting**:
1. Run `firebase hosting:channel:deploy preview`
2. In Firebase Console, go to Hosting → Custom domains
3. Add your domain

### Monitor & Debug

**Vercel**:
- View logs: Go to Deployments → select deployment → Logs

**Firebase**:
- View logs: `firebase functions:log`

### Scale & Optimize

1. **Enable CDN**
   - Vercel: Automatic
   - Firebase: Use Cloud CDN

2. **Optimize Images**
   ```bash
   npm install next-image-export-optimizer
   ```

3. **Database Optimization**
   - Create Firestore indexes for queries
   - Monitor database usage in Firebase Console

## Troubleshooting Deployment

### Build Fails with "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Loading
- Check variable names match (case-sensitive)
- Ensure variables are set in deployment platform
- Restart deployment

### Firebase Errors
- Check Firestore security rules
- Verify API key is correct
- Check Firebase Storage rules

### Authentication Issues
- Verify Firebase project has Google provider enabled
- Check `NEXT_PUBLIC_ADMIN_EMAILS` in deployment
- Clear browser cache and try again

## Performance Tips

1. **Image Optimization**
   - Use Next.js Image component
   - Optimize plugin icons (WebP format)

2. **Database Indexing**
   - Create Firestore indexes for common queries
   - Monitor database performance

3. **Caching**
   - Enable caching headers in vercel.json
   - Use browser caching for static assets

4. **Bundle Size**
   - Check bundle size: `npm run build`
   - Remove unused dependencies

## Security Hardening

1. **Before Going Live**
   ```bash
   # Audit dependencies
   npm audit
   npm audit fix
   ```

2. **Enable Security Headers**
   - Vercel: Added automatically
   - Firebase: Configure in Headers section

3. **Setup WAF** (Web Application Firewall)
   - Vercel: Available in Pro plan
   - Firebase: Use Google Cloud Armor

4. **Monitor Security**
   - Setup alerts for suspicious activity
   - Monitor Cloud Audit Logs

## Rollback Strategy

### Rollback Last Deployment

**Vercel**:
1. Go to Deployments
2. Click dropdown on previous deployment
3. Click "Redeploy"

**Firebase**:
```bash
firebase hosting:channels:deploy [channel-name]
```

## Support

- [Vercel Docs](https://vercel.com/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Next.js Docs](https://nextjs.org/docs)

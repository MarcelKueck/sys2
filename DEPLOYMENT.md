# 🚀 Production Deployment Guide

## Overview
This guide covers deploying the Workspace Matching Platform to production using Vercel and Supabase.

## Prerequisites
- Vercel account
- Supabase account
- Domain name (optional)

## Step 1: Supabase Production Setup

### 1.1 Create Production Project
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create new project
3. Choose region closest to your users
4. Note down the project URL and API keys

### 1.2 Run Database Migrations
```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### 1.3 Set Up Authentication
1. Go to Authentication > Settings
2. Configure Site URL: `https://your-domain.com`
3. Add redirect URLs for auth flows
4. Configure email templates (optional)

### 1.4 Configure Storage (if using file uploads)
1. Go to Storage
2. Create bucket: `workspace-images`
3. Set up RLS policies for image access

## Step 2: Vercel Deployment

### 2.1 Install Vercel CLI
```bash
npm install -g vercel
```

### 2.2 Deploy to Vercel
```bash
# From project root
vercel

# Follow prompts:
# - Link to existing project or create new
# - Set build settings (should auto-detect Next.js)
# - Configure environment variables
```

### 2.3 Environment Variables
Set these in Vercel dashboard under Settings > Environment Variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin Configuration
ADMIN_SECRET=your-secure-production-secret

# Optional
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 2.4 Custom Domain (Optional)
1. Go to Vercel dashboard > Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed

## Step 3: Production Configuration

### 3.1 Update Supabase RLS Policies
Ensure production-ready security:

```sql
-- Example: Restrict admin access to specific emails
CREATE POLICY "Admin access restriction" ON profiles 
FOR ALL USING (
  role = 'admin' AND 
  email IN ('admin@your-company.com', 'support@your-company.com')
);
```

### 3.2 Configure SEO
Update `packages/next/src/app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: 'Workspace Matching Platform',
  description: 'Connect with perfect workspace partners',
  metadataBase: new URL('https://your-domain.com'),
  openGraph: {
    title: 'Workspace Matching Platform',
    description: 'Connect with perfect workspace partners',
    url: 'https://your-domain.com',
    siteName: 'Workspace Matching Platform',
    images: ['/og-image.png'],
  },
}
```

### 3.3 Set Up Analytics
1. Google Analytics:
   ```bash
   # Add to environment variables
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

2. Vercel Analytics (built-in):
   - Automatically enabled for Vercel deployments

## Step 4: Monitoring & Maintenance

### 4.1 Set Up Monitoring
1. **Vercel Functions**: Monitor API response times
2. **Supabase Logs**: Monitor database performance
3. **Error Tracking**: Consider Sentry integration

### 4.2 Backup Strategy
1. **Database Backups**: 
   - Supabase Pro provides automated backups
   - Set up additional backup schedule if needed

2. **File Storage Backups**:
   - Configure Supabase Storage backups
   - Consider S3 sync for additional redundancy

### 4.3 Security Checklist
- [ ] Environment variables secured
- [ ] Admin secret changed from default
- [ ] RLS policies tested
- [ ] HTTPS enforced
- [ ] CSP headers configured (optional)

## Step 5: Post-Deployment Testing

### 5.1 Functional Testing
- [ ] User registration and login
- [ ] Profile creation (both roles)
- [ ] Application submission
- [ ] Admin dashboard access
- [ ] Email notifications (if configured)

### 5.2 Performance Testing
- [ ] Page load times < 3 seconds
- [ ] Database queries optimized
- [ ] Image optimization working
- [ ] Mobile responsiveness

### 5.3 SEO Testing
- [ ] Meta tags correct
- [ ] robots.txt accessible
- [ ] Sitemap generated (if needed)
- [ ] Open Graph tags working

## Step 6: Ongoing Maintenance

### 6.1 Regular Updates
```bash
# Update dependencies monthly
yarn upgrade-interactive

# Test in staging environment
yarn build && yarn start

# Deploy to production
vercel --prod
```

### 6.2 Database Maintenance
- Monitor query performance
- Regular data cleanup
- Update match scoring algorithm as needed

### 6.3 User Feedback
- Monitor application success rates
- Gather user feedback
- Iterate on matching algorithm

## Rollback Plan

### Quick Rollback
```bash
# Revert to previous deployment
vercel --prod --rollback
```

### Database Rollback
```bash
# If database changes need rollback
supabase db reset --linked
```

## Support & Troubleshooting

### Common Issues
1. **Environment Variables**: Ensure all variables are set correctly
2. **CORS Issues**: Check Supabase CORS settings
3. **Authentication**: Verify redirect URLs in Supabase
4. **Database**: Check RLS policies and permissions

### Getting Help
- Vercel Documentation: https://vercel.com/docs
- Supabase Documentation: https://supabase.com/docs
- Next.js Documentation: https://nextjs.org/docs

---

🎉 **Congratulations!** Your Workspace Matching Platform is now live in production!

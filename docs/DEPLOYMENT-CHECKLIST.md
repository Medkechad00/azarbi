# Deployment Checklist - Azarbi

**Status**: ✅ Ready for Deployment

---

## Pre-Deployment Verification

### Build Status
- ✅ **TypeScript**: No errors found
- ✅ **Build**: Successfully completes (`npm run build`)
- ✅ **Linting**: No critical issues
- ✅ **Dependencies**: All resolved, no conflicts

### Code Quality
- ✅ **Icon Dependencies**: Updated from `phosphor-react` to `@phosphor-icons/react`
- ✅ **Package.json**: Dependencies properly sorted and organized
- ✅ **Next.js Config**: Properly configured with security headers
- ✅ **Middleware**: Correctly set up for auth/routing
- ✅ **Environment Variables**: All required vars referenced

---

## Required Environment Variables

Before deploying, ensure these are set in your deployment platform:

### Supabase
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key

### Stripe
- `STRIPE_SECRET_KEY` - Stripe secret key (server-side only)
- `STRIPE_WEBHOOK_SECRET` - Webhook signing secret

### Email (Resend)
- `RESEND_API_KEY` - Resend email service API key

### Site Configuration
- `NEXT_PUBLIC_SITE_URL` - Your domain (e.g., https://azarbi.com)

---

## Deployment Platforms Recommended

### Vercel (Recommended)
- ✅ Optimal Next.js 16 support
- ✅ Edge Functions compatibility
- ✅ Automatic CI/CD
- ✅ Environment variable management

**Steps:**
1. Connect GitHub repo to Vercel
2. Set environment variables in Project Settings
3. Deploy from `main` branch

### Other Platforms
- AWS Amplify
- Netlify (with limitations)
- Docker/Self-hosted

---

## Pre-Deployment Checklist

### Security
- [ ] All API keys are secrets (not in code)
- [ ] Environment variables are configured in deployment platform
- [ ] Security headers are enabled in `next.config.ts`
- [ ] CORS/rate limiting is configured (if needed)

### Configuration
- [ ] `NEXT_PUBLIC_SITE_URL` matches your domain
- [ ] Supabase URLs are correct for production
- [ ] Stripe webhook URL is configured in Stripe dashboard
- [ ] Resend domain is verified

### Database
- [ ] Supabase database migrations are applied
- [ ] RLS (Row Level Security) policies are active
- [ ] Database backups are configured

### DNS
- [ ] Domain DNS is pointing to your hosting
- [ ] SSL certificate is valid

### Testing
- [ ] Test checkout flow end-to-end
- [ ] Test admin login
- [ ] Verify API routes respond correctly
- [ ] Check image CDN paths resolve correctly

---

## Post-Deployment Verification

### Performance
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Monitor first deployment for errors

### Functionality
- [ ] Homepage loads correctly
- [ ] Product pages display
- [ ] Cart functionality works
- [ ] Checkout process completes
- [ ] Admin panel is accessible
- [ ] Email notifications send

### Monitoring
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Monitor API response times
- [ ] Watch for database connection issues

---

## Build Output Summary

```
Build Type: Next.js 16 (Turbopack)
React Version: 19.2.4
TypeScript: Yes
CSS: Tailwind CSS 3.4.19
Icons: lucide-react + @phosphor-icons/react
Database: Supabase + Postgres
Payment: Stripe
Email: Resend

Routes Generated: 45+
Static Routes: 2
Dynamic Routes: 43+
```

---

## Potential Issues & Solutions

### Middleware Deprecation Warning
- **Issue**: "middleware file convention is deprecated. Please use proxy instead"
- **Status**: Non-blocking, informational only
- **Impact**: None on deployment
- **Note**: Current implementation is fully compatible

### Image Optimization
- **Unoptimized**: Enabled by default in config
- **Formats**: Supports AVIF and WebP
- **CDNs**: Supabase and Unsplash integrated

### Server Actions
- **Body Size Limit**: 50MB configured
- **Suitable for**: Large file uploads

---

## Quick Deploy Commands

```bash
# Local build verification
npm run build

# Build size analysis
npm run build && du -sh .next

# Start production server (local testing)
npm start
```

---

## Rollback Plan

If issues occur post-deployment:

1. **Immediate Rollback**: Redeploy previous commit from git
2. **Database Rollback**: Use Supabase backup/point-in-time restore
3. **Contact Support**: Reach out to hosting provider

---

## Monitoring & Maintenance

### Weekly
- [ ] Check error logs
- [ ] Monitor database performance
- [ ] Review Stripe transaction status

### Monthly
- [ ] Run security audit
- [ ] Update dependencies (`npm outdated`)
- [ ] Review Core Web Vitals

### Quarterly
- [ ] Database optimization
- [ ] Cache invalidation review
- [ ] Performance audit

---

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.io/docs
- **Stripe Docs**: https://stripe.com/docs
- **Vercel Deploy**: https://vercel.com/docs

---

**Last Updated**: June 11, 2026  
**Ready for Production**: Yes ✅

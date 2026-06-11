# Environment Variables Setup Guide

## Overview

This document outlines all required and optional environment variables for the Azarbi application.

---

## Required Environment Variables

### Supabase Authentication & Database

```bash
# REQUIRED - Your Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# REQUIRED - Public anonymous key for Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**How to find:**
1. Go to Supabase Dashboard → Project Settings → API
2. Copy "Project URL" and "anon public" key

### Payment Processing (Stripe)

```bash
# REQUIRED - Stripe secret key (server-side only, NOT public)
STRIPE_SECRET_KEY=sk_live_...

# REQUIRED - Stripe webhook signing secret
STRIPE_WEBHOOK_SECRET=whsec_...
```

**How to find:**
1. Go to Stripe Dashboard → Developers → API Keys
2. Copy the Secret Key
3. For webhook secret: Developers → Webhooks → View details (of your endpoint)

### Email Service (Resend)

```bash
# REQUIRED - Resend API key for transactional emails
RESEND_API_KEY=re_...
```

**How to find:**
1. Go to Resend Dashboard → API Keys
2. Copy your API key

### Site Configuration

```bash
# RECOMMENDED - Your production domain
NEXT_PUBLIC_SITE_URL=https://azarbi.com
```

---

## Optional Environment Variables

```bash
# For future use - Google Analytics verification
# GOOGLE_SITE_VERIFICATION=...

# For future use - Sentry error tracking
# SENTRY_AUTH_TOKEN=...
```

---

## Setup Instructions

### For Local Development

1. **Create `.env.local` file** in the project root:
   ```bash
   cp .env.local.example .env.local
   ```

2. **Fill in the values** from your service providers:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   STRIPE_SECRET_KEY=<your-stripe-secret-key>
   STRIPE_WEBHOOK_SECRET=<your-stripe-webhook-secret>
   RESEND_API_KEY=<your-resend-api-key>
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

### For Production (Vercel)

1. **Go to Vercel Project Settings** → Environment Variables

2. **Add each variable**:
   - `NEXT_PUBLIC_SUPABASE_URL` = `<production-url>`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `<production-key>`
   - `STRIPE_SECRET_KEY` = `<production-secret-key>`
   - `STRIPE_WEBHOOK_SECRET` = `<webhook-secret>`
   - `RESEND_API_KEY` = `<api-key>`
   - `NEXT_PUBLIC_SITE_URL` = `https://azarbi.com`

3. **Important**: Variables starting with `NEXT_PUBLIC_` will be exposed to the browser. Never put secrets there.

### For Production (Self-hosted/Docker)

1. **Create `.env.production` file**:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=<production-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<production-key>
   STRIPE_SECRET_KEY=<production-secret-key>
   STRIPE_WEBHOOK_SECRET=<webhook-secret>
   RESEND_API_KEY=<api-key>
   NEXT_PUBLIC_SITE_URL=https://azarbi.com
   ```

2. **Build the application**:
   ```bash
   npm run build
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

---

## Environment Variables by Service

### Supabase Configuration

| Variable | Required | Exposed | Purpose |
|----------|----------|---------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Public | Database & Auth endpoint |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Public | Anonymous key for auth |

**Credentials Location**: Supabase Dashboard → Project Settings → API

### Stripe Configuration

| Variable | Required | Exposed | Purpose |
|----------|----------|---------|---------|
| `STRIPE_SECRET_KEY` | Yes | **No** | Payment processing |
| `STRIPE_WEBHOOK_SECRET` | Yes | **No** | Webhook validation |

**Credentials Location**: Stripe Dashboard → Developers → API Keys/Webhooks

**⚠️ Security Note**: 
- `STRIPE_SECRET_KEY` should NEVER be exposed to the browser
- Keep it strictly in `.env.local` or server environment variables
- If accidentally committed, rotate the key immediately

### Resend Configuration

| Variable | Required | Exposed | Purpose |
|----------|----------|---------|---------|
| `RESEND_API_KEY` | Yes | **No** | Email delivery |

**Credentials Location**: Resend Dashboard → API Keys

---

## Variable Visibility

### Public Variables (Browser-exposed)
These can be accessed in the browser (via `NEXT_PUBLIC_` prefix):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`

### Secret Variables (Server-only)
These should NEVER be exposed to the browser:
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`

---

## Validation

The application will fail to start if required variables are missing. Error messages will indicate which variables are needed.

**To validate locally**:
```bash
npm run build
```

This will show any missing environment variable errors before deployment.

---

## Security Best Practices

1. ✅ **Never commit `.env.local`** - Add to `.gitignore` (already included)
2. ✅ **Use strong, unique keys** for each environment
3. ✅ **Rotate keys periodically** through your service providers
4. ✅ **Use different keys** for development, staging, and production
5. ✅ **Keep webhook secrets** separate from API keys
6. ✅ **Monitor usage** of each API key regularly

---

## Troubleshooting

### "Cannot find module" errors during build

**Problem**: Build fails with module resolution errors

**Solution**: Ensure all environment variables are set before running `npm run build`

### "Supabase auth not working" in production

**Problem**: Auth fails after deployment

**Solution**: 
1. Verify `NEXT_PUBLIC_SUPABASE_URL` matches production Supabase project
2. Check that `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
3. Enable CORS in Supabase for your domain

### Stripe webhook not triggering

**Problem**: Webhook events not being processed

**Solution**:
1. Verify `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard
2. Check webhook endpoint URL in Stripe dashboard
3. Review Stripe logs for error messages

### Emails not sending

**Problem**: Order confirmation emails not received

**Solution**:
1. Verify `RESEND_API_KEY` is valid
2. Check Resend dashboard for failed sends
3. Ensure domain is verified in Resend (for custom domains)

---

## Additional Resources

- **Supabase Docs**: https://supabase.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Resend Docs**: https://resend.com/docs
- **Next.js Env Vars**: https://nextjs.org/docs/basic-features/environment-variables

---

**Last Updated**: June 11, 2026

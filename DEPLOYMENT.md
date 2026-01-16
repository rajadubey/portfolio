# Deployment Guide

This guide covers deploying the portfolio to production on Vercel and post-deployment tasks.

## Prerequisites

- Vercel account
- MongoDB Atlas database
- ImageKit account
- GitHub repository connected to Vercel

## Task 19.1: Configure Environment Variables in Vercel

### Required Environment Variables

1. **Database Configuration**
   ```
   DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   ```
   - Get from MongoDB Atlas connection string
   - Ensure IP whitelist includes Vercel's IP ranges (or use 0.0.0.0/0 for all IPs)

2. **Payload CMS Secret**
   ```
   PAYLOAD_SECRET=your-secure-random-string-here
   ```
   - Generate a secure random string (minimum 32 characters)
   - Use: `openssl rand -base64 32` to generate

3. **ImageKit Configuration**
   ```
   IMAGEKIT_PUBLIC_KEY=your_public_key_here
   IMAGEKIT_PRIVATE_KEY=your_private_key_here
   IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
   ```
   - Get from ImageKit dashboard

4. **Server URL**
   ```
   NEXT_PUBLIC_SERVER_URL=https://www.rajadubey.in
   ```
   - Set to your production domain

### Steps to Configure in Vercel

1. Go to your project in Vercel Dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable with the following settings:
   - **Environment**: Production, Preview, Development (select all)
   - **Name**: Variable name (e.g., DATABASE_URI)
   - **Value**: Variable value
4. Click "Save"
5. Redeploy the application for changes to take effect

## Task 19.2: Deploy to Production

### Initial Deployment

1. **Connect Repository to Vercel**
   ```bash
   # If not already connected
   vercel link
   ```

2. **Build and Deploy**
   ```bash
   # Deploy to production
   vercel --prod
   ```

3. **Verify Build Success**
   - Check Vercel dashboard for build logs
   - Ensure no build errors
   - Verify all environment variables are set

### Deployment Checklist

- [ ] All environment variables configured
- [ ] MongoDB Atlas IP whitelist updated
- [ ] ImageKit credentials valid
- [ ] Build completes successfully
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] All tests pass locally

### Post-Deployment Verification

1. **Test Homepage**
   - Visit https://www.rajadubey.in
   - Verify content loads correctly
   - Check for console errors

2. **Test CMS Data**
   - Verify profile information displays
   - Check experience section
   - Verify projects load
   - Check skills section

3. **Test Images**
   - Verify all images load from ImageKit
   - Check image transformations work
   - Verify lazy loading

4. **Test SEO Elements**
   - Check robots.txt: https://www.rajadubey.in/robots.txt
   - Check sitemap: https://www.rajadubey.in/sitemap.xml
   - Verify meta tags in page source
   - Check JSON-LD structured data

5. **Test Performance**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Verify page load speed

## Task 19.3: Submit Sitemap to Google Search Console

### Setup Google Search Console

1. **Add Property**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Click "Add Property"
   - Enter: https://www.rajadubey.in
   - Choose verification method (DNS or HTML file)

2. **Verify Ownership**
   - **DNS Verification** (Recommended):
     - Add TXT record to domain DNS
     - Wait for propagation (up to 48 hours)
     - Click "Verify"
   
   - **HTML File Verification**:
     - Download verification file
     - Upload to public folder
     - Deploy to production
     - Click "Verify"

3. **Submit Sitemap**
   - Go to Sitemaps section
   - Enter: `sitemap.xml`
   - Click "Submit"
   - Wait for Google to process (can take a few days)

4. **Monitor Indexing**
   - Check "Coverage" report for indexing status
   - Monitor "Performance" for search analytics
   - Fix any errors reported

### Expected Results

- Homepage indexed within 1-2 days
- All project pages indexed within 1 week
- Search appearance with rich snippets (Person schema)

## Task 19.4: Run Post-Deployment SEO Audit

### Lighthouse Audit

1. **Run Audit**
   ```bash
   # Using Chrome DevTools
   # 1. Open DevTools (F12)
   # 2. Go to Lighthouse tab
   # 3. Select categories: Performance, Accessibility, Best Practices, SEO
   # 4. Click "Analyze page load"
   ```

2. **Target Scores**
   - Performance: > 90
   - Accessibility: > 90
   - Best Practices: > 90
   - SEO: > 90

3. **Core Web Vitals**
   - LCP (Largest Contentful Paint): < 2.5s
   - FID (First Input Delay): < 100ms
   - CLS (Cumulative Layout Shift): < 0.1
   - INP (Interaction to Next Paint): < 200ms

### SEO Checklist

- [ ] Meta title and description present
- [ ] Open Graph tags configured
- [ ] Twitter Card tags configured
- [ ] Canonical URL set
- [ ] robots.txt accessible
- [ ] sitemap.xml accessible
- [ ] JSON-LD structured data present
- [ ] All images have alt text
- [ ] Heading hierarchy correct (h1 → h2 → h3)
- [ ] Internal links use Next.js Link
- [ ] External links have rel="noopener noreferrer"
- [ ] HTTPS enabled
- [ ] Mobile-friendly (responsive design)
- [ ] Touch targets minimum 44x44px
- [ ] No broken links

### SEO Tools

1. **Google PageSpeed Insights**
   - URL: https://pagespeed.web.dev/
   - Test: https://www.rajadubey.in
   - Check both mobile and desktop scores

2. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Test: https://www.rajadubey.in
   - Verify Person schema detected

3. **Google Mobile-Friendly Test**
   - URL: https://search.google.com/test/mobile-friendly
   - Test: https://www.rajadubey.in
   - Verify mobile-friendly status

4. **SEMrush Site Audit** (Optional)
   - Run comprehensive SEO audit
   - Target health score: > 90
   - Fix any critical issues

### Monitoring

1. **Google Search Console**
   - Monitor indexing status
   - Check for crawl errors
   - Review search performance

2. **Google Analytics** (Optional)
   - Track page views
   - Monitor user behavior
   - Analyze traffic sources

3. **Vercel Analytics**
   - Already integrated
   - Monitor Core Web Vitals
   - Track page performance

## Continuous Deployment

### Automatic Deployments

Vercel automatically deploys on:
- Push to main branch → Production deployment
- Push to other branches → Preview deployment
- Pull requests → Preview deployment

### Manual Deployments

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

## Rollback

If issues occur after deployment:

```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]
```

Or use Vercel Dashboard:
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Verify environment variables are set
3. Test build locally: `npm run build`
4. Check for TypeScript errors: `npm run lint`

### CMS Data Not Loading

1. Verify DATABASE_URI is correct
2. Check MongoDB Atlas IP whitelist
3. Verify PAYLOAD_SECRET is set
4. Check server logs in Vercel

### Images Not Loading

1. Verify ImageKit credentials
2. Check IMAGEKIT_URL_ENDPOINT format
3. Verify images exist in ImageKit dashboard
4. Check browser console for errors

### SEO Issues

1. Verify robots.txt is accessible
2. Check sitemap.xml generates correctly
3. Verify meta tags in page source
4. Run Lighthouse audit for specific issues

## Support

- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Payload CMS Documentation: https://payloadcms.com/docs
- ImageKit Documentation: https://docs.imagekit.io/

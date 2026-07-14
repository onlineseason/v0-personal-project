# Next Steps for Portfolio v2

## Immediate Tasks (Required Before Going Live)

### 1. Supabase Setup
- [ ] Create Supabase project (if not done)
- [ ] Run migration SQL from `/supabase/migrations/001_create_schema.sql`
- [ ] Run seed SQL from `/supabase/seed.sql`
- [ ] Create admin user in Supabase Auth
- [ ] Copy environment variables to project settings

### 2. Environment Configuration
- [ ] Set `NEXT_PUBLIC_SUPABASE_URL` in Vercel project
- [ ] Set `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel project
- [ ] Set `SUPABASE_SERVICE_ROLE_KEY` in Vercel project
- [ ] Create `.env.local` for local development with same variables

### 3. Testing
- [ ] Test admin login at `/admin/login`
- [ ] Test admin dashboard loads correctly
- [ ] Test projects display on public `/projects` page
- [ ] Test contact form submission saves to Supabase
- [ ] Test command palette with `⌘K` / `Ctrl+K`

### 4. Git & Deploy
- [ ] Commit all changes to `portfolio-upgrade` branch
- [ ] Create pull request to main
- [ ] Review changes and merge
- [ ] Trigger Vercel deployment

---

## Stub Features (Need Implementation)

### Admin Project Edit Page
**File:** `/app/admin/projects/[id]/page.tsx` (needs to be created)

Should include:
- Form fields: title, slug, description, image_url, link, tags, published status
- Save to Supabase
- Navigate back to projects list
- Error handling

**Reference Component:**
```tsx
// Use react-hook-form + shadcn/ui form components
// Similar to contact form but for project data
```

### Admin Post Edit Page
**File:** `/app/admin/posts/[id]/page.tsx` (needs to be created)

Should include:
- Markdown editor (`@uiw/react-md-editor`)
- Title, slug, excerpt fields
- Cover image URL
- Tags array input
- Publish button
- Live preview pane (split screen)

### Admin New Pages
**Files:**
- `/app/admin/projects/new/page.tsx`
- `/app/admin/posts/new/page.tsx`

Should be similar to edit pages but with empty forms.

### Public Blog Page (Optional)
**File:** `/app/blog/page.tsx` (optional)

Could display:
- List of all published posts
- Sorting by date
- Search/filter
- Pagination

### Public Post Detail Page (Optional)
**File:** `/app/blog/[slug]/page.tsx` (optional)

Should include:
- Render markdown content
- Display metadata (author, date, reading time)
- Related posts
- Comments section (future)

---

## Enhancement Features (Nice to Have)

### OG Image Generation
**Location:** `/app/projects/[slug]/opengraph-image.tsx` and `/app/blog/[slug]/opengraph-image.tsx`

Uses Next.js `next/og` to generate social media preview images.

### Reading Progress Bar
**Location:** Create new component in `/components/reading-progress.tsx`

Should:
- Be fixed at top of blog posts
- Track scroll position
- Animate with spring physics

### Estimated Read Time
**Location:** Add to blog post detail page

Calculate from word count and display above content.

### Scroll-Triggered Animations
**Upgrade:** `/components/project-card.tsx`

Already has `whileInView`, but could enhance with:
- Staggered reveal on scroll
- More dramatic entrance animations
- Parallax effects

### Magnetic CTA Buttons
**Location:** Create new component `/components/magnetic-button.tsx`

Buttons that follow mouse cursor with spring physics.

### Animated Stat Counters
**Location:** Add to home page awards section

Use `useSpring` / `useTransform` to count up numbers when scrolled into view.

---

## Code Quality Tasks

### Remove Unused Imports
- [ ] Audit all files for unused imports
- [ ] Clean up any leftover `data/projects.ts` references if not needed

### Type Safety
- [ ] Ensure all Supabase operations have proper TypeScript types
- [ ] Add error boundaries for admin pages
- [ ] Add loading states to all async operations

### Testing
- [ ] Add unit tests for Supabase queries
- [ ] Test RLS policies restrict access properly
- [ ] E2E tests for admin workflows
- [ ] Load test Supabase queries

### Documentation
- [ ] Add JSDoc comments to all utility functions
- [ ] Document admin workflows in separate guide
- [ ] Create user guide for content editing

---

## Deployment Checklist

### Before Merging to Main
- [ ] All environment variables configured in Vercel
- [ ] Supabase production project set up
- [ ] Admin user created in production
- [ ] No console errors in development
- [ ] Mobile responsive tested
- [ ] Command palette tested on mobile
- [ ] Admin routes require authentication

### Post-Deployment
- [ ] Test live site loads correctly
- [ ] Verify Supabase data is displaying
- [ ] Test contact form on production
- [ ] Confirm admin panel works on production
- [ ] Monitor Vercel analytics
- [ ] Set up error tracking (Sentry optional)

---

## Performance Optimizations (Optional)

### Caching Strategy
- [ ] Enable ISR (Incremental Static Regeneration) for projects/posts
- [ ] Implement SWR for client-side data fetching
- [ ] Add database query result caching

### Image Optimization
- [ ] Use Next.js Image component for all images
- [ ] Compress existing project images
- [ ] Set up image optimization in Supabase Storage

### Bundle Size
- [ ] Analyze bundle with `next/bundle-analyzer`
- [ ] Lazy load Command Palette (only load on key press)
- [ ] Code split admin pages

---

## Future Roadmap

### Phase 2 (Months 2-3)
- [ ] Blog/articles page with search
- [ ] Email notifications for new messages
- [ ] Admin analytics dashboard
- [ ] Dark mode improvements
- [ ] Multi-language support

### Phase 3 (Months 4+)
- [ ] User comments on blog posts
- [ ] Newsletter signup integration
- [ ] Social media feeds integration
- [ ] Booking/calendar system
- [ ] Video hosting integration

---

## Commands Reference

### Development
```bash
# Start dev server
pnpm dev

# Build for production (requires env vars)
pnpm build

# Format code
pnpm lint
```

### Database
```bash
# Run Supabase migration (via SQL Editor)
-- Paste content of /supabase/migrations/001_create_schema.sql

# Seed test data (via SQL Editor)
-- Paste content of /supabase/seed.sql
```

### Deployment
```bash
# Push to GitHub (already configured)
git push origin portfolio-upgrade

# Merge to main (via GitHub PR)
# Vercel auto-deploys on merge
```

---

## Support & Debugging

### Common Issues & Solutions

**"Missing environment variables" on build:**
- Add all three SUPABASE env vars to Vercel project settings
- Rebuild after adding variables

**"Admin login loops to login page":**
- Check localStorage for session data
- Verify user exists in Supabase Auth
- Clear cookies and retry

**"Projects don't show on public page":**
- Verify database migration ran successfully
- Check seed.sql was executed
- Look at Supabase Logs tab for errors

**"Contact form doesn't submit":**
- Open browser DevTools → Network
- Check request to `/api/actions/contact`
- Look for RLS policy errors in Supabase

---

## Questions?

Refer to:
- `PORTFOLIO_V2_SETUP.md` - Setup instructions
- `IMPLEMENTATION_SUMMARY.md` - What was built
- `SUPABASE.md` - Supabase configuration notes (existing)

---

**Last Updated:** 2025-03-21
**Project Status:** Feature-Complete, Ready for Integration Testing

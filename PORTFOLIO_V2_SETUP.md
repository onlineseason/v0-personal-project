# Portfolio v2 Setup Guide

## Overview

This document outlines the setup required for the Portfolio v2 upgrade, including Supabase configuration and data migration.

## Prerequisites

- Node.js 16+ and pnpm installed
- Supabase account and project created
- Environment variables configured

## Step 1: Supabase Configuration

### Create the database schema

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the migration script from `/supabase/migrations/001_create_schema.sql`

This will create:
- `projects` table with RLS policies
- `posts` table with RLS policies  
- `messages` table with RLS policies

### Seed initial data

1. In the SQL Editor, run the script from `/supabase/seed.sql`
2. This migrates existing data from the `data/` directory into the Supabase tables

## Step 2: Environment Variables

Add the following to your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Step 3: Create Admin Account

1. Go to your Supabase project → Authentication → Users
2. Create a new user with your admin email (e.g., `trdcomnp@gmail.com`)
3. Set a secure password
4. Note: Only authenticated users can access admin routes

## Step 4: Install Dependencies

```bash
pnpm install
```

New packages added for this upgrade:
- `cmdk` - Command palette
- `react-markdown` - Markdown rendering
- `remark-gfm` - GitHub Flavored Markdown
- `@uiw/react-md-editor` - Markdown editor
- `recharts` - Charts and visualizations
- `@hookform/resolvers` - Form validation

## Step 5: Run Development Server

```bash
pnpm dev
```

## Feature Overview

### Admin Panel (`/admin`)

- **Login**: `/admin/login` - Email/password authentication via Supabase
- **Dashboard**: `/admin` - Overview of stats (projects, posts, unread messages)
- **Projects**: `/admin/projects` - CRUD operations for projects
- **Posts**: `/admin/posts` - CRUD operations for blog posts
- **Messages**: `/admin/messages` - View and manage contact form submissions

### Public Site

- **Projects Page**: Displays published projects from Supabase
- **Contact Form**: Submits directly to Supabase (no Nodemailer)
- **Command Palette**: Press `⌘K` to search projects, posts, and navigate

### Middleware Protection

- Routes under `/admin/*` (except login) are protected by session middleware
- Non-authenticated users are redirected to `/admin/login`

## Removing Nodemailer

Since contact form submissions now go directly to Supabase:

1. Remove Nodemailer dependencies from `package.json` (optional):
   ```bash
   pnpm remove nodemailer @types/nodemailer
   ```

2. Delete the contact action's Nodemailer setup - already done in the updated file

3. Environment variables no longer needed:
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`

## Data Migration Notes

- Existing data from `/data/projects.ts` and `/data/blog-posts.ts` is seeded into the database
- Keep these files as backup or reference
- The app now fetches all data from Supabase instead of static imports

## Next Steps

1. Set up the database schema in Supabase
2. Run the seed script to migrate existing data
3. Create an admin user in Supabase Auth
4. Configure environment variables
5. Start the dev server and test:
   - Admin login at `/admin/login`
   - Projects display from Supabase
   - Contact form submissions

## Troubleshooting

### Admin login not working
- Check that Supabase environment variables are set correctly
- Verify the admin user exists in Supabase Auth
- Check browser console for CORS or authentication errors

### Projects not displaying
- Ensure the database schema was created
- Run the seed script to populate test data
- Check that `published = true` in the database

### Contact form not saving
- Verify the `messages` table exists with correct schema
- Check RLS policies allow inserts for unauthenticated users
- Look at browser console for error messages

## Feature Roadmap

Future enhancements to consider:
- Post markdown editor with live preview
- Project image uploads to Supabase Storage
- Message email notifications via Edge Functions
- Analytics dashboard
- Dark mode toggle preservation
- OG image generation for social shares

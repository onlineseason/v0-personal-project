# Supabase Integration Guide

This guide explains how to set up and use Supabase for the backend of your personal website.

## What is Supabase?

Supabase is an open-source Firebase alternative that provides:
- 🗄️ PostgreSQL Database
- 🔐 Authentication (optional)
- 🔄 Real-time subscriptions
- 📁 File storage
- 🤖 Auto-generated APIs

Your project: **dornarajbudthapa-website** (ap-south-1, Free tier)

## Current Integration

### Contact Form Submission Storage

The contact form now automatically saves messages to Supabase when someone submits the form:

1. Form data is validated
2. Message is saved to the `contact_messages` table
3. Email notification is sent (existing functionality)
4. User receives confirmation

## Setting Up Supabase Tables

### 1. Contact Messages Table

Log in to your [Supabase Dashboard](https://app.supabase.com) and create this table:

```sql
CREATE TABLE contact_messages (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  read BOOLEAN DEFAULT FALSE
);

-- Create index on email for quick lookups
CREATE INDEX idx_contact_messages_email ON contact_messages(email);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
```

Or use the Supabase Dashboard UI:
1. Go to **SQL Editor** → **New Query**
2. Paste the SQL above
3. Click **Run**

### 2. Database Access

Your Supabase credentials are already configured:
- **URL**: `https://fdfiirizrbsnecqplpyx.supabase.co`
- **Anon Key**: Environment variable `NEXT_PUBLIC_SUPABASE_ANON_KEY`

These are set in:
- Local: `.env.local`
- Production: Cloudflare Pages environment variables

## Environment Variables

Add to your `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://fdfiirizrbsnecqplpyx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkZmlpcml6cmJzbmVjcXBscHl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MzMxOTksImV4cCI6MjA5NTIwOTE5OX0.Eweyw42ZhJ8TpUPkCVEJfiWILF93B1RaV9AFeomls5M
```

For Cloudflare Pages:
1. Go to **Settings** → **Environment Variables**
2. Add both variables with the values above
3. Set them for **Production** environment

## Using Supabase in Your Code

### Import the Supabase Client

```typescript
import { supabase } from '@/lib/supabase'
```

### Example: Query Data

```typescript
// Fetch all contact messages
const { data, error } = await supabase
  .from('contact_messages')
  .select('*')
  .order('created_at', { ascending: false })

// Fetch with filters
const { data } = await supabase
  .from('contact_messages')
  .select('*')
  .eq('email', 'user@example.com')

// Fetch unread messages
const { data } = await supabase
  .from('contact_messages')
  .select('*')
  .eq('read', false)
```

### Example: Insert Data

```typescript
const { error } = await supabase
  .from('contact_messages')
  .insert([
    {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello!',
    }
  ])
```

### Example: Update Data

```typescript
const { error } = await supabase
  .from('contact_messages')
  .update({ read: true })
  .eq('id', 123)
```

## Security & Row Level Security (RLS)

### Current Setup (Anonymous Access)

The anon key allows read/write access for development. For production, implement Row Level Security:

```sql
-- Enable RLS on contact_messages table
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for contact form)
CREATE POLICY "Enable insert for all users" ON contact_messages
  FOR INSERT
  WITH CHECK (true);

-- Only allow admin to read
CREATE POLICY "Enable read for authenticated users" ON contact_messages
  FOR SELECT
  USING (auth.role() = 'authenticated');
```

Then use a service role key in server-side code to bypass RLS.

## Future Enhancements

### Add More Tables

```sql
-- Blog posts
CREATE TABLE blog_posts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects
CREATE TABLE projects (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  github_url TEXT,
  live_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter subscribers
CREATE TABLE subscribers (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email TEXT UNIQUE NOT NULL,
  subscribed BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Add Authentication

```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure-password',
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'secure-password',
})

// Sign out
await supabase.auth.signOut()

// Get current user
const { data: { user } } = await supabase.auth.getUser()
```

## Useful Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Client Library](https://supabase.com/docs/reference/javascript)
- [SQL Reference](https://supabase.com/docs/guides/database)
- [Dashboard](https://app.supabase.com)

## Troubleshooting

### Messages not saving?
1. Check Supabase Dashboard → **SQL Editor** → verify `contact_messages` table exists
2. Check browser console for errors
3. Verify environment variables are set correctly

### Can't connect to Supabase?
1. Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
2. Check if the keys are still valid in Supabase Dashboard → **Settings** → **API**
3. Ensure table permissions allow inserts

### Cloudflare Pages deployment issues?
1. Add environment variables in Cloudflare dashboard
2. Rebuild and redeploy
3. Check deployment logs for errors

## Free Tier Limits

Your Supabase free tier includes:
- ✅ 500MB database storage
- ✅ 1GB bandwidth/month
- ✅ Up to 50,000 rows
- ✅ Real-time features
- ✅ Full SQL access

Upgrade to Pro anytime if you need more capacity.

---

**Last Updated**: May 2026

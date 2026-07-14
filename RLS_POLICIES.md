# Supabase RLS Policies - Critical for Production

## Overview
Row Level Security (RLS) policies control who can access what data. Without proper RLS policies set, all your data is exposed or inaccessible.

## Required Policies

### 1. **projects** table - Public Read Access
**Why this is critical:** Your home page and projects page fetch published projects on every page load. If this policy doesn't exist or is missing `published = true`, the page fails to load.

```sql
-- Allow anyone to read published projects (no auth required)
create policy "public read published projects"
  on projects
  for select
  using (published = true);

-- Allow authenticated admins to see all projects
create policy "admin full access projects"
  on projects
  for all
  using (auth.uid() is not null);
```

**Enable RLS on projects table:**
```sql
alter table projects enable row level security;
```

---

### 2. **posts** table - Public Read Access
**Why this is critical:** Blog listing pages fetch published posts. Without public read access, all blog pages 404.

```sql
-- Allow anyone to read published posts (no auth required)
create policy "public read published posts"
  on posts
  for select
  using (published = true);

-- Allow authenticated admins to manage posts
create policy "admin full access posts"
  on posts
  for all
  using (auth.uid() is not null);
```

**Enable RLS on posts table:**
```sql
alter table posts enable row level security;
```

---

### 3. **messages** table - Contact Form Access
**Why this is critical:** Contact form must allow anyone to insert; only admins can read.

```sql
-- Allow anyone to insert contact messages (no auth required)
create policy "anyone can insert messages"
  on messages
  for insert
  with check (true);

-- Allow authenticated admins to read messages
create policy "admin read messages"
  on messages
  for select
  using (auth.uid() is not null);

-- Allow authenticated admins to update read status
create policy "admin update messages"
  on messages
  for update
  using (auth.uid() is not null);
```

**Enable RLS on messages table:**
```sql
alter table messages enable row level security;
```

---

## Common RLS Problems

### ❌ Problem 1: No policies at all
**Symptom:** Page loads but shows "0 results" or blank sections  
**Fix:** Run the CREATE POLICY statements above

### ❌ Problem 2: RLS enabled but no public read policy
**Symptom:** Only authenticated users see content; 401 Unauthorized for public viewers  
**Fix:** Create policies with `using (true)` or `using (published = true)` for public access

### ❌ Problem 3: Admin policy uses wrong condition
**Symptom:** Authenticated users see 403 Forbidden  
**Cause:** Policy checking `auth.uid() = user_id` but data has different user_id  
**Fix:** Use `auth.uid() is not null` or verify the user_id in your data matches

### ❌ Problem 4: Policies created but RLS not enabled on table
**Symptom:** Policies exist but data is still visible to everyone (or invisible)  
**Fix:** Run `alter table TABLE_NAME enable row level security;`

---

## Verification Checklist

After creating policies, verify in Supabase dashboard:

1. **Go to SQL Editor**
2. **Run this query:**
```sql
select table_name, reloptions 
from pg_class 
where relname in ('projects', 'posts', 'messages')
and reloptions ? 'check_option=local';
```
✅ Should return 3 rows (RLS enabled on all three tables)

3. **Check policies exist:**
```sql
select table_name, policyname, qual, with_check 
from pg_policies 
where table_name in ('projects', 'posts', 'messages')
order by table_name;
```
✅ Should return all policies listed above

4. **Test as anonymous user** (Supabase dashboard → Authentication → Change to "Anonymous"):
   - Projects page should show content
   - Posts should be readable
   - Contact form should allow inserts

---

## Testing in Code

The error messages will show up in your Next.js console as:

```
[Supabase] Error fetching projects: {
  code: "42P01",           // Table doesn't exist
  message: "relation \"projects\" does not exist"
}

[Supabase] Error fetching projects: {
  code: "42501",           // RLS policy violation
  message: "permission denied for schema public"
}
```

If you see these errors, RLS policies need to be created or fixed.

---

## Migration Script

Run this in Supabase SQL Editor to set up everything:

```sql
-- Create policies for projects
create policy "public read published projects" on projects
  for select using (published = true);
create policy "admin full access projects" on projects
  for all using (auth.uid() is not null);

-- Create policies for posts
create policy "public read published posts" on posts
  for select using (published = true);
create policy "admin full access posts" on posts
  for all using (auth.uid() is not null);

-- Create policies for messages
create policy "anyone can insert messages" on messages
  for insert with check (true);
create policy "admin read messages" on messages
  for select using (auth.uid() is not null);
create policy "admin update messages" on messages
  for update using (auth.uid() is not null);

-- Enable RLS on all tables
alter table projects enable row level security;
alter table posts enable row level security;
alter table messages enable row level security;
```


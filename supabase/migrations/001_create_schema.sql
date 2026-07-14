-- Create projects table
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  problem text,
  approach text,
  outcome text,
  image_url text,
  link text,
  tags text[],
  published boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Create posts table
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  cover_image text,
  tags text[],
  published boolean default true,
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Create messages table
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  body text not null,
  read boolean default false,
  created_at timestamptz default now()
);

-- Enable RLS
alter table projects enable row level security;
alter table posts enable row level security;
alter table messages enable row level security;

-- RLS Policies for projects
create policy "public read published projects" on projects
  for select using (published = true);

create policy "admin full access projects" on projects
  for all using (auth.uid() is not null);

-- RLS Policies for posts
create policy "public read published posts" on posts
  for select using (published = true);

create policy "admin full access posts" on posts
  for all using (auth.uid() is not null);

-- RLS Policies for messages
create policy "anyone can insert messages" on messages
  for insert with check (true);

create policy "admin read messages" on messages
  for select using (auth.uid() is not null);

create policy "admin update messages" on messages
  for update using (auth.uid() is not null);

-- Create indexes for better query performance
create index if not exists idx_projects_slug on projects(slug);
create index if not exists idx_projects_published on projects(published);
create index if not exists idx_projects_sort_order on projects(sort_order);
create index if not exists idx_posts_slug on posts(slug);
create index if not exists idx_posts_published on posts(published);
create index if not exists idx_messages_read on messages(read);
create index if not exists idx_messages_created_at on messages(created_at);

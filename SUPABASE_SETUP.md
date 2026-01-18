# Supabase Setup Instructions

## Step 1: Create the Database Table

1. Go to your Supabase project dashboard
2. Click on **SQL Editor** in the left sidebar
3. Open the file `supabase_setup.sql` and copy its contents
4. Paste it into the SQL Editor
5. Click **Run** to execute the SQL

This will create:
- A `players` table with the necessary structure
- Indexes for performance
- Row Level Security policies (set to allow all operations for public access)
- Auto-update trigger for the `updated_at` timestamp

## Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (the `anon` key under "Project API keys")

## Step 3: Update the HTML File

1. Open `index.html` in a text editor
2. Find these lines (around line 434-435):
   ```javascript
   const SUPABASE_URL = 'YOUR_SUPABASE_URL';
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
   ```
3. Replace `YOUR_SUPABASE_URL` with your Project URL
4. Replace `YOUR_SUPABASE_ANON_KEY` with your anon key

Example:
```javascript
const SUPABASE_URL = 'https://abcdefghijklmnop.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

## Step 4: Test the Integration

1. Open `index.html` in your web browser
2. Go to the **ENTER DATA** tab
3. Enter a test name and click **LOAD / CREATE PLAYER**
4. Enter some test data and click **SAVE PROGRESS**
5. Check your Supabase dashboard → **Table Editor** → **players** to see if the data was saved

## Troubleshooting

### If you see errors in the browser console:

1. **Check your credentials** - Make sure the URL and key are correct
2. **Check Row Level Security** - The policy should allow all operations (it's set in the SQL)
3. **Check the table exists** - Go to Table Editor and verify the `players` table is there
4. **Check browser console** - Look for specific error messages

### Common Issues:

- **"Invalid API key"** - Double-check your anon key
- **"relation does not exist"** - Run the SQL setup script again
- **"permission denied"** - Check that RLS policies are set correctly

## Security Note

The current setup allows **public read/write access** to the players table. This is fine for a friendly challenge, but if you want to add authentication later, you can modify the RLS policies in Supabase.

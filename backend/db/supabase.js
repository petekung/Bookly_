const { createClient } = require('@supabase/supabase-js');
const ws = require('ws');
require('dotenv').config();

// Polyfill WebSocket for Node.js 20
globalThis.WebSocket = ws;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Warning: Supabase URL or Key is missing in .env file.');
}

const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseKey || 'placeholder_key');

module.exports = supabase;

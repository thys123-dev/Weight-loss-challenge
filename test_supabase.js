// Quick Supabase connection test
// Run with: node test_supabase.js

const SUPABASE_URL = 'https://xdivxobxouyqujyivrfn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_wfC7sCVRP_u8EuOESb5R6A_Z-B9_EuY';

async function testSupabase() {
    try {
        // Test 1: Check if we can connect
        console.log('🔍 Testing Supabase connection...\n');
        
        const response = await fetch(`${SUPABASE_URL}/rest/v1/players?select=count`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'count=exact'
            }
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Connection successful!');
            console.log('📊 Players table data:', data);
            
            // Test 2: Try to get all players
            const playersResponse = await fetch(`${SUPABASE_URL}/rest/v1/players?select=*`, {
                method: 'GET',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (playersResponse.ok) {
                const players = await playersResponse.json();
                console.log(`\n📋 Found ${players.length} player(s) in database:`);
                players.forEach((player, index) => {
                    console.log(`  ${index + 1}. ${player.name} (ID: ${player.id})`);
                });
            } else {
                const error = await playersResponse.text();
                console.log('⚠️  Could not fetch players:', error);
            }
            
        } else {
            const errorText = await response.text();
            console.log('❌ Connection failed!');
            console.log('Error:', errorText);
            
            if (response.status === 404 || errorText.includes('relation') || errorText.includes('does not exist')) {
                console.log('\n💡 Tip: The players table might not exist. Run supabase_setup.sql in your Supabase SQL Editor.');
            }
        }
        
    } catch (error) {
        console.log('❌ Error:', error.message);
        console.log('Stack:', error.stack);
    }
}

testSupabase();

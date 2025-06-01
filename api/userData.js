import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // secret key for backend

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);


export async function addUserToDatabase() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
    throw new Error('User not authenticated');
    }

    const userId = user.id; // This is auth.uid

    console.log("This is the user's id", userId)

    const { error } = await supabase
    .from('users')
    .insert([{ id: userId, username: 'alice' }]);

    if (error) {
    console.error('Error inserting user:', error.message);
    } else {
    console.log('User inserted with matching auth.uid');
    }

}


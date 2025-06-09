import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // secret key for backend

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);


export default async function addUserToDatabase(req, res) {
    const user = req.body.uid

    if (!user) {
    throw new Error('User not authenticated');
    }

    const userId = user.user.id; // This is auth.uid
    const idx = user.user.email.indexOf('@')

    console.log("This is the user's id", userId)
    let { data } = await supabase
    .from('users')
    .select('id')
    .eq('email', user.user.email);

    if (!data || data.length === 0) {
        console.log("User exists man!!!!!!!!!!!!")
        res.status(200).json({state: "User exists man!!!!!!!!!!!!"});
        return
    } else {
        console.log('USER DOES NOT EXIST!!')
    }

    const { error } = await supabase
    .from('users')
    .insert([{ id: userId, username: user.user.email.slice(0, idx) }]);

    if (error) {
        console.error('Error inserting user:', error.message);
        res.status(500).json({ error: error.message });
    } else {
        console.log('User inserted with matching auth.uid');
        res.status(200).json({state: "User inserted with matching auth.uid!!!"});
    }

}


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function addUserToDatabase(id: any) {
    await fetch("http://localhost:3000/addUsertoDatabase", {
        headers: {
        "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ uid: id })

    }).then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error('Error:', error);
    })

}
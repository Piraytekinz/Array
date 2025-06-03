// Auth.tsx
import { useState } from "react";
import { supabase } from '../auth'
import { addUserToDatabase } from "../auth";
import { useNavigate } from "react-router-dom";
import './login.css'


export default function LoginPage({ onAuth }: { onAuth: (e: any) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const signInWithEmail = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        alert(error.message);
    } else {
        onAuth(data.session?.user.id);
        navigate('/home')
    }
  };

  const signUpWithEmail = async () => {
    console.log("signupclicked!")
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        alert(error.message);
    } else {
        onAuth(data.session?.user.id)
        console.log(data.session)
        addUserToDatabase(data.session)
        navigate('/home')
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) alert(error.message);
  };

  const passwordReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail('anangjosh8@gmail.com', {
        redirectTo: 'http://localhost:5173/resetpassword',
    });
    
    if (error) {
        console.error('Error sending password reset email:', error.message);
    } else {
        console.log('Password reset email sent!');
    }
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut({ scope: 'local' });
    if (error) alert (error.message)
  }

  return (
    <div className="login-form">
        <h2>Log in to the Matrix</h2>
        <div className="form">
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="login-buttons">
            <button onClick={signUpWithEmail}>Sign Up</button>
            <button onClick={signInWithEmail}>Sign In</button>
            <button onClick={passwordReset}>Forgot Password?</button>
            <button onClick={logout}>Logout</button>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
    </div>
  );
}

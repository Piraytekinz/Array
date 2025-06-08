// Auth.tsx
import { useContext, useState } from "react";
import { supabase } from '../auth'
// import { addUserToDatabase } from "../auth";
import { useNavigate } from "react-router-dom";
import './login.css'
import { Contexti } from "../components/AppContext";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const context = useContext(Contexti);
    if (!context) {
        throw new Error('AppContext must be used within AppProvider');
    }
    // const { setUID } = context;

  const signInWithEmail = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        setMessage(error.message)
    } else {
        console.log(data.session)
        // onAuth(data.session?.user)
        // setUID(data.session?.user)
        navigate('/home')
    }
  };

  const signUpWithEmail = async () => {
    console.log("signupclicked!")
    const { data, error } = await supabase.auth.signUp({ email, password, options: {
        emailRedirectTo: `${window.location.origin}/home`
      } });
    if (error) {
        setMessage(error.message)
    } else {
        // onAuth(data.session?.user)
        console.log(data.session)
        // addUserToDatabase(data.session)
        // setUID(data.session?.user)
        // navigate('/home')
    }
  };

  const signInWithMagicLink = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
        emailRedirectTo: `${window.location.origin}/home`
    }
    });
    
    if (error) {
        setMessage(error.message)
    } else {
        console.log(data.session)
        setMessage("Magic Link sent to your inbox. Check in spam if not located.")
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: {
        redirectTo: `${window.location.origin}/home`
      }});
    if (error) setMessage(error.message);
  };

  const passwordReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/resetpassword`,
    });
    
    if (error) {
        console.error('Error sending password reset email:', error.message);
        setMessage(error.message)
    } else {
        console.log('Password reset email sent!');
        setMessage("Password reset email sent. Check in spam if not in your inbox.")
    }
  }

//   const logout = async () => {
//     const { error } = await supabase.auth.signOut({ scope: 'local' });
//     if (error) alert (error.message)
//   }

  return (
    <div className="login-form">
        <h2 className="log-in-message">Log in to the Matrix</h2>
        {
            message && <p className='auth-message'>{message}</p>
        }
        <div className="form">
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="login-buttons">
            <button onClick={signUpWithEmail}>Sign Up</button>
            <button onClick={signInWithEmail}>Sign In</button>
            <button onClick={signInWithMagicLink}>Sign In with Magic Link</button>
            <button onClick={passwordReset}>Forgot Password?</button>
            {/* <button onClick={logout}>Logout</button> */}
            <button onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
    </div>
  );
}

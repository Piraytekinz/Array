import { useEffect, useState } from 'react';
import { supabase } from '../auth'; // your initialized supabase client

export default function ResetPassword() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          // User clicked the reset link and is in recovery mode
          setShowForm(true);
          setMessage('Please enter your new password.');
        }
      }
    );

    // Cleanup subscription on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage(`Error updating password: ${error.message}`);
    } else {
      setMessage('Password updated successfully! You can now log in.');
      setShowForm(false);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Reset Your Password</h2>
      {message && <p>{message}</p>}

      {showForm && (
        <form onSubmit={handlePasswordUpdate}>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={{ width: '100%', padding: 8, marginBottom: 10 }}
          />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: 10 }}>
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      )}

      {!showForm && !message && (
        <p>
          Please click the password reset link sent to your email to start the password recovery process.
        </p>
      )}
    </div>
  );
}

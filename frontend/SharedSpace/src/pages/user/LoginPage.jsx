import './LoginPage.css'                                          // Import CSS.
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { BorderedButton } from '../../components/BorderedButton'
import SharedSpaceLogo from '../../assets/SharedSpaceLogo.svg'

// ____________________________________________________________________________________________________

export function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token and user data in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', data.email);
        localStorage.setItem('userType', data.userType);

        navigate('/home');  // Redirects to home page.
      } else {
        setError(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Connection refused. Is the server running?');
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="login-form">
            <div className="section-header">
              Welcome Back!  {/* Header message. */}
            </div>

            {/* Form for user input. */}
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Enter email or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>

              {error && <p style={{ color: '#ff4d4d', textAlign: 'center', margin: '0.5rem 0' }}>{error}</p>}

              <div className="card-button">
                <BorderedButton type="submit" message="Log In" size="purple" />
              </div>
            </form>
          </div>

          <div className="sign-up-prompt">
            <div className="section-header">
              New to Shared Space?  {/* Header message. */}
            </div>

            <div className="section-header2">
              Join a community of fellow artists today!  {/* Subheader message. */}
            </div>

            <div className="login-page-logo">
              <img src={SharedSpaceLogo} alt="Shared Space" className="page-logo" />  {/* Shared space logo. */}
            </div>

            <div className="card-button">
              <Link to="/sign-up">
                <BorderedButton to="/sign-up" message="Sign Up" size="purple" />  {/* Button redirects to sign-up page. */}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// For the login page.
import './LoginPage.css'                                          // Import CSS.
import { Link, useNavigate } from 'react-router-dom'
import { BorderedButton } from '../../components/BorderedButton'
import SharedSpaceLogo from '../../assets/SharedSpaceLogo.svg'

// ____________________________________________________________________________________________________

export function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/home');  // Redirects to home page.
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
              <input type="email" placeholder="Enter email" required />
              <input type="password" placeholder="Enter password" required />

              <div className="card-button">
                <BorderedButton to="/home" message="Log In" size="purple" />  {/* Button redirects to home page. */}
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
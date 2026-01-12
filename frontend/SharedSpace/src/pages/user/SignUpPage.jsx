// For the sign-up page.
import './SignUpPage.css'                                         // Import CSS.
import { Link, useNavigate } from 'react-router-dom'
import { BorderedButton } from '../../components/BorderedButton'
import SharedSpaceLogo from '../../assets/SharedSpaceLogo.svg'

// ____________________________________________________________________________________________________

export function SignUpPage() {
  const navigate = useNavigate();

  const handleCreateAccount = (e) => {
    e.preventDefault();
    navigate('/login');  // Redirects to login page.
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="sign-up-prompt">
            <div className="section-header">
              Already have an account?  {/* Header message. */}
            </div>

            <div className="section-header2">
              Join a community of fellow artists today!  {/* Subheader message. */}
            </div>

            <div className="login-page-logo">
              <img src={SharedSpaceLogo} alt="Shared Space" className="page-logo" />  {/* Shared Space logo. */}
            </div>

            <div className="card-button">
              <Link to="/login">
                <BorderedButton to="/login" message="Log In" size="purple" />  {/* Button redirects to login page. */}
              </Link>
            </div>
          </div>

          <div className="login-form">
            <div className="section-header">
              Create an Account  {/* Header message. */}
            </div>

            {/* Form for user input. */}
            <form onSubmit={handleCreateAccount}>
              <input type="email" placeholder="Enter email" required />
              <input type="text" placeholder="Enter username" required />
              <input type="password" placeholder="Enter password" required />
              <input type="password" placeholder="Confirm password" required />

              <div className="card-button">
                <BorderedButton to="/login" message="Sign Up" size="purple" />  {/* Button redirects to login page. */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

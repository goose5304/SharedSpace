export function LoginPage() {
  return (
    <>
        <div>
            <h1>Welcome Back</h1>

            <form>
                <input type = "email" placeholder = "Enter email"/>
                <input type = "password" placeholder = "Enter password"/>

                <button>Log In</button>
            </form>
        </div>

        <div>
            <h3>New to Shared Space?</h3>

            <button>Sign Up</button>
        </div>
    </>
  );
}
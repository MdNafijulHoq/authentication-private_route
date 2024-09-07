import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../ContextProvider/AuthContextProvider";

const Login = () => {
  const [showLogInPass, setShowLogInPass] = useState(false);

  const { signInUser, signInWithGoogle, signInWithFacebook, signInWithGithub } =
    useContext(AuthContext);

  // Navigate here for after logging which page we want to see
  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // Login user in firebase
    signInUser(email, password)
      .then((result) => {
        console.log(result)
        e.target.reset(); // For reset login Input field
        navigate("/"); // After login we want to see home page
      })
      .catch((error) => {
        console.log(error)
      });
  };

  // For Google login Handle
  const handleGoogleLogIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result)
        navigate("/");
      })
      .catch((error) => {
        console.log(error)
      });
  };

  // For Facebook login Handle
  const handleFacebookLogIn = () => {
    signInWithFacebook()
    .then((result) => {
      console.log(result)
      navigate("/");
    })
    .catch((error) => {
      console.log(error)
    });
  };

  // For Github login Handle
  const handleGithubLogIn = () => {
    signInWithGithub()
      .then((result) => {
        console.log(result)
        navigate("/");
      })
      .catch((error) => {
        console.log(error)
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleLogIn}>
            <h1 className="text-2xl font-bold text-center">Login now!</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input
                type={showLogInPass ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <span
                className="absolute top-[217px] left-[300px] font-semibold text-xs"
                onClick={() => setShowLogInPass(!showLogInPass)}
              >
                {showLogInPass ? "Hide" : "Show"}
              </span>

              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <p className="p-3">
              New in the Website? Please{" "}
              <Link to="/registration" className="btn btn-link">
                Register!
              </Link>
            </p>
          </form>
          <div className="flex justify-center gap-2">
            <p>
              <button
                onClick={handleGoogleLogIn}
                className="btn btn-ghost underline hover:text-blue-700"
              >
                Google
              </button>
            </p>
            <p>
              <button
                onClick={handleFacebookLogIn}
                className="btn btn-ghost underline hover:text-blue-700"
              >
                Facebook
              </button>
            </p>
            <p>
              <button
                onClick={handleGithubLogIn}
                className="btn btn-ghost underline hover:text-blue-700"
              >
                Github
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

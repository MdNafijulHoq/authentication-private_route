import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../ContextProvider/AuthContextProvider";
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../../Firebase/firebase.config";

const Login = () => {
  const [showLogInPass, setShowLogInPass] = useState(false);

  // This state only for handle firebase user error like already exist
  const [logInError, setLogInError] = useState('')

  // This state only for handle firebase user created successfully
  const [logInSuccess, setLogInSuccess] = useState('')

  // For emailRef (forgot password)
  const emailRef = useRef(null)

  const { signInUser, signInWithGoogle, signInWithFacebook, signInWithGithub, logOut } =
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
        console.log(result.user)
        e.target.reset(); // For reset login Input field
        navigate("/"); // After login we want to see home page

        // check login successfull & also email verfied or not
        if(result.user.emailVerified){
          setLogInSuccess(
            toast.success('🦄 User Login Successfully', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
              })
          )
        }
        else{
          toast.error('🦄 Please verified your Gmail First!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
            logOut();
            navigate('/login')
            
            
        }

        
      })
      .catch((error) => {
        console.log(error)
        setLogInError(
          toast.error('Unregister User. Please register first!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            })
        )
      });
      
  };

  // For forgotten password
  const handleForgotPassword = () => {
    const email = emailRef.current.value
   if(!email){
    toast.warn('Please provide an email!', {
      position: "top-right",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
      return
   }
   else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
    toast.error('Please provide a valid Email', {
      position: "top-center",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
      return
   }

  //  send email verfication for forgot password
  sendPasswordResetEmail(auth, email)
  .then(() => {
    toast.info('Please check your Gmail', {
      position: "top-right",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
  })
  .catch(() => {

  })
  }
    


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
                ref={emailRef} // for email(forgot password)
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
                className="absolute top-[217px] left-[280px] font-semibold text-xs"
                onClick={() => setShowLogInPass(!showLogInPass)}
              >
                {showLogInPass ? "Hide" : "Show"}
              </span>

              <label className="label">
                <a onClick={handleForgotPassword} href="#" className="label-text-alt link link-hover underline">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <p className="text-center font-semibold">
              New in the Website? Please{" "}
              <Link to="/registration" className="btn btn-link">
                Register!
              </Link>
            </p>
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
          {
            logInError && <p>
              {logInError}
              {setLogInError('')}
              </p>
            
          }
          {
            logInSuccess && <p>
              {logInSuccess}
            </p>
          }
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Login;

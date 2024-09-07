import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../ContextProvider/AuthContextProvider";
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';



const Registration = () => {

  const { createUser} = useContext(AuthContext);

  const [showPass, setShowPass] = useState('false');

  // This state only for handle firebase user error like already exist
  const [registerError, setRegisterEror] = useState('')

  // This state only for handle firebase user created successfully
  const [registerSuccess, setRegisterSuccess] = useState('')
  

  const handleRegister = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.value;
    console.log(name, email, password, accepted)

    // Reset Error
    setRegisterEror('')
    setRegisterSuccess('')

    // For password validation
    if(password.length < 6){
      toast.error('Password should be at least 6 characters.', {
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
      return;
    }
    else if(!/[A-Z]/.test(password)){
      toast.error('Your character should have at least one upper case.', {
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
        return;
    }

    // Create user in firebase
    createUser(email, password)
    .then((result) => {
      console.log(result.user)
      e.target.reset();         // For reset Register Input field
      setRegisterSuccess(
        toast.success('🦄 User created successfully!', {
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
    })
    .catch((error) => {
      console.log(error) 
      setRegisterEror(                          //for show the firebase error
        toast.error( error.message , {
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
    })
    
    
  }
    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleRegister}>
      <h1 className="text-2xl font-bold text-center">Register now!</h1>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input type="text" name="name" placeholder="name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>

          
          <input type={showPass ? "text" : "password"} name="password" placeholder="password" className="input input-bordered" required />
          <span className="absolute top-[308px] left-[290px] font-semibold text-xs" onClick={() => setShowPass(!showPass)}>
            {
              showPass ? "Hide" : "Show"
            }
          </span>
         <div className="mt-3">
          <input type="checkbox" name="terms" id="terms" required/>
          <label className="ml-2" htmlFor="terms">Accept our <a className="underline text-sky-900" href="#">Terms and Condition</a></label>
         </div>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
        <p className="text-center font-semibold p-3">New in the Website? Please <Link to="/login" className="btn btn-link">Login!</Link></p>

      </form>
     
        {/* For register error show */}
        {
          registerError && <p className="p-2 text-center text-red-600 font-semibold text-lg mb-5"> 
          {registerError}
          {setRegisterEror('')}    
      </p>
      }

      {/* For user created show */}
      {
          registerSuccess && <p className="p-2 text-center text-green-700 font-semibold text-lg mb-5"> 
          {registerSuccess}
          {setRegisterSuccess('')}
      </p>
      }

    </div>
    
  </div>
</div>
    );
};

export default Registration;
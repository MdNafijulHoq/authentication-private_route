import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../ContextProvider/AuthContextProvider";


const Registration = () => {

  const { createUser} = useContext(AuthContext);

  const [showPass, setShowPass] = useState('false');
  

  const handleRegister = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.value;
    console.log(name, email, password, accepted)

    // Create user in firebase
    createUser(email, password)
    .then(result => {
      console.log(result.user)
      e.target.reset();         // For reset Register Input field
    })
    .catch(error => {
      console.log(error)
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
          <span className="absolute top-[308px] left-[245px] font-semibold text-xs" onClick={() => setShowPass(!showPass)}>
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
      </form>
      <p className="p-3">New in the Website? Please <Link to="/login" className="btn btn-link">Login!</Link></p>
    </div>
    
  </div>
</div>
    );
};

export default Registration;
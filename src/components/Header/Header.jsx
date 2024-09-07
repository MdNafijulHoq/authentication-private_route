import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../ContextProvider/AuthContextProvider";
import { useContext } from "react";


const Header = () => {

  const { user, logOut } = useContext(AuthContext)
  
  // For handle LogOut
  const handleLogOut = () => {
    logOut()
    .then((result) => {
      console.log(result)
      
    })
    .catch((error) => {
      console.log(error)
    })
  }

    return (
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><NavLink to='/'>Home</NavLink></li>
        <li>
          <NavLink to='/login'>Login</NavLink>
        </li>
        <li><NavLink to='/registration'>Registration</NavLink></li>

        {/* If user login then show those pages */}
        {
          user && <>
          <li><NavLink to='/order'>Order</NavLink></li>
          <li><NavLink to='/contact'>Contact</NavLink></li>
          </>
        }

      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Auth & Private-Route</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <li><NavLink to='/'>Home</NavLink></li>
        <li>
          <NavLink to='/login'>Login</NavLink>
        </li>
        <li><NavLink to='/registration'>Registration</NavLink></li>

         {/* If user login then show those pages */}
        {
          user && <>
          <li><NavLink to='/order'>Order</NavLink></li>
          <li><NavLink to='/contact'>Contact</NavLink></li>
          </>
        }

    </ul>
  </div>
  <div className="navbar-end">
    {
      user ? 
      <>
      <span className="p-3 underline font-semibold">{user.email}</span>
      <a onClick={handleLogOut} className="btn">Log Out</a>
      </>
      : 
      <Link to='/login'><button className="btn">Log In</button></Link>
    }
    
  </div>
</div>
    );
};

export default Header;
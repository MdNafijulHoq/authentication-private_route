import { useContext } from "react";
import { AuthContext } from "../ContextProvider/AuthContextProvider";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';


const PrivateRoute = ({children}) => {

    const { user, loading } = useContext(AuthContext);
    
    // 
    if(loading){
        return <>
            <span className="loading loading-spinner loading-xs"></span>
            <span className="loading loading-spinner loading-sm"></span>
            <span className="loading loading-spinner loading-md"></span>
            <span className="loading loading-spinner loading-lg"></span>
        </>
    }
    
    // if user exist you can visit anywhere
    if(user ){
        return children;
    }
    // if not user exit you will be in the Login page
    return <Navigate to='/login'>Login</Navigate>;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node
}
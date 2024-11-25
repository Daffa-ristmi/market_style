import { Link } from "react-router-dom";

const AuthLayouts = (props) => {
    const {children, tittle, type} = props;
    return (
        <div className='flex justify-center min-h-screen items-center'>
        <div className="w-full max-w-xs">
      <h1 className="text-3xl font-bold mb-2 text-blue-600">{tittle}</h1>
      <p className="font-medium text-slate-500 mb-8">
        Welcome, Please enter your detail
      </p>
       {children}

       <p className="text-sm mt-5 text-center">
        {type === "Login" 
        ? "Don't have an account? " 
        : "Already have an accout? "}
                 
        {type === "Login" && (
        <Link to="/Register" className="font-bold text-blue-600">
         Register
            </Link>
            )}
        
        {type === "Register" && (
        <Link to="/Login" className="font-bold text-blue-600">
         Login
            </Link>
            )}
             </p>
    </div>
    </div>
    );
};

export default AuthLayouts
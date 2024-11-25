import AuthLayouts from "../components/Layouts/AuthLayouts";
import FormRegister from "../components/Fragments/FormRegister";
import { Link } from "react-router-dom";

const RegisterPage = () => {
    return(
        <AuthLayouts tittle="Register" type="Register">
             <FormRegister/>
        </AuthLayouts>
    );
}

export default RegisterPage
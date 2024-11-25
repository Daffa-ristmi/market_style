import { useRef, useState } from "react";
import Button from "../Elements/Button"
import InputForm from "../Elements/Input"
import { login } from "../../service/auth.service";


const FormLogin = () => {
  const[loginFailed, setLoginFailed] = useState("");
  const handleLogin = (event) => {
    event.preventDefault();
    // localStorage.setItem('email', event.target.email.value);
    // localStorage.setItem('password', event.target.password.value);
    // window.location.href = "/Products"
    // console.log(event.target.email.value)
    // console.log(event.target.password.value)
    // console.log("login");

    const data = {
      username: event.target.username.value,
      password: event.target.password.value
    };
    login(data, (status, res) => {
      if (status) {
        localStorage.setItem("token", res)
        window.location.href = "/Products"
      } else {
        setLoginFailed(res.response.data)
        console.log(res.response.data)
      }
    })
  };


  const usernameRef = useRef(null);

    useRef(() => {
      usernameRef.current.focus();
    }, [])  

    return(
        <form onSubmit={handleLogin}>
          {loginFailed && <p className="text-red-500">{loginFailed}</p>}
        <InputForm
          label="Username"
          type="text"
          placeholder="Jhon Doe"
          name="username" 
          ref={usernameRef}
        />
        <InputForm
          label="Password"
          type="password"
          placeholder="******"
          name="password" 
        />
        
        <Button classname="bg-blue-600 w-full" type="submit">
          Login
        </Button>
      </form>
    )
}

export default FormLogin
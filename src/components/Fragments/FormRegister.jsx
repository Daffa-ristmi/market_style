import Button from "../Elements/Button"
import InputForm from "../Elements/Input"


const FormRegister = () => {
    return(
        <form action="">
        <InputForm
          label="Fullname"
          type="text"
          placeholder="Insert your full name"
          name="fullname" 
        />
        <InputForm
          label="Email"
          type="email"
          placeholder="example@gmail.com"
          name="email" 
        />
        <InputForm
          label="Password"
          type="password"
          placeholder="******"
          name="password" 
        />
        <InputForm
          label="Confirm Password"
          type="password"
          placeholder="******"
          name="cofirmPassword" 
        />
        
        <Button classname="bg-blue-600 w-full ">Register</Button>
      </form>
    )
}

export default FormRegister
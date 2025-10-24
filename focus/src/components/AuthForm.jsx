import { useState } from "react";


function AuthForm(){
    const [isLogin,setLogin]=useState(true);
    const toggleForm=()=> setLogin(!isLogin);



    return(
        <div className="auth-container">
            <h2> {isLogin ? "Login":"SignUp"} </h2>
            <form >
                {!isLogin &&(
                    <input type="text" placeholder="Username"required />
                )}
                <input type="email" placeholder="Email" required/>
                    <input type="password" placeholder="Password" required />
                    <button type="Submit">{isLogin ? "Login":"SignUp"}</button>
            </form>

            <p>
                {isLogin ? "Dont have an account?":"Already have an account?"}{" "}
                <span className="toggle-link" onClick={toggleForm}>
                    {isLogin ? "SignUp":"Login"}
                </span>
            </p>
        </div>
    )
}

export default AuthForm;
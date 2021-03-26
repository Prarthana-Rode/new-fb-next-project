import { Component, useState } from 'react';
import {auth } from '../utils/firebase'
import {useRouter} from "next/router"


const Login = () => {

    const router=useRouter();

    const [email,setEmail]=useState("");
    const [pwd,setPwd]=useState("");
    const [errorMsg, setMsg]=useState("");

    function loginUser(event){
        event.preventDefault();
        var emailId=email;
        var password=pwd;
        auth.signInWithEmailAndPassword(emailId,password).then(()=>{
            console.log("Login successful");
            router.push("/register" );
        }).catch(error=>{
            debugger;
            setMsg(error.message);
        })
    }
    
    return ( 
        <div>
            <div className="header" >Login </div  >
            <form className="formCss" onSubmit={loginUser}>
                <label>
                    <label htmlFor="name" >Email</label>
                    <input type="email" required name="email" value={email} onChange={(event)=>{setEmail(event.target.value)}}/><br/>
                    <label  htmlFor="pwd" >Password</label>
                    <input type="password"  required value={pwd} name="pwd" onChange={(event)=>{setPwd(event.target.value)}} /><br/>
                </label>
                <div style={{textAlign:"center"}} ><input type="submit" value="Login" /></div>
                <div style={{color:"red"}}>{errorMsg}</div>
            </form>
            
        </div> 
    );
}
 
export default Login;
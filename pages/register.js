import {useState } from "react";
import {auth, storage } from '../utils/firebase'
import {useRouter} from "next/router"
import {useEffect } from 'react'

const Register = (props) => {

    const [email,setEmail]=useState("");
    const [pwd,setPwd]=useState("");
    const [confirmPwd,setConfirmPwd]=useState("");
    const [errorMsg, setMsg]=useState("");
    const [myfile, setFile]=useState("");
    const [profile,setProfile]=useState("");
    const [userEmail,setUserEmail]=useState("");

    const router=useRouter();

    useEffect(()=>{
        var user =auth.currentUser;
        if(user){
            setUserEmail(user.email);
            var url="profiles/"+user.email+"/"+"img.png";
            var refstorage= storage.ref();
            refstorage.child(url).getDownloadURL().then((imgurl)=>{
             setProfile(imgurl)
            });
        }
    },[])

    function registerUser(event){
        event.preventDefault();
        if(confirmPwd==pwd){
            if(pwd.length>5){
                auth.createUserWithEmailAndPassword(email,pwd).then((cred)=>{
                    setMsg("User registered");
                }).catch(error=>{
                    setMsg(error.message);
                });
               var storageRef= storage.ref("profiles/"+email + "/"+ "img.png");
               storageRef.put(myfile);
            }
            else{
                setMsg("Password should have atleast 6 characters");
            }
        }
        else{
            setMsg("Password and confirm password should be same");
        }
    }
    function signOut(){
        auth.signOut().then(()=>{
            router.push("/");
        }).catch((error)=>{
            setMsg(error.message);
        })
    }
    return ( 
        <div>
           <div className="header" ><span className="userInfo" style={{float:"left"}}><img src={profile} style={{height:"30px", width:"50px", marginTop: "10px"}}></img> <span>{userEmail}</span></span>Registration Form  <button onClick={signOut} className="btnSignOut" >Sign Out</button></div  >
            <form className="formCss" onSubmit={registerUser}>
                    <label htmlFor="name" >Email</label>
                    <input required type="email" name="email" value={email} onChange={(event)=>{setEmail(event.target.value)}}/><br/>
                    <label  htmlFor="pwd" >Password</label>
                    <input required type="password" value={pwd} name="pwd" onChange={(event)=>{setPwd(event.target.value)}} /><br/>
                    <label  htmlFor="pwd" >Password</label>
                    <input required type="password" value={confirmPwd} name="confirmPwd" onChange={(event)=>{setConfirmPwd(event.target.value)}} /><br/>
                    <label  htmlFor="pwd" >Profile photo:     </label>
                    <input  required  type="file" onChange={(event)=>{ setFile(event.target.files[0])}} name="file"></input>
                <div style={{textAlign:"center"}} ><input type="submit" value="Submit" /></div>
                <div style={{color:"red"}}>{errorMsg}</div>
             </form>
            
        </div> 
    );
}
 export default Register;
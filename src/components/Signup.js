import Login from './Login.js'
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import {set, ref} from "firebase/database"
import "./Signup.css";
import { auth, database } from "../firebase-config";
import {Link,useNavigate} from 'react-router-dom'


function Signup() {
  const [user, setUser] = useState({
    name:"",
    email:"",
    password:""
  });
  const navigate = useNavigate();
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmit = () => {
    if(!user.name || !user.email || !user.password){
      alert("Please fill all the fields");
      return;
    }
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth,user.email,user.password).then(async res=>{
      setSubmitButtonDisabled(false);
      console.log(res);
      const user_created = res.user;
      await updateProfile(user_created,{
        displayName:user.name
      });
      //

      set(ref(database, 'users/' + user_created.ui), {
        name: user_created.displayName,
        email: user_created.email,
      });
      console.log(user)

      navigate("/"); 
    })
    .catch(err=> {
      setSubmitButtonDisabled(false);
      alert(err.message);
    })
  }
  
  return (
<div className="body-signup">
         <div className="login">
        <h2 id="txt">Signup</h2>
        <div className="inputbox">
        <input type="text" placeholder="Enter your Name" value={user.name} onChange={(event) => setUser((prev) => ({...prev, name: event.target.value}))}/>
        </div>
        <div className="inputbox">
        <input type="email" placeholder="Enter your Email" value={user.email} onChange={(event) => setUser((prev) => ({...prev, email: event.target.value}))}/>
        </div>
        <div className="inputbox">
        <input type="password" placeholder="Create your password" value={user.password} onChange={(event) => setUser((prev) => ({...prev, password: event.target.value}))}/>
        </div>
        <div className="inputbox">
        <input type="submit" value="Signup" id="btn" onClick={handleSubmit} disabled={submitButtonDisabled}/>
        </div>
        <div className="group">
            <Link to='/' className='link'>poolup.store</Link>
            <Link to='/login' className='link'>Back</Link>
        </div>
    </div>
    <div className="colors">
        <span></span>
        <span></span>
    </div>
    </div>
  );
}

export default Signup;

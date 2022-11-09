import { useState } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
import {Link, useNavigate} from "react-router-dom";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password:""
  });
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    
    if(!user.email || !user.password){
      alert("Please fill all the fields");
      return;
    }
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth,user.email,user.password).then(async res=>{
      setSubmitButtonDisabled(false);
      console.log(res);
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
    <h2 id="txt">Login</h2>
    <div className="inputbox">
    <input type="text" placeholder="Email" value={user.email} onChange={(event) => setUser((prev) => ({...prev, email: event.target.value}))}/>
    </div>
    <div className="inputbox">
    <input type="password" placeholder="Password" value={user.password} onChange={(event) => setUser((prev) => ({...prev, password: event.target.value}))}/>
    </div>
    <div className="inputbox">
    <input type="submit" value="Login" id="btn" onClick={handleSubmit} disabled={submitButtonDisabled}/>
    </div>
    <div className="group">
        <Link to="#" className="link">Forget Password?</Link>
        <Link to='/signup' className="link">Signup</Link>
    </div>
  </div>
  <div className="colors">
    <span className="active" id="active"></span>
    <span></span>
    <span></span>
</div>
</div>
  );
}

export default Login;



  


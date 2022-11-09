import React, {useState, useEffect} from 'react'
import { signOut } from 'firebase/auth';
import { auth, database } from "../firebase-config";
import { Link, useNavigate } from 'react-router-dom';
import {set, ref, get} from "firebase/database"
import './Profile.css'
import Button from 'react-bootstrap/Button';
import { async } from '@firebase/util';

const Profile = () => {
  const [userObject,setUserObject] = useState({
    uid:"",
    username:"",
    email:""
})
    const [submitLogoutButtonDisabled, setLogoutButtonDisabled] = useState(false);
    const navigate = useNavigate();
    const [allUserGroups, setAllUserGroups] = useState([{
      group_code:"",
    }])
    const [allUserGroupsMemberCount, setAllUserGroupsMemberCount] = useState([{
      member_current:0,
      total_members:0
    }])
    useEffect(()=>{
      auth.onAuthStateChanged((user)=>{
        if(user){
          setUserObject({
            username: user.displayName,
            uid: user.uid,
            email: user.email
          });
          
        }
      });
      const databaseref = ref(database,'users/'+userObject.uid+"/groups_joined");
          get(databaseref)
          .then((snapshot) => {
            const data = snapshot.val();
            if(data!= null){
            for(let value in data){
                setAllUserGroups(oldArray=> [...oldArray, {
                    group_code:data[value],
                }]) 
            }
          }
          })
          .catch((err) => {
            console.error(err);
        });
       
        
    },[])

    function SettingGroupDetails(){
      for (let value in allUserGroups) {
        if(value!=null){
        console.log(allUserGroups[value])}
      //   const databasegroupref = ref(database,'groups/'+allUserGroups);
      //   get(databaseref)
      //   .then((snapshot) => {
      //     const data = snapshot.val();
      //     if(data!= null){
      //       console.log(data)
      //     for(let value in data){
      //         setAllUserGroups(oldArray=> [...oldArray, {
      //             group_code:data[value]["group_code"],
      //         }]) 
      //     }
      //   }
      //   })
      //   .catch((err) => {
      //     console.error(err);
      // });
        
      }
    }

    const Logout = () => {
        setLogoutButtonDisabled(true);
        signOut(auth).then(() => {
            // Sign-out successful.
            setLogoutButtonDisabled(false);
            navigate('/');

          }).catch((error) => {
            setLogoutButtonDisabled(false);
            alert("Something happened while logging you out!");
          });
    }
  return (
      <>
      <div className="profile-body">
    <div className="vector-box">
    <img id='vector-img' src="https://cdni.iconscout.com/illustration/premium/thumb/user-profile-2839460-2371086.png" alt="Illustrator" />
    </div>
            
    <div className="user-info"><br /><br />
            <div className="user-name">{userObject.username}</div><br /><br /><br /><br /><br /><br />
            <div className="line-devider"></div><br /><br /><br /><br /><br /><br />
            <div className="user-email">{userObject.email}</div><br /><br /><br /><br />
            <div className="user-desig">MEMBER</div><br /><br /><br /><br /><br /><br />
            <div className="logout-btn">
                <button id='logout-btn' onClick={Logout} disabled={submitLogoutButtonDisabled}>LOGOUT</button>
            </div>
            </div>

        <div className="user-grpbox">
            <div className="group-joinedtxt">GROUP JOINED <button className='profile-back-btn' onClick={()=>{navigate('/')}}>Back</button></div>
            <div className="user-box-container">
            <div className="grpjoined-tile">
                <img src="https://centralguide.net/wp-content/uploads/2017/09/Netflix-customer-service.png" alt="Netflix" className="grptile-img" />
            </div>
            
            </div>
            </div>
    </div>
    </>
  )
}

export default Profile
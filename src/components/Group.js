import React, {useState, useEffect} from 'react'
import './Group.css'
import {set, ref, get} from "firebase/database"
import { auth, database } from "../firebase-config";
import { useNavigate } from 'react-router-dom';
import {BsFillPersonFill} from 'react-icons/bs'
const Group = () => {

    const [userObject,setUserObject] = useState({
        uid:"",
        username:"",
    })
    const [allGroups, setAllGroups] = useState([{
        group_code:"",
        date:null,
        admin_name:"",
        admin_uid:"",
        image_url:"",
        plan:"",
        platform:"",
        price:"",
        total_members:"",
        member_current:"",
        expiry_date:null
      }])
    const [loginStatus, setLoginStatus] = useState(false)
    const [confirm, setConfirm] = useState(false);
    useEffect(()=>{
;
        auth.onAuthStateChanged((user)=>{
            if(user){
              setUserObject({
                username: user.displayName,
                uid: user.uid
              });
              setLoginStatus(true)
            }
            else{
                setLoginStatus(false)
            }
          })
             const databaseref = ref(database,'groups/');
          get(databaseref)
          .then((snapshot) => {
            const data = snapshot.val();
            if(data!= null){
            for(let value in data){
                setAllGroups(oldArray=> [...oldArray, {
                    group_code:data[value]["group_code"],
                    date:data[value]["date"],
                    admin_name:data[value]["admin_name"],
                    admin_uid:data[value]["admin_uid"],
                    image_url:data[value]["image_url"],
                    plan:data[value]["plan"],
                    platform:data[value]["platform"],
                    price:data[value]["price"],
                    total_members:data[value]["total_members"],
                    member_current:data[value]["member_current"]
                }]) 
            }
          }
          })
          .catch((err) => {
            console.error(err);
        });
    },[])

    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [date,setDate] = useState(null);
    const [platform,setPlatform] = useState("");
    const [plan,setPlan] = useState("");
    const [members, setMembers] = useState(0);
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [PlatformOptions,setPlatformOptions] = useState([{value:"", text:"Platform", key:"3120", disabled:false},{value:"Netflix", text:"Netflix", key:"3121",disabled:false}, {value:"Spotify", text:"Spotify",key:"3122", disabled:false},{value:"Amazon Prime", text:"Amazon Prime", key:"3123", disabled:false}]);
    const [PlanOptions,setPlanOptions] = useState([{value:"", text:"Subcription Plan", key:"3120", disabled:false},{Company:"Netflix",value:"Standard Plan", key:"311", disabled:false},{Company:"Netflix",value:"Premium Plan", key:"312", disabled:false},
     {Company:"Spotify",value:"Duo Plan", key:"313", disabled:false}, {Company:"Spotify",value:"Family Plan", key:"314", disabled:false},
     {Company:"Amazon Prime",value:"Monthly Plan", key:"315", disabled:false},{Company:"Amazon Prime",value:"Quarterly Plan", key:"316", disabled:false},
     {Company:"Amazon Prime",value:"Annual Plan", key:"318", disabled:false}]);


    const [AllowedMembers, setAllowedMembers] = useState([{Plan:"Standard Plan",number:2},{Plan:"Premium Plan",number:4},{Plan:"Duo Plan",number:2},{Plan:"Family Plan",number:6},
    {Plan:"Monthly Plan",number:3},{Plan:"Quarterly Plan",number:3},{Plan:"Annual Plan",number:3}]);
    const Price = [{Plan:"Standard Plan",price:499},{Plan:"Premium Plan",price:649},{Plan:"Duo Plan",price:149},{Plan:"Family Plan",price:179},{Plan:"Monthly Plan",price:179},{Plan:"Quarterly Plan",price:459},{Plan:"Annual Plan",price:1499}];
    const CardImage = [{Company:"Netflix",value:"https://i.ytimg.com/vi/GV3HUDMQ-F8/maxresdefault.jpg"},{Company:"Spotify",value:"https://i.pinimg.com/originals/eb/6e/9f/eb6e9f2ef5b7d197e33279e89425213a.jpg"},{Company:"Amazon Prime", value:"https://www.telesurtv.net/__export/1584731358366/sites/telesur/img/2020/03/20/amazon_2.jpg"}]
    
    function generate_token(length){
        var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
        var b = [];  
        for (var i=0; i<length; i++) {
            var j = (Math.random() * (a.length-1)).toFixed(0);
            b[i] = a[j];
        }
        return b.join("");
    }

    function confirmgroups(){

        Price.map((option)=>{
            if(option.Plan === plan){
                setPrice(option.price);
            }
        });
        AllowedMembers.map((option)=>{
            if(option.Plan === plan){
                setMembers(option.number);
            }
        });
        CardImage.map((option)=>{
            if(option.Company === platform){
                setImage(option.value);
            }
        })
        if(!platform || !plan || !members || !price || !image || !date){
            alert("Please confirm all the details");
        }
        else{
            setConfirm(true)
        }
    }
    function creategroups(){
        let group_code = generate_token(6);
        set(ref(database, 'groups/' + group_code), {
            group_code:group_code,
            date:date,
            platform: platform,
            plan:plan,
            total_members: members,
            price: price,
            image_url:image,
            admin_name:userObject.username,
            admin_uid:userObject.uid,
            member_current:1
          }).then(res=>{
              let member_current = 1;
              let which_user = "user"+member_current.toString();
            set(ref(database, 'groups/'+group_code+'/group_members/'), {
               [which_user]:userObject.uid
              }).then(resu=>{
                set(ref(database, 'users/'+userObject.uid+'/groups_joined'), {
                    group_code:group_code
                   }).then(res=>{
                    setModalShow(false);
                    setMembers(0);
                    setConfirm(false);
                    window.location.reload();
                   }).catch(err=>{
                    alert(err.message);
                   });
              }).catch((err)=>{
                  alert(err.message);
              });

              
          }).catch(err=>{
              console(err)
              setModalShow(false);
          })
    }

  return (
      <>
    <div className='group-body-group-page'>
   { modalShow || <div className="create-grp-btn">
        <button id='grp-btn' onClick={()=>{navigate('/')}}>BACK</button>
          <button id='grp-btn' onClick={()=>{
              if(loginStatus){
              setModalShow(true)}
              else{
                  alert("Please Login to create groups")
              }
        }}>CREATE GROUP</button>
          
        </div>}
    {modalShow && 
    <div className="create-group-modal">
    <div className="create-group-modal-heading">
    Provide these information <br />about your subscription.
    </div>
    <div className="create-group-modal-box">
        <div className="platform-dropdown">
        <select name="platform" id="select1" className='top1' onChange={(e)=> {setPlatform(e.target.value)}}>
        <option value="" className='font' disabled>Platform</option>
            {PlatformOptions.map((option) => {
                return(
                    <option  key={option.key} value={option.value} className='font' disabled={option.disabled}>{option.value}</option>
                )
            })}
        </select>
        </div>
        <div className="subsciption-dropdown">
        <select name="subscription" id="select2" placeholder='platform' className='top2' onChange={(e)=>{setPlan(e.target.value)}}>
            <option value="" className='font' disabled>Subcription Plans</option>
            {PlanOptions.map((option) => {
                if(option.Company === platform || option.value===""){
                return(
                    <option  key={option.key} value={option.value} className='font' disabled={option.disabled}>{option.value}</option>
                )
                }
            })}
        </select>
        </div>
        <div className="expiry-date-dropdown">
        <input type="date" name="select3" id="select3" className='top3' placeholder='Expiry Date' onChange={(e)=>{setDate(e.target.value);}}/>
        </div>
        <div className="create-group-button">
        {confirm || <button className='final-create-btn' onClick={confirmgroups}>CONFIRM DETAILS</button>}
        {confirm && <button className='final-create-btn' onClick={creategroups}>CREATE GROUP</button>}
        </div>
        <div className="allowed-members-div">Allowed Members {members}</div>
        <div className="back-div" onClick={()=> {setModalShow(false);setConfirm(false)}}>Back</div>
    </div>
    </div>
}
{modalShow ||


      <div className="explore-box">
        <div className="explore-header">
          <h3 id='explore-txt'>EXPLORE</h3>
        </div>
        <div className="tile-devider1"></div>
      
        <div className="tile-container">
        {
        allGroups.map((p, key)=>{
            if(p["admin_name"]!==""){
            return(
        <div className="grp-tile" key={key}>
            <div className="tile-devider"></div>
          <img src={p["image_url"]} alt="" />
          <div className="id-tenure-container">
          <div className="grp-id">#{p["group_code"]}</div>
          <div className="grp-tenure">{p["plan"]}</div>
          </div>
          <div className="grp-username">{p["admin_name"]}</div>
          <div className="tile-paybtn">
            <button className='pay-btnid'>PAY {parseInt(p["price"]/p["total_members"])}</button>
          </div>
          <div className="grp-usercount"><BsFillPersonFill className='person-fill'/> {p["member_current"]}/{p["total_members"]}</div>
          <div className="grp-expdate">{p["date"]}</div>
        </div>
        
        )
            } 
        })
}
</div>
      </div>

}
    </div>
    </>
  )
}

export default Group
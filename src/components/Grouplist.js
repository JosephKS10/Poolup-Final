import React, {useState} from 'react'
import './Grouplist.css';
import {AiFillCaretDown, AiFillCaretUp} from 'react-icons/ai';
import {BsSpotify} from 'react-icons/bs';
import group1 from '../images/group1.svg';
import group2 from '../images/group2.svg';
import {Link} from 'react-router-dom';
function Grouplist() {

  const [buttonAppear, setButtonAppear] = useState(false);
  const [arrowbtnAppear, setArrowbtnAppear] = useState(true);
  const [styleGB, setStyleGB] = useState({});
  const [styleDB, setStyleDB] = useState({});
  const [widgetControl, setWidgetControl] = useState(false);

  function widgetController(){
    if(widgetControl){
      DecreaseWidget();
    }
    else{
      IncreaseWidget();
    }
  }
  function IncreaseWidget(){
    setButtonAppear(true);
    setArrowbtnAppear(false);
    setWidgetControl(true);
    setStyleGB({
      height: "74vh",
    })
    setStyleDB({
      transform:"translateY(4.5vh)",
    })

  }
  function DecreaseWidget(){
   
    setArrowbtnAppear(true);
    setWidgetControl(false);
    setStyleGB({
      height: "60vh",
      transition: "0.3s"
    })
    setStyleDB({
      transform:"translateY(0vh)",
    })
    setButtonAppear(false);
  }

    return (
      <div className='body-compilation' id="groups">
              <div className="groups-box" style={styleGB}>
                <div className="group1">
                  <img src={group1} alt="group1" />
                  <img src={group2} alt="group1" />
                </div>
              <div className="binge-heading">
                <div className="part1">JOIN THE<br />LEAGUE OF</div>
                <div className="part2">BINGERS</div>
              </div>
              {buttonAppear && <div className='explore-btn-div'>
                <Link to="/groups"><button className='explore-btn'>Explore groups</button></Link>
              </div>}
              <div className="dropdown-btn" onClick={widgetController} style={styleDB}>
                {arrowbtnAppear && <button className='arrow-btn'><AiFillCaretDown className='arrow-down'/></button>}
                {arrowbtnAppear || <button className='arrow-btn'><AiFillCaretUp className='arrow-down'/></button>}
              </div>
              </div>

              {/* about section */}
              <div className="About-section" id='about'>
              <h2 className="About">About</h2>
              <h4 className='About_txt'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.</h4>
              <hr />
              <h3 className="contact">CONTACT:</h3>
              <h4 className="contact_txt">poolup.org@gmail.com | 0416-65432</h4>

        </div>
      
      </div>

    )
  }
  
  export default Grouplist

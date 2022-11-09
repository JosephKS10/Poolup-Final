import React, {useEffect,useState} from 'react'
import './TrendingContainer.css'
import Slider from './slider/Slider.js'
import axios from 'axios';

const TrendingContainer = () => {
 const [title1, settitle1] = useState("");
 const [title2, settitle2] = useState("");
 const [title3, settitle3] = useState("");

const getTitle1 = (data) => {
  console.log(data);
}
const getTitle2 = (data) =>{
  console.log(data);
}
const getTitle3 = (data) =>{
  console.log(data);
}
  
  return (
    <div className="body" id="trending">
    <div className="box-container">
      <div className="heading">TRENDING NOW</div>
      <Slider title1={getTitle1} title2={getTitle2} title3={getTitle3} />
    </div><br />
    <div className="second-container">
      <div className="subheading">Last week top 3 shows</div>
      <table>
        <tbody>
        <tr>
          <td id='t1'>Terrifier 2</td>
          <td id='t2'>Black Adams</td>
          <td id='t3'>Orphan First Kill</td>
        </tr>
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default TrendingContainer
import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import Container from './Container';
import TrendingContainer from './TrendingContainer';
import CollectionContainer from './CollectionContainer';
import Grouplist from './Grouplist';
import { auth } from '../firebase-config';
const Homepage = () => {
  const [showProfileTitle, setShowProfileTitle] = useState(true);
  const [marginLeft, setmarginLeft] = useState({});
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        setShowProfileTitle(false);
        setmarginLeft({marginLeft:"58vw"})
      }
      else{
        setShowProfileTitle(true)
        setmarginLeft({marginLeft:"60vw"})
      }
    })
  },[])
  return (
    <>
    <section className='main-continer'>
          <Navbar title={showProfileTitle} positioning={marginLeft}/>   
          <Container/>
    </section>
    <TrendingContainer/>
    <CollectionContainer />
    <Grouplist />
    </>
  )
}

export default Homepage
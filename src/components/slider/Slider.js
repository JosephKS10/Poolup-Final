import {TiChevronRight, TiChevronLeft} from "react-icons/ti"
import React, {useEffect, useState}from 'react'
import './slider.css'
import axios from 'axios';

function Slider(props) {
    const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
    setIsLoaded(true);
}, []);

useEffect(() => {
    if (isLoaded) {
        Showmoviedata();
    }
}, [isLoaded]);

    const sliders = document.querySelector(".carouselbox");
    let scrollPerClick;
    let Imagepadding = 20;

    let scrollAmount = 0;

    function scrollLeft(){
        sliders.scrollTo({
            top:0,
            left: (scrollAmount -= (scrollPerClick+40)),
            behavior: "smooth"
        });

        if(scrollAmount < 0){
            scrollAmount=0;
        }
    }

    function scrollRight(){
        if(scrollAmount <= sliders.scrollWidth - sliders.clientWidth){
            sliders.scrollTo({
                top:0,
                left: (scrollAmount += scrollPerClick),
                behavior: "smooth"
            });
        }
    }

        async function Showmoviedata (){
            const api_key = "dfe6c77cc712a95deae83500f734bc58";
             // for sample
        
            let result = await axios.get(
                "https://api.themoviedb.org/3/discover/movie?api_key="+api_key+"&sort_by=popularity.desc"
            )
                result = result.data.results;
                props.title1(result[0].original_title);
                props.title2(result[1].original_title);
                props.title3(result[2].original_title);
                result.map(function (cur, index){
                    sliders.insertAdjacentHTML(
                        "beforeend",
                        `<img class="img-${index} slider-img" src="http://image.tmdb.org/t/p/w185/${cur.poster_path}" />`
                    )
                });
                
                scrollPerClick = document.querySelector(".img-1").clientWidth + Imagepadding +60;
          }


    

  return (
      <div className="carousel">
          <div className="carouselbox" id="carouselbox">

          </div>
          <button className="switchleft" onClick={scrollLeft}><TiChevronLeft className="button"/></button>
          <button className="switchright" onClick={scrollRight}><TiChevronRight className="button"/></button>
      </div>
  )

  
}

export default Slider
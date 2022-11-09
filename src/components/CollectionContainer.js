import React from 'react'
import './CollectionContainer.css';
import collection1Image from "../images/collection1.svg"
import collection2Image from '../images/collection2.svg'


function CollectionContainer() {
  return (
    <div className='body-collection' id="collection">
      <div className="collection-heading">COLLECTIONS</div>
      <div className="collection-box">
          <div className="collection1-box"><a href="https://rzp.io/l/4U8XpcEJ">
              <img src={collection1Image} alt="collection 1" className='bg-col1'/></a>
          </div>
          <div className="collection2-box"><a href="https://rzp.io/l/TtQsozsO">
          <img src={collection2Image} alt="collection 2" className='bg-col2' />
          </a>
          </div>
      </div>
    </div>
  )
}

export default CollectionContainer
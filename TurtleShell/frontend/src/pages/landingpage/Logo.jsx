import React from 'react';
import './Logo.css';
import cookie3 from '../../assets/cookie3.svg';
import soonami from '../../assets/soonami.svg';
import hack from '../../assets/mantle.svg';


function Logo() {
  return (
    <div className="logo">
      <div className="section_logo">
      <div className="hero_image">
        <img src={soonami} alt="Badge" />
      </div>
      <div className="hero_image">
        <img src={hack} alt="Badge" />
      </div>
      <div className="hero_image">
        <img src={cookie3} alt="Badge" />
      </div>
      </div>
    </div>
  );
}

export default Logo;

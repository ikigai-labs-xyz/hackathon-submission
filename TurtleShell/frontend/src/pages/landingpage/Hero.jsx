import React from 'react';
import './Hero.css';
import Hero_Image from '../../assets/Hero_Image.svg';

function Hero() {
  return (
    <div className="hero">
      <div className="section1">
      <div className="">
        <h1>Scaling Ethereum trough On-Chain Firewalls</h1>
        <h2>Turtleshell brings Smart Contract security data on-chain, providing transparency, composability, and accessibility where it matters most.</h2>
      </div>
      <div className="hero_image">
        <img src={Hero_Image} alt="Badge" />
      </div>
      </div>
    </div>
  );
}

export default Hero;

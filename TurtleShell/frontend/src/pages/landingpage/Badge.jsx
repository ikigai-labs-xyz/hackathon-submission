import React from 'react';
import Badge_Image from '../../assets/HeroBadge.svg';
import './Badge.css';

function Badge() {
  return (
    <div className="section">
      <div className="section-image1">
        <img src={Badge_Image} alt="Badge" />
      </div>
      <div className="section-text">
        <h1>On-chain Data.</h1>
        <h3>Easily readable security data directly on Smart Contracts. Turtleshell uses Soul-Bound-Tokens (SBT) to facilitate that. Turtleshell SBT-NFTs are minted by the Smart Contract deployer direct-ly onto their Contract. Turtleshell NFTs are readable in blockchain explorers, while also storing further vital information regarding the Smart Contract on-chain.</h3>
        <h2>And on-top...</h2>
        <h3>We store all data possible inside the badge metadata.</h3>
      </div>
    </div>
  );
}

export default Badge;

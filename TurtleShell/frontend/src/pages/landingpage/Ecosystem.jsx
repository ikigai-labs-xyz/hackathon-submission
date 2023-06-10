import React from 'react';
import Eco_Image from '../../assets/Ecosystem.svg';
import './Ecosystem.css';

function Ecosystem() {
  return (
    <div className="section">
      <div className="section-image3">
        <img className="image" src={Eco_Image} alt="Ecosystem" />
      </div>
      <div className="section-text">
        <h1>An entire Ecosystem.</h1>
        <h3>
            Build on top of Turtleshell and make web3 a more secure place. 
            What about a wallet integration? Being able to gate which level of security you expect a Smart Contract to have before making a transaction.
        </h3>
        <h3>
            Now that security data is easily accessible on-chain, what are you waiting for? The possibilities are endless
        </h3>
      </div>
    </div>
  );
}

export default Ecosystem;

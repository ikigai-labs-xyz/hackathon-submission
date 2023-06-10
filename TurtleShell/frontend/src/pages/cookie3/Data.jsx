import React from 'react';
import cookie3 from '../../assets/cookie3.svg';
import soonami from '../../assets/soonami.svg';
import XyChart from './XyChart';
import  PieChart  from './PieChart';
import { ConnectButton } from "@rainbow-me/rainbowkit"
import AuditorForm from './AuditorForm';

import './Cookie3.css';

function Cookie3() {
  return (
    <div className="cookie3">
      <AuditorForm />
      <div className="section3">
      <div className="">
        <h1></h1>
        <h2>Analytics Data provided by cookie3 API</h2>
        <p className='cookie3-image'>data for Wallet:<ConnectButton /></p>
        <div className='chart-section background'>
            
            <div><p>NFTs minted</p>
                <XyChart/></div>

                <div><p><span className='color'>................................</span>
                Token Holdings by Standard
                <span className='color'>................................</span></p>
                <PieChart/></div>
                

        </div>
      </div>
      <div className="cookie3-image">
        <img src={cookie3} alt="Badge" />
      </div>
      </div>
      <div className="cookie3-image">
        <img src={soonami} alt="Badge" />
      </div>
    </div>
  );
}

export default Cookie3;

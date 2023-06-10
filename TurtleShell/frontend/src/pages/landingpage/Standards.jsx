import React from 'react';
import Badge_Image from '../../assets/Image_Standard.svg';
import './Badge.css';

function Badge() {
  return (
    <div className="section">
      <div className="section-text">
        <h1>Easy Standards.</h1>
        <h3>
            0 to 2, that’s as easy as it gets. 2 is as secure as your Smart Contract could ever get, while 0 is the exact opposite. Contracts with a score above 1 are considered to be of safe use.
        </h3>
        <h3>
            Audits right now are confusing, that’s why we are simplifying security data for you. You don’t have to be an auditor anymore to understand security.
        </h3>
        <h3>
            This architecture will be open-source, where anyone can contribute, to standar-dize Smart Contract security data, and the impact of vulnerabilities. You can define what impact vulnerabilities have on Turtleshell’s standardized score.
        </h3>
      </div>

      <div className="section-image">
        <img className="image" src={Badge_Image} alt="Badge" />
      </div>
    </div>
  );
}

export default Badge;

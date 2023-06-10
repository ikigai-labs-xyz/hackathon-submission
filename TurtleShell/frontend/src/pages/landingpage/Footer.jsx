import React from 'react';
import './Footer.css';
import Footer_Logo from '../../assets/Logo_new.svg';

const Footer = () => {
  return (
    <div className='Footer-Section'>
      <div className='Logo-Container'>
        <img className="footer_logo" src={Footer_Logo} alt='logo' />
        <div className=''>
          <h3 className='h3'>Web3 Reimagined. Bridging security data on-chain.</h3>
        </div>
      </div>
      <div className='Footer-Socials'>
        <h2 className='h2'>Social</h2>
        <h3 className='h3'>
          <a href='https://twitter.com/TurtleShell_xyz'>Twitter</a>
        </h3>
        <h3 className='h3'>
          <a href='https://turtleshell.gitbook.io/introduction/'>Docs</a>
        </h3>
        <h3 className='h3'>
          <a href='https://t.me/turtleshell_xyz'>Telegram</a>
        </h3>
        <h3 className='h3'>
          <a href='https://github.com/ikigai-labs-xyz'>Github</a>
        </h3>
      </div>
      <div className='Social'>
        <h2 className='h2'>Contact</h2>
        <h3 className='h3'>
          <a href='mailto:hello@turtleshell.xyz'>Mail</a>
        </h3>
      </div>
    </div>
  );
};

export default Footer;
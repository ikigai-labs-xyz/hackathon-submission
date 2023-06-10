import React, { FC } from 'react';
import './ErrorPopup.css';
import logo from '../../assets/svg/turtleshell_secured.svg'; //replace with the path to your logo
import understand from '../../assets/svg/understand.svg'; //replace with the path to your logo

interface ErrorPopupProps {
    show: boolean;
    onClose: () => void;
}

const ErrorPopup: FC<ErrorPopupProps> = ({ show, onClose }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="error-popup">
            <div className="error-popup-content">
                <div className="error-textbox">Failed Interaction</div>
                <div className="error-textbox">Contract Adress: {'0x5FbDB2315678afecb367f032d93F642f64180aa3'}</div>
                <div className="error-textbox">this Token appears to be malicious, creating a pool is not possible</div>
                <button className="error-close-button" onClick={onClose}><img src={understand} alt="logo" className="error-popup-logo"/></button>
                <img src={logo} alt="logo" className="error-popup-logo"/>
            </div>
        </div>
    );
}

export default ErrorPopup;

import React, { FC } from 'react';
import './ErrorPopup.css';
import logo from '../../assets/svg/turtleshell_secured.svg'; //replace with the path to your logo

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
                <div className="error-textbox">Error Message 1</div>
                <div className="error-textbox">Error Message 2</div>
                <div className="error-textbox">Error Message 3</div>
                <button className="error-close-button" onClick={onClose}>Close</button>
                <img src={logo} alt="logo" className="error-popup-logo"/>
            </div>
        </div>
    );
}

export default ErrorPopup;

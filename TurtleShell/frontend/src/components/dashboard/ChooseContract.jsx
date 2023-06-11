import React from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import './Dashboard.css';

export const ChooseContract = ({ onSubmit }) => {
  const [contractAddress, setContractAddress] = React.useState('');

  const handleChange = (e) => {
    setContractAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(contractAddress);
  };

  return (
    <div className='bg-box'>
      <div className='items-align-center'>
        <div>
          <h1 className='h1'>Choose a Contract Address</h1>
          <h2 className='h2'>Enter the contract address</h2>
        </div>
        <div className='form-container'>
          <form onSubmit={handleSubmit} className='form'>
            <input
              type="text"
              value={contractAddress}
              onChange={handleChange}
              className='form-input'
            />
            <button className='submit-button'>
              <div className="flex items-center">
                Submit<BsArrowRightShort size={20} />
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

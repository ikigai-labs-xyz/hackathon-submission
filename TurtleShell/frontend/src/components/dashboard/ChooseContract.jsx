import React from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import './Dashboard.css'

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
	<>
	<div>
      <h1 className='h1'>Choose a Contract Address</h1>
      <h2 className='h2'>
        Please enter the contract address of the contract you want to audit
      </h2>
	</div>
	<div>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={contractAddress}
        onChange={handleChange}
      />
      <button
          className={`px-4 py-2 mb-3 text-sm font-semibold bg-gradient-to-br from-[#5C2C69] to-#2C4C84 border-transparent rounded-full w-fit text-[#C2C2C2]`}
        >
          <div className="flex items-center">
            Submit<BsArrowRightShort size={20} />
          </div>
        </button>
    </form>
	</div>
	</>
  );
};

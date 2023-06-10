import React from 'react';
import Spinner from '../Spinner';
import { BsArrowRightShort } from 'react-icons/bs';

import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import './Dashboard.css'
import abi from './AuditorNFT.json'

const AuditorSBT = ({onSubmit}) => {
  const handleButtonClick = () => {
    // Handle button click here (currently empty)
  };
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: [
      {
        name: 'mint',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [],
        outputs: [],
      },
    ],
    functionName: 'mint',
  })
  
  const { write } = useContractWrite(config)


  return (
    <div>
      <h1 className='h1'>Get Started</h1>
      <h2 className='h2'>
        First of all, you will need to get verified as an Auditor on TurtleShell. Therefore, you will need an Auditor SBT.
      </h2>

      <div className="text-center">
        <button
          className={`px-4 py-2 mb-3 text-sm font-semibold bg-gradient-to-br from-[#5C2C69] to-#2C4C84 border-transparent rounded-full w-fit text-[#C2C2C2]`}
          disabled={!write} onClick={() => {onSubmit("mint badge")}}
        >
          <div className="flex items-center">
            Mint Badge <BsArrowRightShort size={20} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default AuditorSBT;



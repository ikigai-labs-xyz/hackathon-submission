import React from 'react';
import {mintButton} from '../assets/mintButton.svg';
import Spinner from "../Spinner"
import { BsArrowRightShort } from "react-icons/bs"

const AuditorSBT = ({ onSubmit }) => (   // accept the onSubmit prop
  <div>
    <h1>Get Started</h1>
    <h2>
        first of all you will need to get verified as Auditor on TurtleShell therefore you will need an Auditor SBT
    </h2>

    <div className="text-center">
        <button
          onClick={() => mintNft()}
          className={`px-4 py-2 mb-3 text-sm font-semibold bg-gradient-to-br from-[#5C2C69] to-#2C4C84 border-transparent rounded-full w-fit text-[#C2C2C2]`}
        >
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex items-center">
              Mint Badge <BsArrowRightShort size={20} />
            </div>
          )}
        </button>
    

      
  </div>
);

export default AuditorForm;

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { BsArrowRightShort } from 'react-icons/bs';
import './Dashboard.css';
import { useState } from 'react';

const AuditorForm = ({ handleFormSubmit }) => {
   // accept the onSubmit prop
  const [contractType, setContractType] = useState("")

 onchange = (contractType) => {
    setContractType(contractType.target.value);
  };

  

return (
<>
  <div>
    <h1 className='h1'>Auditor Form</h1>
    <h2 className="h2">Type of Contract</h2>
  </div>
    <div className='submit'>
    <Formik
      initialValues={{ contractType: '' }}
      validationSchema={Yup.object({
        color: Yup.string()
          .required('Required'),
      })}
      onSubmit={() => handleFormSubmit(contractType)}   // use the onSubmit prop here

    >
      <Form onChange={setContractType(contractType.target.value)}>
        <label htmlFor="color"></label>
        <Field as="select" name="color">
          <option value="#">Select</option>
          <option value={good_erc20}>Good ERC-20</option>
          <option value={bad_erc20}>Bad ERC-20</option>
          <option value={flashloan}>Flash Loan</option>
          <option value={erc_1155}>ERC-1155</option>
          <option value={erc_721}>ERC-721</option>
        </Field>

        <ErrorMessage name="color" component="div" />

        </Form>
      </Formik>
      </div>

      <div c>
        <button
          className={`px-4 py-2 mb-3 text-sm font-semibold bg-gradient-to-br from-[#5C2C69] to-#2C4C84 border-transparent rounded-full w-fit text-[#C2C2C2]`}
        >
          <div className="flex items-center">
            Submit<BsArrowRightShort size={20} />
          </div>
        </button>
      </div>
  </>
  )
};

export default AuditorForm;

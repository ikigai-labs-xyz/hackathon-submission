import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { BsArrowRightShort } from 'react-icons/bs';
import './Dashboard.css';

const AuditorForm = ({ handleFormSubmit }) => 
(   // accept the onSubmit prop

qdpqcüppkqdüpk
return (
<>
  <div>
    <h1 className='h1'>Auditor Form</h1>
    <h2 className="h2">Type of Contract</h2>
  </div>
    <div className='submit'>
    <Formik
      initialValues={{ color: '' }}
      validationSchema={Yup.object({
        color: Yup.string()
          .required('Required'),
      })}
      onSubmit={handleFormSubmit}   // use the onSubmit prop here
    >
      <Form>
        <label htmlFor="color"></label>
        <Field as="select" name="Type">
          <option value="#">Select</option>
          <option value="GOOD_ERC-2O">Good ERC-20</option>
          <option value="Good_ERC-20">Bad ERC-20</option>
          <option value="FlashLoan">Flash Loan</option>
          <option value="ERC-1155">ERC-1155</option>
          <option value="ERC-721">ERC-721</option>
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
);

export default AuditorForm;

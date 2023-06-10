import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AuditorForm = ({ onSubmit }) => (   // accept the onSubmit prop
  <div>
    <h1>Auditor Form</h1>
    <Formik
      initialValues={{ color: '' }}
      validationSchema={Yup.object({
        color: Yup.string()
          .required('Required'),
      })}
      onSubmit={onSubmit}   // use the onSubmit prop here
    >
      <Form>
        <label htmlFor="color">Favorite Color</label>
        <Field as="select" name="color">
          <option value="">Select</option>
          <option value="red">ERC-20</option>
          <option value="green">ERC-721</option>
          <option value="blue">ERC-1155</option>
          <option value="blue">Flash Loan</option>
        </Field>

        <ErrorMessage name="color" component="div" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
);

export default AuditorForm;

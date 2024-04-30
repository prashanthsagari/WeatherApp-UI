import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const UserRegistrationForm = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // write your validation logic here
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div>
          <label htmlFor='name'>Name:</label>
          <Field type='text' name='name' id='name' />
          <ErrorMessage name='name' component='div' />
        </div>

        <div>
          <label htmlFor='email'>Email:</label>
          <Field type='email' name='email' id='email' />
          <ErrorMessage name='email' component='div' />
        </div>

        <div>
          <label htmlFor='password'>Password:</label>
          <Field type='password' name='password' id='password' />
          <ErrorMessage name='password' component='div' />
        </div>

        <div>
          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <Field type='password' name='confirmPassword' id='confirmPassword' />
          <ErrorMessage name='confirmPassword' component='div' />
        </div>

        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  );
};

export default UserRegistrationForm;

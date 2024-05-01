import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './UserRegistrationForm.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const UserRegistrationForm = () => {
  let initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [submitted, setSubmitted] = useState(false);
  // write your validation logic here
  const validationSchema = Yup.object().shape({
    username: Yup.string()
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

  const onSubmit = (values) => {
    values.userId = uuidv4();
    delete values.confirmPassword;
    alert(JSON.stringify(values));
    axios
      .post('http://localhost:7071/user-profile/upsert-user', values)
      .then((response) => {
        console.log('Response:', response.data);
        alert('User Registered.');
        setSubmitted(true);
      })
      .catch((error) => {
        setSubmitted(true);
        alert('NOT REGITSTER');
        console.error('Error:', error);
      });
  };

  return (
    <>
      <div className='contain border border-primary mx-auto'>
        <h3 className='text-center mt-4'>User Registration Form </h3>
        {submitted === false ? (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div className='row justify-content-md-center align-items-center'>
                <div className='col-sm-12 col-md-6 form-group mx-sm-3 mb-4'>
                  <label htmlFor='username' className='col-4 m-2'>
                    Name:
                  </label>
                  <Field
                    type='text'
                    name='username'
                    id='username'
                    className='col-6'
                  />
                  <ErrorMessage
                    name='username'
                    component='div'
                    className='error text-center'
                  />
                </div>

                <div className='col-sm-12 col-md-6 form-group mx-sm-3 mb-4'>
                  <label htmlFor='email' className='col-4 m-2'>
                    Email:
                  </label>
                  <Field
                    type='email'
                    name='email'
                    id='email'
                    className='col-6'
                  />
                  <ErrorMessage
                    name='email'
                    component='div'
                    className='error text-center'
                  />
                </div>

                <div className='col-sm-12 col-md-6 form-group mx-sm-3 mb-4'>
                  <label htmlFor='password' className='col-4 m-2'>
                    Password:
                  </label>
                  <Field
                    type='password'
                    name='password'
                    id='password'
                    className='col-6'
                  />
                  <ErrorMessage
                    name='password'
                    component='div'
                    className='error text-center'
                  />
                </div>

                <div className='col-sm-12 col-md-6 form-group mx-sm-3 mb-4'>
                  <label htmlFor='confirmPassword' className='col-4 m-2'>
                    Confirm Password:
                  </label>
                  <Field
                    type='password'
                    name='confirmPassword'
                    id='confirmPassword'
                    className='col-6'
                  />
                  <ErrorMessage
                    name='confirmPassword'
                    component='div'
                    className='error text-center'
                  />
                </div>

                <button
                  type='submit'
                  className='btn btn-primary btn-sm col-6 m-4  align-items-center'
                >
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
        ) : (
          <div className='success text-center'>
            User Registered Successfully.{' '}
            <Link className='m-3' to='/login'>
              Login
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default UserRegistrationForm;

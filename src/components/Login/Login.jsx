import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthenticationContext } from '../AuthenticationContext';
import './Login.css';

export default function Login() {
  const authenticationContext = useContext(AuthenticationContext);
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .required('Name is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const onSubmit = (values) => {
    // alert(JSON.stringify(values, null, 2));
    axios
      .post('http://localhost:7071/user-profile/login', values)
      .then((response) => {
        console.log('Response:', response.data);
        authenticationContext.setToken(response.data.token);
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('isLoggedIn', 'true');
        alert(response.data.message);
        authenticationContext.setVal(true);
        window.location.href = '/dashboard';
      })
      .catch((error) => {
        console.error('Error:', error);
        sessionStorage.setItem('isLoggedIn', 'false');
        authenticationContext.setVal(false);
        alert(error.response.data.message);
      });
  };

  return (
    <>
      <div className='border border-primary'>
        <h3 className='text-center mt-4'>User Login </h3>
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

              <button
                type='submit'
                className='btn btn-primary btn-sm col-6 m-4  align-items-center'
              >
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}

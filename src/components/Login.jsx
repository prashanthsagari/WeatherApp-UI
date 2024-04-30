import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthenticationContext } from './AuthenticationContext';

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
        alert(response.data.message);
        authenticationContext.setVal(true);
        window.location.href = '/dashboard';
      })
      .catch((error) => {
        console.error('Error:', error);
        authenticationContext.setVal(false);
        alert(error.response.data.message);
      });
  };

  return (
    <Formik
      // pass the three functions which you have created above to Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        {/*  write your form fields for the following here using label tag ,  Field component and  ErrorMessage component from Formik */}
        <div>
          <label htmlFor='username'>Name:</label>
          <Field type='text' name='username' id='username' />
          <ErrorMessage name='username' component='div' />
        </div>

        <div>
          <label htmlFor='password'>Password:</label>
          <Field type='password' name='password' id='password' />
          <ErrorMessage name='password' component='div' />
        </div>

        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  );
}

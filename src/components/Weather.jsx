import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ShowWeather from './ShowWeather';
import './Weather.css';

export default function Weather() {
  const initialValues = {
    location: '',
  };

  const [weath, setWeath] = useState([]);

  const [loc, setLoc] = useState([]);

  const validationSchema = Yup.object().shape({
    location: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .required('Location is required'),
  });

  const onSubmit = (value) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    axios
      .get(
        `http://localhost:8082/weather/weather-by-city-name?query=${value.location}`,
        {
          timeout: 5000,
        }
      )
      .then((response) => {
        console.log('Response:', response.data);
        debugger;
        if (response.data.success === false) {
          document.getElementById('error').textContent =
            response.data.error.info;
        }
        setWeath(response.data.current);
        setLoc(response.data.location);
        console.log(response.data.current);
        console.log(response.data.location);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <div>
        <h1 className='container alert alert-primary m-5'>
          Get Weather Details
        </h1>
        <Formik
          // pass the three functions which you have created above to Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className='m-5'>
            {/*  write your form fields for the following here using label tag ,  Field component and  ErrorMessage component from Formik */}
            <div>
              <label htmlFor='location'>Name:</label>
              <Field type='text' name='location' id='location' />
              <ErrorMessage name='location' component='div' />
            </div>
            <br />
            <button type='submit'>Submit</button>
          </Form>
        </Formik>
      </div>
      <ShowWeather loc={loc} weath={weath} />
      <div id='error' className='error'></div>
    </>
  );
}

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
        <h4 className='container alert alert-primary m-6 text-center'>
          Get Weather Details
        </h4>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className='m-5 border border-primary mx-6'>
            <div className='row justify-content-md-center'>
              <div className='col-sm-12 col-md-6 form-group mx-sm-3 mt-4'>
                <label htmlFor='location' className='col-4 m-2'>
                  Name:
                </label>
                <Field
                  type='text'
                  name='location'
                  id='location'
                  className='col-6'
                />
                <ErrorMessage
                  name='location'
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
      <ShowWeather loc={loc} weath={weath} />
      <div id='error' className='error'></div>
    </>
  );
}

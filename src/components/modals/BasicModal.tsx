import axios from 'axios';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as Yup from 'yup';

function BasicModal(props) {
  let initialValues = {
    username: props.data.username,
    email: props.data.email,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    props.handleChangeRef();
  };

  const onSubmit = (values) => {
    axios
      .put(
        `http://localhost:7071/user-profile/update-email?username=${values.username}&email=${values.email}`
      )
      .then((response) => {
        console.log('Response:', response.data);

        setShow(false);
        props.handleChangeRef();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div className='row justify-content-md-center align-items-center'>
                <div className='col-sm-12 col-md-6 form-group mx-sm-3 mb-2'>
                  <label htmlFor='username' className='col-8 m-2'>
                    username : <em>{props.data.username}</em>
                  </label>
                </div>

                <div className='col-sm-12 col-md-6 form-group mx-sm-3 mb-2'>
                  <label htmlFor='email' className='col-2 m-2'>
                    Email
                  </label>
                  <Field
                    type='email'
                    name='email'
                    id='email'
                    className='col-8'
                  />
                  <ErrorMessage
                    name='email'
                    component='div'
                    className='error text-center'
                  />
                </div>

                <button
                  type='submit'
                  onClick={onSubmit}
                  className='btn btn-primary btn-sm col-6 m-4  align-items-center'
                >
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BasicModal;

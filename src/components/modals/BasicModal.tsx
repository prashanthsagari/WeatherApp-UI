import * as React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from 'bootstrap';


export default function BasicModal(props) {
  const [open, setOpen] = React.useState(true);


  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, 'First Name must be at least 3 characters')
      .required('First Name is required'),
    lastName: Yup.string()
      .min(3, 'Last Name must be at least 3 characters')
      .required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    photo: Yup.string()
      .required('Photo url is required'),
    phone: Yup.number()
      .min(10, 'Phone Number must be 10 digits')
      .required('Phone Number is required'),
    about: Yup.string()
      .min(20, 'Tell me about your self min 20 characters')
      .required('Tell me about your self yar'),
    specialization: Yup.string()
      .min(3, 'Specialization must be at least 10 characters')
      .required('Specialization is required'),
    address: Yup.string()
      .min(20, 'Address must be at least 20 characters')
      .required('Your Address'),
  });


  const initialValues = {
    firstName: props.contact.firstName,
    id: props.contact.id,
    lastName: props.contact.lastName,
    email: props.contact.email,
    photo: props.contact.photo,
    phone: props.contact.phone,
    about: props.contact.about,
    specialization: props.contact.specialization,
    address: props.contact.address
  };

  const handleClose = () => {
    setOpen(false);
    props.showOrHide();
  }

  const handleSubmit = (values) => {
    props.updateContent(values);
  }
  return (
    <>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div className='row'>
            <div className='col-md-6 mb-2'>
              <label htmlFor='specialization' className='form-label'>
                Specialization
              </label>
              <Field type='text' name='specialization' id='specialization' className='form-control' />
              <ErrorMessage name='specialization' component='div' className='text-danger' />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4 mb-2'>
              <label htmlFor='firstName' className='form-label'>
                First Name
              </label>
              <Field type='text' name='firstName' id='firstName' className='form-control' />
              <ErrorMessage name='firstName' component='div' className='text-danger' />
            </div>
            <div className='col-md-4 mb-2'>
              <label htmlFor='lastName' className='form-label'>
                Last Name
              </label>
              <Field type='text' name='lastName' id='lastName' className='form-control' />
              <ErrorMessage name='lastName' component='div' className='text-danger' />
            </div>
            <div className='col-md-4 mb-2'>
              <label htmlFor='phone' className='form-label'>
                Phone
              </label>
              <Field type='text' name='phone' id='phone' className='form-control' />
              <ErrorMessage name='phone' component='div' className='text-danger' />
            </div>
          </div>

          <div className='mb-3 row'>
            <div className='col-md-6'>
              <label htmlFor='email' className='form-label'>
                Email address
              </label>
              <Field type='email' name='email' id='email' className='form-control' />
              <ErrorMessage name='email' component='div' className='text-danger' />
            </div>
            <div className='col-md-4 mb-2'>
              <label htmlFor='photo' className='form-label'>
                Photo url (linkedin or any web based url)
              </label>
              <Field type='text' name='photo' id='photo' className='form-control' />
              <ErrorMessage name='photo' className='text-danger' component='div' />
            </div>
          </div>

          <div className='row'>
            <div className='mb-3 col-md-6'>
              <label htmlFor='about' className='form-label'>
                About me!
              </label>
              <Field as='textarea' name='about' id='about' className='form-control' rows='2' />
              <ErrorMessage name='about' className='text-danger' component='div' />
            </div>

            <div className='mb-3 col-md-6'>
              <label htmlFor='address' className='form-label'>
                Address
              </label>
              <Field as='textarea' name='address' id='address' className='form-control' />
              <ErrorMessage name='address' className='text-danger' component='div' />
            </div>
          </div>

          <button type='submit' className='btn btn-primary'>
            Update
          </button>
        </Form>
      </Formik>
    </>
  );
}
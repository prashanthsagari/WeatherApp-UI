import axios from 'axios';
import { useContext, useState } from 'react';
import React, { useEffect } from 'react';
import { AuthenticationContext } from './AuthenticationContext';

export default function Dashboard() {
  const [person, setPerson] = useState([]);
  const authenticationContext = useContext(AuthenticationContext);

  useEffect(() => {
    authenticationContext.setVal(true);
    axios
      .get('http://localhost:7071/user-profile/users')
      .then((response) => {
        const data = response.data;
        console.log(data);
        setPerson(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <>
      Token : {authenticationContext.token} :{authenticationContext.val} :
      <h1 className='container alert alert-primary m-5'>
        This is a Dashboard Component
      </h1>
      <h2 className='container m-5'>Details</h2>
      {person.map((item) => {
        return (
          <>
            <h6 className='m-3' key={item.username}>
              {item.username}
            </h6>
          </>
        );
      })}
    </>
  );
}

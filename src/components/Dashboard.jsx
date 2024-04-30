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
      <div className='border border-primary m-5'>
        <h1 className='alert alert-primary m-5'>
          This is a Dashboard Component
        </h1>
        <h4 className='container text-center'>Registered Users</h4>
        <table className='table table-striped table-hover table-sm w-75 p-3 mx-auto'>
          <thead className='table-dark'>
            <tr>
              <th scope='col'>User Name</th>
              <th scope='col'>Email</th>
            </tr>
          </thead>
          <tbody>
            {person.length !== 0
              ? person.map((item) => {
                  return (
                    <>
                      <tr key={item.userId}>
                        <td className='m-5'>{item.username}</td>
                        <td className='m-5'>{item.email}</td>
                      </tr>
                    </>
                  );
                })
              : 'No Users Registered'}
          </tbody>
        </table>
      </div>
    </>
  );
}

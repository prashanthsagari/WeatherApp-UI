import axios from 'axios';
import { useContext, useState } from 'react';
import React, { useEffect } from 'react';
import BasicModal from './modals/BasicModal';

export default function Dashboard() {
  const [person, setPerson] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editPerson, setEditPerson] = useState();

  const getUsersData = () => {
    axios
      .get('http://localhost:7071/user-profile/users')
      .then((response) => {
        const data = response.data;
        setPerson(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const update = (value) => {
    setEditPerson(value);
    setShowModal(true);
  };

  const deleteUser = (username) => {
    axios
      .delete(`http://localhost:7071/user-profile/delete-user/${username}`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        getUsersData();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const changeInParent = () => {
    getUsersData();
    setShowModal(false);
  };

  return (
    <>
      {showModal === true ? (
        <BasicModal handleChangeRef={changeInParent} data={editPerson} />
      ) : (
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
                <th scope='col'>Update</th>
                <th scope='col'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {person.length !== 0
                ? person.map((item) => {
                    return (
                      <>
                        <tr>
                          <td className='m-5'>{item.username}</td>
                          <td className='m-5'>{item.email}</td>
                          <td className='m-5' onClick={() => update(item)}>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              fill='currentColor'
                              class='bi bi-pencil-square'
                              viewBox='0 0 16 16'
                            >
                              <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
                              <path
                                fill-rule='evenodd'
                                d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z'
                              />
                            </svg>
                          </td>
                          <td
                            className='m-5'
                            onClick={() => deleteUser(item.username)}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              fill='currentColor'
                              class='bi bi-trash-fill'
                              viewBox='0 0 16 16'
                            >
                              <path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0' />
                            </svg>
                          </td>
                        </tr>
                      </>
                    );
                  })
                : 'No Users Registered'}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

import React, { useEffect, useState } from 'react';
import './Weather.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function ShowWeather(props) {
  const [username, setUsername] = useState();
  const [jwtToken, setJwtToken] = useState(sessionStorage.getItem('token'));
  useEffect(() => {
    setUsername(sessionStorage.getItem('username'));
  }, []);
  const favObject = {
    location: {},
    weather: {},
  };
  const handleSubmit = () => {
    (favObject.location = props.loc),
      (favObject.weather = props.weath),
      (favObject.id = uuidv4());
    axios
      .post(`/api/bookmark/store?username=${username}`, favObject, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        console.log('Response:', response.data);
        alert('Bookmark Saved !!!');
        document.getElementById('bookmark').hidden = true;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <>
      {(props.loc && props.loc.name) !== undefined ? (
        <div className='row m-5 border border-primary'>
          <div className='m-5 col-4'>
            <strong>Location Details</strong> <br />
            Location : {props.loc.name} <br />
            Region: {props.loc.region} <br />
            Time zone : {props.loc.timezone_id} <br />
            Time : {props.loc.localtime}
          </div>

          <div className='m-5 col-6'>
            <strong> Weather Details </strong>
            <br />
            Weather : {props.weath.weather_descriptions} <br />
            Location : {props.loc.name} <br />
            <img src={props.weath.weather_icons} alt='no image' /> <br />
            Temperature: {props.weath.temperature} <br />
            Humidity : {props.weath.humidity}
          </div>

          <div className='mt-5 row' id='bookmark'>
            <button
              type='submit'
              className='btn btn-primary btn-sm col-3 m-4 mx-auto p-2'
              onClick={handleSubmit}
            >
              BookMark
            </button>
          </div>
        </div>
      ) : (
        <div className='error text-center'>
          Enter any location to see weather information.
        </div>
      )}
    </>
  );
}

export default ShowWeather;

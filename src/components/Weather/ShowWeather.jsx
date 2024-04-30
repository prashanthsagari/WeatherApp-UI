import React from 'react';
import './Weather.css';
import axios from 'axios';

function ShowWeather(props) {
  const handleSubmit = () => {
    alert(JSON.stringify(props.loc));
    alert(JSON.stringify(props.weath));
    axios
      .post('http://localhost:8083/bookmark/store', null)
      .then((response) => {
        console.log('Response:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <>
      {props.loc.name !== undefined ? (
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

          <div className='mt-5 row'>
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

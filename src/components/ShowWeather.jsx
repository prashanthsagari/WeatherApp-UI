import React from 'react';

function ShowWeather(props) {
  return (
    <>
      {props.loc ? (
        <div className='row'>
          <div className='m-5 col-5'>
            <strong>Location Details</strong> <br />
            Location : {props.loc.name} <br />
            Region: {props.loc.region} <br />
            Time zone : {props.loc.timezone_id} <br />
            Time : {props.loc.localtime}
          </div>
          <div className='m-5 col-5'>
            <strong> Weather Details </strong>
            <br />
            Weather : {props.weath.weather_descriptions} <br />
            Location : {props.loc.name} <br />
            <img src={props.weath.weather_icons} alt='no image' /> <br />
            Temperature: {props.weath.temperature} <br />
            Humidity : {props.weath.humidity}
          </div>
        </div>
      ) : (
        'No Data Found'
      )}
    </>
  );
}

export default ShowWeather;

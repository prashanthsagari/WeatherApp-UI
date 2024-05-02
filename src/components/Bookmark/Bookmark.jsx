import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Bookmark.css';

function Bookmark() {
  const [favorites, setFavorites] = useState();
  const [username, setUsername] = useState(sessionStorage.getItem('username'));

  useEffect(() => {
    getBookmarks();
  }, []);

  const getBookmarks = () => {
    axios
      .get(`http://localhost:8083/bookmark/bookmarks/${username}`)
      .then((response) => {
        const data = response.data;
        console.log(JSON.stringify(data));
        setFavorites(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const deleteBookmark = (id) => {
    axios
      .delete(
        `http://localhost:8083/bookmark/delete?username=${username}&id=${id}`
      )
      .then((response) => {
        const data = response.data;
        console.log(data);
        getBookmarks();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='container mx-auto m-4'>
      <a href='/weather' className='btn btn-primary'>
        Goto Weather Search
      </a>
      <h4>
        User <em>{username} </em>'s favorite data
      </h4>
      {favorites && favorites.favorites.length !== 0 ? (
        <div className='row'>
          {favorites.favorites.map((item) => {
            return (
              <>
                <div className='card col-3 m-1' style={{ width: 300 }}>
                  <div
                    className='mx-auto'
                    onClick={() => deleteBookmark(item.id)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='25'
                      height='25'
                      fill='currentColor'
                      class='bi bi-trash-fill'
                      viewBox='0 0 16 16'
                    >
                      <path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0' />
                    </svg>
                  </div>
                  <img
                    src={item.weather.weather_icons}
                    className='card-img-top'
                    alt='weather-icon'
                    style={{ width: 80 }}
                  />
                  <div className='card-body'>
                    <h5 className='card-title'>
                      {item.weather.weather_descriptions}
                    </h5>
                    <p className='card-text'>
                      {' '}
                      Search location {item.location.name}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      ) : (
        'No Favorites'
      )}
    </div>
  );
}

export default Bookmark;

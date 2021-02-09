import { useApolloClient } from '@apollo/client';
import { faMicrophoneAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { isLoggedInVar } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../constants';
import { ME_QUERY } from '../hooks/useMe';

export const Header: React.FC = () => {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const history = useHistory();
  const client = useApolloClient();
  const onLogoutClick = async () => {
    isLoggedInVar(false);
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    await client.cache.reset();
    history.push('/');
  };
  const onUserIconClick = () => {
    setIsBoxVisible(!isBoxVisible);
  };
  return (
    <header className="py-4 bg-gray-800 text-2xl text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <FontAwesomeIcon icon={faMicrophoneAlt} className=" text-xl" />
          <span className="text-green-600 ml-2 font-semibold">Podcast</span>
        </Link>

        {isLoggedInVar() && (
          <span>
            <FontAwesomeIcon
              onClick={onUserIconClick}
              icon={faUser}
              className="cursor-pointer hover:text-green-600 focus:text-green-600"
            />
            <div
              onMouseLeave={() => setIsBoxVisible(false)}
              className={`absolute w-32 bg-gray-200 right-5 rounded-md overflow-hidden ${
                isBoxVisible ? '' : 'hidden'
              }`}
            >
              <div className="no-underline text-black text-base">
                <Link
                  to="/edit-profile/"
                  className="py-2 px-4 border-b border-gray-800 w-full block hover:bg-white text-center"
                >
                  Edit profile
                </Link>
                <button
                  onClick={onLogoutClick}
                  className="py-2 px-4 hover:bg-white w-full block"
                >
                  Log out
                </button>
              </div>
            </div>
          </span>
        )}
      </div>
    </header>
  );
};

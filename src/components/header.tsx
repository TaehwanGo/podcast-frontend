import { faMicrophoneAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedInVar } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../constants';
import { useMe } from '../hooks/useMe';

export const Header: React.FC = () => {
  const { data } = useMe();
  // header 가운데에 현재 페이지 이름 넣을 예정
  const onClick = () => {
    isLoggedInVar(false);
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
  };
  return (
    <header className="py-4 bg-gray-800 text-2xl text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <FontAwesomeIcon icon={faMicrophoneAlt} className=" text-xl" />
          <span className="text-green-600 ml-2 font-semibold">Podcast</span>
        </Link>
        {data?.me.email && <button onClick={onClick}>Log out</button>}
        {data?.me.email && (
          <Link to="/edit-profile/">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        )}
      </div>
    </header>
  );
};

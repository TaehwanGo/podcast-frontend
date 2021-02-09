import {
  faHome,
  faList,
  faMicrophoneAlt,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMe } from '../hooks/useMe';

export const BottomNavigation: React.FC = () => {
  const me = useMe();
  console.log(me.data?.me.email);
  const history = useHistory();

  const onClickSearch = () => {
    history.push('/');
    if (window.location.pathname === '/') {
      window.scrollTo(0, 0);
    }
  };

  return (
    <nav className="w-full sm:w-6/12 fixed bottom-0 z-30 sm:right-0 grid grid-flow-col auto-cols-fr justify-items-center py-1 bg-gray-800">
      {me.data?.me.role === 'Host' && (
        <button className="text-center hover:text-green-600 focus:outline-none">
          <FontAwesomeIcon icon={faMicrophoneAlt} />
          <div className="leading-none">Podcasts</div>
        </button>
      )}
      <button className="text-center hover:text-green-600 focus:outline-none">
        <FontAwesomeIcon icon={faHome} />
        <div className="leading-none">Feed</div>
      </button>
      <button
        onClick={onClickSearch}
        className="text-center hover:text-green-600 focus:outline-none"
      >
        <FontAwesomeIcon icon={faSearch} />
        <div className="leading-none">Search</div>
      </button>
      <button className="text-center hover:text-green-600 focus:outline-none">
        <FontAwesomeIcon icon={faList} />
        <div className="leading-none">Activity</div>
      </button>
    </nav>
  );
};

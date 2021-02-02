import {
  faArrowCircleDown,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const Player: React.FC = () => (
  <div className="pt-2 mt-2 text-green-600">
    <span className=" pb-1 px-2 rounded-r-full rounded-l-full border border-gray-400 cursor-pointer hover:opacity-80">
      <i className="far fa-play-circle text-green-600"></i>
      <span className="ml-2 text-white">3 min</span>
    </span>
    <span className="ml-4 cursor-pointer hover:opacity-80">
      <FontAwesomeIcon icon={faPlusSquare} />
    </span>
    <span className="ml-4 cursor-pointer hover:opacity-80">
      <FontAwesomeIcon icon={faArrowCircleDown} />
    </span>
  </div>
);

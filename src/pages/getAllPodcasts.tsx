import React from 'react';
import { isLoggedInVar } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../constants';

export const GetAllPodcsts = () => {
  const onClick = () => {
    isLoggedInVar(false);
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
  };
  return (
    <div className="text-white container">
      <section>Podcast</section>
      <button onClick={onClick}>Log out</button>
    </div>
  );
};

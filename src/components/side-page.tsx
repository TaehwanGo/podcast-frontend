import React from 'react';

export const SidePage = () => (
  <section className="hidden sticky top-0 max-h-screen sm:w-7/12 sm:grid grid-flow-row grid-rows-2 px-4 justify-items-center items-center">
    <img className="rounded-full" src="/podcastImg1.jpg" alt="coverImage" />
    <div className="text-white mt-8 justify-self-center self-start">
      <h3 className="text-4xl font-medium mb-2">Tony Podcast</h3>
      <span className="text-medium">
        Discover free audio stories that entertain, inform, and inspire. <br />
        Explore shows you'll love from entertainment and comedy to news and
        sports.
      </span>
    </div>
  </section>
);

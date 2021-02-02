import { gql, useQuery } from '@apollo/client';
import {
  faArrowCircleDown,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AccountFiller } from '../components/account-filler';
import { PODCAST_FRAGMENT } from '../fragment';
import { getAllPodcastsQuery } from '../__generated__/getAllPodcastsQuery';

const PODCASTS_QUERY = gql`
  query getAllPodcastsQuery {
    getAllPodcasts {
      ok
      error
      podcasts {
        id
        title
        thumbnailImg
        description
        category
        episodes {
          id
          createdAt
          title
          description
          fileURL
        }
      }
    }
  }
`;

export const GetAllPodcasts = () => {
  const { data, loading } = useQuery<getAllPodcastsQuery>(PODCASTS_QUERY);
  console.log(data);

  return (
    <div>
      <Helmet>
        <title>Home | Nuber Eats</title>
      </Helmet>
      <div className="grid sm:grid-cols-2 sm:justify-items-center">
        <AccountFiller />
        <section className="w-full border-b-2 border-gray-400 max-w-screen-sm sm:border-l-2">
          {data?.getAllPodcasts.podcasts?.map(podcast => (
            <div
              key={podcast.id}
              className="py-4 px-8 border-t border-gray-400"
            >
              <Link to={`/podcast/${podcast.id}`}>
                <div className="flex items-center">
                  <div
                    style={{ backgroundImage: `url(${podcast.thumbnailImg})` }}
                    className="w-14 h-14 bg-cover bg-center rounded-lg"
                  ></div>
                  <div className="ml-2">
                    <h3 className="text-lg">{podcast.title}</h3>
                    <h4 className="text-gray-400 text-sm">
                      {podcast.episodes && podcast.episodes[0].createdAt
                        ? new Date(
                            Date.parse(podcast.episodes[0].createdAt),
                          ).toLocaleDateString()
                        : 'new'}
                    </h4>
                  </div>
                </div>
              </Link>

              {/* latest episode will be here */}
              <div className="mt-2">
                <h3 className="font-semibold">
                  {podcast.episodes && podcast.episodes[0].title
                    ? podcast.episodes[0].title
                    : 'No Episode'}
                </h3>
                <h4>
                  {podcast.episodes && podcast.episodes[0].description
                    ? podcast.episodes[0].description
                    : 'No Episode'}
                </h4>
              </div>
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
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

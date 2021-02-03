import { gql, useQuery } from '@apollo/client';
import {
  faGlobeAsia,
  faPlus,
  faShareAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { SidePage } from '../components/side-page';
import { Player } from '../components/player';
import { PODCAST_FRAGMENT } from '../fragment';
import {
  getPodcastQuery,
  getPodcastQueryVariables,
} from '../__generated__/getPodcastQuery';

export const PODCAST_QUERY = gql`
  query getPodcastQuery($input: PodcastSearchInput!) {
    getPodcast(input: $input) {
      ok
      error
      podcast {
        id
        title
        thumbnailImg
        creator {
          id
          email
          nickName
          role
        }
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
// ...PodcastParts
// ${PODCAST_FRAGMENT}
interface IPodcastParams {
  id: string;
}

export const GetPodcast = () => {
  const params = useParams<IPodcastParams>();
  const { data, loading } = useQuery<getPodcastQuery, getPodcastQueryVariables>(
    PODCAST_QUERY,
    {
      variables: {
        input: {
          id: +params.id,
        },
      },
    },
  );
  console.log(data);
  return (
    <div>
      <Helmet>
        <title>Podcast | Podcast</title>
      </Helmet>
      <div className="page-container">
        <SidePage />
        <section className="w-full border-b-2 border-gray-400 max-w-screen-sm sm:border-none">
          {/* {`podcast ${data?.getPodcast.podcast?.title}`} */}
          <main className="py-4 px-5 border-t border-gray-400 sm:border-none">
            <header className="flex justify-between">
              <div>
                <h1 className="text-3xl pr-2">
                  {data?.getPodcast.podcast?.title}
                </h1>
                <h3 className="mt-1 text-green-700">
                  {data?.getPodcast.podcast?.creator.nickName
                    ? data?.getPodcast.podcast?.creator.nickName
                    : data?.getPodcast.podcast?.creator.email}
                </h3>
              </div>
              <div
                style={{
                  backgroundImage: `url(${data?.getPodcast.podcast?.thumbnailImg})`,
                }}
                className="w-20 h-20 bg-cover bg-center rounded-lg"
              ></div>
            </header>
            <div className="pt-2 mt-2 text-green-600">
              <span className=" pb-1 px-2 rounded-r-full rounded-l-full border border-gray-400 cursor-pointer hover:opacity-80">
                <FontAwesomeIcon icon={faPlus} />
                <span className="ml-2 text-white">Subscribe</span>
              </span>
              <span className="ml-4 cursor-pointer hover:opacity-80">
                <FontAwesomeIcon icon={faGlobeAsia} />
              </span>
              <span className="ml-4 cursor-pointer hover:opacity-80">
                <FontAwesomeIcon icon={faShareAlt} />
              </span>
            </div>
            <p className="text-gray-400 mt-4 text-lg">
              {data?.getPodcast.podcast?.description}
            </p>
          </main>
          {data?.getPodcast.podcast?.episodes?.map(episode => (
            <div
              key={episode.id}
              className="py-4 px-5 border-t border-gray-400 sm:border-none hover:bg-gray-900"
            >
              <span className="text-gray-400 text-sm">
                {new Date(Date.parse(episode.createdAt)).toLocaleString()}
              </span>
              <h2 className="text-lg">{episode.title}</h2>
              <Player />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

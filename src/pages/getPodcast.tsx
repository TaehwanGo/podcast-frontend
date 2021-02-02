import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { AccountFiller } from '../components/account-filler';
import { PODCAST_FRAGMENT } from '../fragment';
import {
  getPodcastQuery,
  getPodcastQueryVariables,
} from '../__generated__/getPodcastQuery';

const PODCAST_QUERY = gql`
  query getPodcastQuery($input: PodcastSearchInput!) {
    getPodcast(input: $input) {
      ok
      error
      podcast {
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
        <title>Podcast | Nuber Eats</title>
      </Helmet>
      <div className="grid sm:grid-cols-2 sm:justify-items-center">
        <AccountFiller />
        <section className="w-full border-b-2 border-gray-400 max-w-screen-sm sm:border-l-2">
          {`podcast ${data?.getPodcast.podcast?.title}`}
        </section>
      </div>
    </div>
  );
};

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllPodcastsQuery
// ====================================================

export interface getAllPodcastsQuery_getAllPodcasts_podcasts_episodes {
  __typename: "Episode";
  id: number;
  createdAt: any;
  title: string;
  description: string;
  fileURL: string;
}

export interface getAllPodcastsQuery_getAllPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  thumbnailImg: string;
  description: string;
  category: string;
  episodes: getAllPodcastsQuery_getAllPodcasts_podcasts_episodes[] | null;
}

export interface getAllPodcastsQuery_getAllPodcasts {
  __typename: "GetAllPodcastsOutput";
  ok: boolean;
  error: string | null;
  podcasts: getAllPodcastsQuery_getAllPodcasts_podcasts[] | null;
}

export interface getAllPodcastsQuery {
  getAllPodcasts: getAllPodcastsQuery_getAllPodcasts;
}

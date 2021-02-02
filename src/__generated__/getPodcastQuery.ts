/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastSearchInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getPodcastQuery
// ====================================================

export interface getPodcastQuery_getPodcast_podcast_episodes {
  __typename: "Episode";
  id: number;
  createdAt: any;
  title: string;
  description: string;
  fileURL: string;
}

export interface getPodcastQuery_getPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  thumbnailImg: string;
  description: string;
  category: string;
  episodes: getPodcastQuery_getPodcast_podcast_episodes[] | null;
}

export interface getPodcastQuery_getPodcast {
  __typename: "PodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: getPodcastQuery_getPodcast_podcast | null;
}

export interface getPodcastQuery {
  getPodcast: getPodcastQuery_getPodcast;
}

export interface getPodcastQueryVariables {
  input: PodcastSearchInput;
}
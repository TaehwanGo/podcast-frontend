import { gql } from '@apollo/client';

export const PODCAST_FRAGMENT = gql`
  fragment PodcastParts on Podcast {
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
`;

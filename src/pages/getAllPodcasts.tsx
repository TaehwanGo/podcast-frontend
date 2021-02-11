import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SidePage } from '../components/side-page';
import { Player } from '../components/player';
import {
  getAllPodcastsQuery,
  getAllPodcastsQuery_getAllPodcasts_podcasts,
} from '../__generated__/getAllPodcastsQuery';
import { allCategories } from '../__generated__/allCategories';

const ALL_CATEGORY = 'all';

export const PODCASTS_QUERY = gql`
  query getAllPodcastsQuery {
    getAllPodcasts {
      ok
      error
      podcasts {
        id
        title
        thumbnailImg
        description
        category {
          name
        }
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

export const CATEGORIES_QUERY = gql`
  query allCategories {
    allCategories {
      ok
      error
      categories {
        id
        name
        slug
      }
    }
  }
`;

export const GetAllPodcasts = () => {
  const [categoryName, setCategoryName] = useState(ALL_CATEGORY);
  const [allPodcasts, setAllPodcasts] = useState<
    getAllPodcastsQuery_getAllPodcasts_podcasts[] | undefined | null
  >();
  const [podcastsArray, setPodcastsArray] = useState<
    getAllPodcastsQuery_getAllPodcasts_podcasts[] | undefined | null
  >(allPodcasts);

  const { data, loading } = useQuery<getAllPodcastsQuery>(PODCASTS_QUERY);
  const {
    data: categories,
    loading: loadingCategories,
  } = useQuery<allCategories>(CATEGORIES_QUERY, {
    onCompleted: () => onCompleted(),
  });

  const onClickCategory = (ctgName: string) => {
    console.log('onClickCategory:', ctgName);

    if (categoryName === ALL_CATEGORY) {
      // categoryName이 all 이면 전부 다
      setPodcastsArray(allPodcasts);
      console.log('clicked all button:', allPodcasts);
    } else {
      // categoryName이 특정한 이름이면 그것에 해당하는 팟캐스트를 추출
      setPodcastsArray(
        allPodcasts?.filter(podcast => podcast.category?.name === ctgName),
      );
    }
    setCategoryName(ctgName); // 이게 useEffect의 trigger 이기때문에 제일 뒤에 와야함
    // sortPodcasts();
  };
  const [uploaded, setUploaded] = useState(0);
  const onCompleted = () => {
    console.log('data:', data);
    console.log('categories:', categories);
    if (data?.getAllPodcasts?.podcasts) {
      setPodcastsArray(data?.getAllPodcasts.podcasts);
      setUploaded(current => current + 1);
      setAllPodcasts(data?.getAllPodcasts?.podcasts);
    }
  };

  // const sortPodcasts = () => {
  //   console.log('uploaded:', uploaded);
  //   console.log('podcastsArray:', podcastsArray);
  //   const haveEpisodePodcasts = podcastsArray?.filter(
  //     podcast => podcast.episodes && podcast.episodes.length > 0,
  //   );
  //   const noEpisodePodcasts = podcastsArray?.filter(
  //     podcast => podcast.episodes && podcast.episodes.length === 0,
  //   );

  //   if (haveEpisodePodcasts && noEpisodePodcasts) {
  //     setPodcastsArray([...haveEpisodePodcasts, ...noEpisodePodcasts]);
  //   }
  // };

  // useEffect(() => {
  //   sortPodcasts();
  // }, []);

  useEffect(() => {
    console.log('uploaded:', uploaded);
    console.log('podcastsArray:', podcastsArray);
    const haveEpisodePodcasts = podcastsArray?.filter(
      podcast => podcast.episodes && podcast.episodes.length > 0,
    );
    const noEpisodePodcasts = podcastsArray?.filter(
      podcast => podcast.episodes && podcast.episodes.length === 0,
    );

    if (haveEpisodePodcasts && noEpisodePodcasts) {
      setPodcastsArray([...haveEpisodePodcasts, ...noEpisodePodcasts]);
    }
    // console.log('allPodcasts:', allPodcasts);
  }, [categoryName, uploaded]);

  return (
    <div>
      <Helmet>
        <title>Home | Podcast</title>
      </Helmet>
      <div className="page-container">
        <SidePage />
        {!loading && (
          <section className="border-b-2 border-gray-400 sm:border-none app-page">
            {/* Search bar */}
            {/* Category list */}
            <div className="px-5">
              <button
                onClick={() => onClickCategory(ALL_CATEGORY)}
                className="mr-5 py-4 focus:outline-none"
              >
                all
              </button>
              {categories?.allCategories.categories?.map(category => (
                // Link로 감싸고 클릭하면 podcast detail로 이동(미구현)
                <button
                  onClick={() => onClickCategory(category.name)}
                  key={category.id}
                  className="mr-5 py-4 focus:outline-none"
                >
                  {category.name}
                </button>
              ))}
            </div>
            {console.log('render podcastsArray:', podcastsArray)}
            {podcastsArray &&
              podcastsArray.map(podcast => (
                <div
                  key={podcast.id}
                  className="py-4 px-5 border-t border-gray-400 sm:border-none hover:bg-gray-900"
                >
                  <Link role="link" to={`/podcast/${podcast.id}`}>
                    <div className="flex items-center">
                      <div
                        style={{
                          backgroundImage: `url(${podcast.thumbnailImg})`,
                        }}
                        className="w-14 h-14 bg-cover bg-center rounded-lg"
                      ></div>
                      <div className="ml-2">
                        <h3 className="text-lg">{podcast.title}</h3>
                        <h4 className="text-gray-400 text-sm">
                          {podcast.episodes &&
                          podcast.episodes[0] &&
                          podcast.episodes[0].createdAt
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
                      {podcast.episodes &&
                      podcast.episodes[0] &&
                      podcast.episodes[0].title
                        ? podcast.episodes[0].title
                        : 'No Episode'}
                    </h3>
                    <h4>
                      {podcast.episodes &&
                      podcast.episodes[0] &&
                      podcast.episodes[0].description
                        ? podcast.episodes[0].description
                        : 'No Episode'}
                    </h4>
                  </div>

                  <Player />
                </div>
              ))}
          </section>
        )}
      </div>
    </div>
  );
};

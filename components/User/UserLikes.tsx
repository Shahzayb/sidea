import React from 'react';
import { useGetUserLikesQuery } from '../../graphql/client/types';
import { clientPageQueryLimit } from '../../client-env';
import { useInfiniteScroll } from 'react-infinite-scroll-hook';
import useGutterAllChild from '../../hooks/useGutterAllChild';
import IdeaLink from '../Idea/IdeaLink';
import IdeaLinkSkeleton from '../Skeletons/IdeaLinkSkeleton';
import CustomError from '../Errors/CustomError';

interface Props {
  id: string;
}

function UserLikes({ id }: Props) {
  const classes = useGutterAllChild({ spacing: 2 });

  const [fetchMoreFailed, setFetchMoreFailed] = React.useState(false);

  const {
    data,
    loading,
    networkStatus,
    fetchMore,
    error,
    refetch,
  } = useGetUserLikesQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      id,
      limit: clientPageQueryLimit,
    },
  });

  const infiniteRef = useInfiniteScroll<HTMLDivElement>({
    loading: loading || networkStatus === 4,
    hasNextPage: !!(
      data &&
      data.user &&
      data.user.likedIdeas.page.hasNextPage &&
      !error &&
      !fetchMoreFailed
    ),
    async onLoadMore() {
      if (data && data.user) {
        try {
          await fetchMore({
            variables: {
              after_id: data.user.likedIdeas.page.cursor,
            },
            updateQuery(previousResult, { fetchMoreResult }) {
              if (!fetchMoreResult) return previousResult;
              const previousEntry = previousResult.user!.likedIdeas.entry;
              const newEntry = fetchMoreResult.user!.likedIdeas.entry;

              return Object.assign({}, previousResult, {
                user: {
                  ...fetchMoreResult.user,
                  likedIdeas: {
                    ...fetchMoreResult.user!.likedIdeas,
                    entry: [...previousEntry, ...newEntry],
                  },
                },
              });
            },
          });
        } catch (e) {
          console.log('e', e);
          setFetchMoreFailed(true);
        }
      }
    },
  });

  return (
    <div ref={infiniteRef}>
      <div className={classes.gutterAllChild}>
        {!!data &&
          !!data.user &&
          data.user.likedIdeas.entry.map((idea) => (
            <IdeaLink key={idea.id} idea={idea} />
          ))}
        {(loading || networkStatus === 4) && <IdeaLinkSkeleton />}
        {!loading &&
          !error &&
          (!data || !data.user || !data.user.likedIdeas.entry.length) && (
            <CustomError title="No liked ideas found." />
          )}
        {!loading && error && (
          <CustomError
            title="Ooops. Something went wrong!"
            retry={async () => {
              try {
                await refetch();
              } catch (e) {
                console.log('e', e);
              }
            }}
          />
        )}
        {!loading && fetchMoreFailed && (
          <CustomError
            title="Ooops. Something went wrong!"
            retry={() => {
              setFetchMoreFailed(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default UserLikes;

import React from 'react';
import { useGetUserIdeasQuery } from '../../graphql/client/types';
import { clientPageQueryLimit } from '../../client-env';
import { useInfiniteScroll } from 'react-infinite-scroll-hook';
import useGutterAllChild from '../../hooks/useGutterAllChild';
import IdeaLink from '../Idea/IdeaLink';
import IdeaLinkSkeleton from '../Skeletons/IdeaLinkSkeleton';
import CustomError from '../Errors/CustomError';

interface Props {
  id: string;
}

function UserIdeas({ id }: Props) {
  const classes = useGutterAllChild({ spacing: 2 });

  const {
    data,
    loading,
    networkStatus,
    fetchMore,
    error,
    refetch,
  } = useGetUserIdeasQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      id,
      limit: clientPageQueryLimit,
    },
  });

  const infiniteRef = useInfiniteScroll<HTMLDivElement>({
    loading: loading || networkStatus === 4,
    hasNextPage: data && data.user ? data.user.ideas.page.hasNextPage : true,
    async onLoadMore() {
      if (data && data.user) {
        try {
          await fetchMore({
            variables: {
              after_id: data.user.ideas.page.cursor,
            },
            updateQuery(previousResult, { fetchMoreResult }) {
              if (!fetchMoreResult) return previousResult;
              const previousEntry = previousResult.user!.ideas.entry;
              const newEntry = fetchMoreResult.user!.ideas.entry;

              return Object.assign({}, previousResult, {
                user: {
                  ...fetchMoreResult.user,
                  ideas: {
                    ...fetchMoreResult.user!.ideas,
                    entry: [...previousEntry, ...newEntry],
                  },
                },
              });
            },
          });
        } catch {}
      }
    },
  });

  return (
    <div ref={infiniteRef}>
      <div className={classes.gutterAllChild}>
        {!!data &&
          !!data.user &&
          data.user.ideas.entry.map((idea) => (
            <IdeaLink
              key={idea.id}
              idea={{
                ...idea,
                user: {
                  id: data.user!.id,
                  username: data.user!.username,
                  avatar: data.user!.avatar,
                },
              }}
            />
          ))}
        {(loading || networkStatus === 4) && <IdeaLinkSkeleton />}
        {!loading &&
          !error &&
          (!data || !data.user || !data.user.ideas.entry.length) && (
            <CustomError title="No idea found." />
          )}
        {!loading && error && (
          <CustomError
            title="Ooops. Something went wrong!"
            retry={() => {
              if (refetch) {
                refetch().catch(console.log);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export default UserIdeas;

import React from 'react';
import { useGetSavedUserIdeasQuery } from '../../graphql/client/types';
import { clientPageQueryLimit } from '../../client-env';
import { useInfiniteScroll } from 'react-infinite-scroll-hook';
import useGutterAllChild from '../../hooks/useGutterAllChild';
import IdeaLink from '../Idea/IdeaLink';
import IdeaLinkSkeleton from '../Skeletons/IdeaLinkSkeleton';
import CustomError from '../Errors/CustomError';

interface Props {
  id: string;
}

function SavedUserIdeas({ id }: Props) {
  const classes = useGutterAllChild({ spacing: 2 });

  const [fetchMoreFailed, setFetchMoreFailed] = React.useState(false);

  const {
    data,
    loading,
    networkStatus,
    fetchMore,
    error,
    refetch,
  } = useGetSavedUserIdeasQuery({
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
      data.user.savedIdeas.page.hasNextPage &&
      !error &&
      !fetchMoreFailed
    ),
    async onLoadMore() {
      if (data && data.user) {
        try {
          await fetchMore({
            variables: {
              after_id: data.user.savedIdeas.page.cursor,
            },
            updateQuery(previousResult, { fetchMoreResult }) {
              if (!fetchMoreResult) return previousResult;
              const previousEntry = previousResult.user!.savedIdeas.entry;
              const newEntry = fetchMoreResult.user!.savedIdeas.entry;

              return Object.assign({}, previousResult, {
                user: {
                  ...fetchMoreResult.user,
                  savedIdeas: {
                    ...fetchMoreResult.user!.savedIdeas,
                    entry: [...previousEntry, ...newEntry],
                  },
                },
              });
            },
          });
        } catch {
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
          data.user.savedIdeas.entry.map((idea) => (
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
          (!data || !data.user || !data.user.savedIdeas.entry.length) && (
            <CustomError title="No idea found." />
          )}
        {!loading && error && (
          <CustomError
            title="Ooops. Something went wrong!"
            retry={async () => {
              try {
                await refetch();
              } catch {}
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

export default SavedUserIdeas;

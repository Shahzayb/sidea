import React from 'react';
import { useInfiniteScroll } from 'react-infinite-scroll-hook';
import { useGetNewIdeasQuery } from '../../../graphql/client/types';
import Error from '../../Errors/Error';
import IdeaLink from './IdeaLink';
import useGutterAllChild from '../../../hooks/useGutterAllChild';
import IdeaLinkSkeleton from '../../Skeletons/IdeaLinkSkeleton';

const QUERY_LIMIT = 1;

function NewIdeas() {
  const classes = useGutterAllChild({ spacing: 2 });

  const {
    data,
    loading,
    networkStatus,
    fetchMore,
    error,
    refetch,
  } = useGetNewIdeasQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: QUERY_LIMIT,
    },
  });

  const infiniteRef = useInfiniteScroll<HTMLDivElement>({
    loading: loading || networkStatus === 4,
    hasNextPage: data ? data.newIdeas.page.hasNextPage : true,
    onLoadMore() {
      data &&
        fetchMore({
          variables: {
            after_id: data.newIdeas.page.cursor,
          },
          updateQuery(previousResult, { fetchMoreResult }) {
            if (!fetchMoreResult) return previousResult;
            const previousEntry = previousResult.newIdeas.entry;
            const newEntry = fetchMoreResult.newIdeas.entry;

            return Object.assign({}, previousResult, {
              newIdeas: {
                ...fetchMoreResult.newIdeas,
                entry: [...previousEntry, ...newEntry],
              },
            });
          },
        }).catch(console.log);
    },
  });

  return (
    <div ref={infiniteRef}>
      <div className={classes.gutterAllChild}>
        {!!data &&
          data.newIdeas.entry.map((idea) => (
            <IdeaLink key={idea.id} idea={idea} />
          ))}
        {(loading || networkStatus === 4) && <IdeaLinkSkeleton />}
        {!loading && (!data || !data.newIdeas.entry.length) && (
          <Error
            errorType="no-content"
            retry={() => {
              if (refetch) {
                refetch().catch(console.log);
              }
            }}
          />
        )}
        {!loading && error && (
          <Error
            errorType="network"
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

export default NewIdeas;

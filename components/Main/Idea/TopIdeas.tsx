import React from 'react';
import { useInfiniteScroll } from 'react-infinite-scroll-hook';
import {
  useGetTopIdeasQuery,
  GetTopIdeasQuery,
  Interval,
} from '../../../graphql/client/types';
import CustomError from '../../Errors/Error';
import IdeaLink from './IdeaLink';
import useGutterAllChild from '../../../hooks/useGutterAllChild';
import IdeaLinkSkeleton from '../../Skeletons/IdeaLinkSkeleton';
import { clientPageQueryLimit } from '../../../client-env';
import validator from 'validator';

interface Props {
  interval: Interval;
}

function TopIdeas({ interval = Interval.AllTime }: Props) {
  const classes = useGutterAllChild({ spacing: 2 });

  const {
    data,
    loading,
    networkStatus,
    fetchMore,
    error,
    refetch,
  } = useGetTopIdeasQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: clientPageQueryLimit,
      skip: 0,
      interval,
    },
  });

  const infiniteRef = useInfiniteScroll<HTMLDivElement>({
    loading: loading || networkStatus === 4,
    hasNextPage: data ? data.topIdeas.page.hasNextPage : true,
    onLoadMore() {
      if (data) {
        if (
          !validator.isInt(data.topIdeas.page.cursor!, {
            allow_leading_zeroes: true,
          })
        ) {
          throw new Error('Skip is not an Int');
        }

        fetchMore({
          variables: {
            skip: validator.toInt(data.topIdeas.page.cursor!),
          },
          updateQuery(previousResult: GetTopIdeasQuery, { fetchMoreResult }) {
            if (!fetchMoreResult) return previousResult;
            const previousEntry = previousResult.topIdeas.entry;
            const newEntry = fetchMoreResult.topIdeas.entry;

            return Object.assign({}, previousResult, {
              topIdeas: {
                ...fetchMoreResult.topIdeas,
                entry: [...previousEntry, ...newEntry],
              },
            });
          },
        }).catch(console.log);
      }
    },
  });

  return (
    <div ref={infiniteRef}>
      <div className={classes.gutterAllChild}>
        {!!data &&
          data.topIdeas.entry.map((idea) => (
            <IdeaLink key={idea.id} idea={idea} />
          ))}
        {(loading || networkStatus === 4) && <IdeaLinkSkeleton />}
        {!loading && !error && (!data || !data.topIdeas.entry.length) && (
          <CustomError
            errorType="no-content"
            retry={() => {
              if (refetch) {
                refetch().catch(console.log);
              }
            }}
          />
        )}
        {!loading && error && (
          <CustomError
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

export default TopIdeas;

import React from 'react';
import { List } from '@material-ui/core';

import { useInfiniteScroll } from 'react-infinite-scroll-hook';

import {
  useGetIdeaFeaturesQuery,
  GetIdeaFeaturesQuery,
} from '../../graphql/client/types';
import { clientPageQueryLimit } from '../../client-env';
import CustomError from '../Errors/CustomError';
import FeatureContainer from './FeatureContainer';

interface Props {
  id: string;
}

function FeatureList({ id }: Props) {
  const [fetchMoreFailed, setFetchMoreFailed] = React.useState(false);

  const {
    data,
    loading,
    networkStatus,
    fetchMore,
    error,
    refetch,
  } = useGetIdeaFeaturesQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      idea_id: id,
      limit: clientPageQueryLimit,
    },
  });

  const infiniteRef = useInfiniteScroll<HTMLDivElement>({
    loading: loading || networkStatus === 4,
    hasNextPage: !!(
      data &&
      data.features.page.hasNextPage &&
      !error &&
      !fetchMoreFailed
    ),
    async onLoadMore() {
      if (data) {
        try {
          await fetchMore({
            variables: {
              after_feature_id: data.features.page.cursor,
            },
            updateQuery(
              previousResult: GetIdeaFeaturesQuery,
              { fetchMoreResult }
            ) {
              if (!fetchMoreResult) return previousResult;
              const previousEntry = previousResult.features.entry;
              const newEntry = fetchMoreResult.features.entry;

              return Object.assign({}, previousResult, {
                features: {
                  ...fetchMoreResult.features,
                  entry: [...previousEntry, ...newEntry],
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
      {!!data && (
        <List>
          {data.features.entry.map((feature) => (
            <FeatureContainer key={feature.id} feature={feature} />
          ))}
        </List>
      )}
      {(loading || networkStatus === 4) && <div>loading</div>}
      {!loading && !error && (!data || !data.features.entry.length) && (
        <CustomError title="No feature found." />
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
  );
}

export default FeatureList;

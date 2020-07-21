import React from 'react';
import {
  connectInfiniteHits,
  connectStateResults,
} from 'react-instantsearch-dom';
import {
  InfiniteHitsProvided,
  StateResultsProvided,
} from 'react-instantsearch-core';
import SearchIdeaLink from './SearchIdeaLink';
import useGutterAllChild from '../../hooks/useGutterAllChild';
import { IdeaHit } from './IdeaHitType';
import { useInfiniteScroll } from 'react-infinite-scroll-hook';
import SearchIdeaLinkSkeleton from '../Skeletons/SearchIdeaLinkSkeleton';
import CustomError from '../Errors/CustomError';

function InfiniteIdeaHits({
  hits,
  hasMore,
  refineNext,
  isSearchStalled,
  searching,
  error,
  searchResults,
  ...props
}: InfiniteHitsProvided<IdeaHit> & StateResultsProvided<IdeaHit>) {
  const classes = useGutterAllChild({
    spacing: 2,
  });

  const loading = isSearchStalled || searching;
  const hasResults = searchResults && searchResults.nbHits !== 0;

  const infiniteRef = useInfiniteScroll<HTMLDivElement>({
    loading: loading,
    hasNextPage: hasMore,
    onLoadMore() {
      refineNext();
    },
  });

  return (
    <div ref={infiniteRef} className={classes.gutterAllChild}>
      {hits.map((hit) => (
        <SearchIdeaLink key={hit.id} idea={hit} />
      ))}
      {loading && <SearchIdeaLinkSkeleton />}
      {!loading && error && <CustomError title="Search is failed" />}
      {!loading && !error && !hasResults && (
        <CustomError title="No result found" />
      )}
    </div>
  );
}

export default connectInfiniteHits(connectStateResults(InfiniteIdeaHits));

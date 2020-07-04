import Home from '../components/Home';
import { useIdeaCategory, Category } from '../context/idea-category-context';
import React from 'react';
import { useRouter } from 'next/router';
import { Interval } from '../graphql/client/types';
const Index = () => {
  const router = useRouter();

  const { changeCategory, changeInterval } = useIdeaCategory();

  const intervalQuery = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('interval');
    }
  }, [typeof window !== 'undefined' ? window.location.search : undefined]);

  React.useEffect(() => {
    changeCategory(Category.TOP_IDEAS);
  }, []);

  React.useEffect(() => {
    if (!intervalQuery) {
      changeInterval(Interval.Day);
      router.push(`/top?interval=${Interval.Day.toLowerCase()}`, undefined, {
        shallow: true,
      });
    } else if (intervalQuery === Interval.Day.toLowerCase()) {
      changeInterval(Interval.Day);
    } else if (intervalQuery === Interval.Week.toLowerCase()) {
      changeInterval(Interval.Week);
    } else if (intervalQuery === Interval.Month.toLowerCase()) {
      changeInterval(Interval.Month);
    } else if (intervalQuery === Interval.Year.toLowerCase()) {
      changeInterval(Interval.Year);
    } else if (intervalQuery === Interval.AllTime.toLowerCase()) {
      changeInterval(Interval.AllTime);
    } else {
      changeInterval(Interval.Day);
    }
  }, [intervalQuery]);

  return <Home />;
};

export default Index;

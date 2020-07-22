import Home from '../components/Screens/Home';
import { useIdeaCategory, Category } from '../context/idea-category-context';
import React from 'react';
import Head from 'next/head';

const Index = () => {
  const { changeCategory } = useIdeaCategory();

  React.useEffect(() => {
    changeCategory(Category.NEW_IDEAS);
  }, []);

  return (
    <>
      <Head>
        <title>New Ideas - Sidea</title>
      </Head>
      <Home />
    </>
  );
};

export default Index;

import Home from '../components/Screens/Home';
import { useIdeaCategory, Category } from '../context/idea-category-context';
import React from 'react';

const Index = () => {
  const { changeCategory } = useIdeaCategory();

  React.useEffect(() => {
    changeCategory(Category.NEW_IDEAS);
  }, []);

  return <Home />;
};

export default Index;

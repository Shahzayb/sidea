import React from 'react';
import { Interval } from '../graphql/client/types';

export enum Category {
  NEW_IDEAS = 'NEW_IDEAS',
  TOP_IDEAS = 'TOP_IDEAS',
}

// export type Category = 'NEW_IDEAS' | 'TOP_IDEAS';

export type IdeaCategory = {
  category: Category;
  changeCategory: (category: Category) => void;
  interval: Interval;
  changeInterval: (interval: Interval) => void;
};

const IdeaCategoryContext = React.createContext<IdeaCategory | undefined>(
  undefined
);

IdeaCategoryContext.displayName = 'IdeaCategoryContext';

const IdeaCategoryProvider: React.FC = ({ children }) => {
  const [category, setCategory] = React.useState<Category>(Category.NEW_IDEAS);
  const [interval, setInterval] = React.useState<Interval>(Interval.Day);

  const changeCategory = (category: Category) => {
    setCategory(category);
  };

  const changeInterval = (interval: Interval) => {
    setInterval(interval);
  };

  const value = React.useMemo(
    () => ({
      category,
      interval,
      changeCategory,
      changeInterval,
    }),
    [category, interval, changeCategory, changeInterval]
  );

  return (
    <IdeaCategoryContext.Provider value={value}>
      {children}
    </IdeaCategoryContext.Provider>
  );
};

function useIdeaCategory() {
  const context = React.useContext(IdeaCategoryContext);
  if (context === undefined) {
    throw new Error(
      `useIdeaCategory must be used within a IdeaCategoryProvider`
    );
  }
  return context;
}

export { IdeaCategoryProvider, useIdeaCategory };

import React from 'react';
import {
  useIdeaCategory,
  Category,
} from '../../../context/idea-category-context';
import {
  Paper,
  Box,
  Tabs,
  Tab,
  TabProps,
  Select,
  MenuItem,
} from '@material-ui/core';
import { Interval } from '../../../graphql/client/types';

function a11yProps(index: any) {
  return {
    id: `category-tab-${index}`,
    'aria-controls': `category-tabpanel-${index}`,
  };
}

function IdeaCategoryTab() {
  const {
    category,
    changeCategory,
    interval,
    changeInterval,
  } = useIdeaCategory();

  const handleCategoryChange = (
    event: React.ChangeEvent<{}>,
    value: Category
  ) => {
    changeCategory(value);
  };

  const handleIntervalChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    changeInterval(event.target.value as Interval);
  };

  return (
    <Paper elevation={0}>
      <Box p={1}>
        <Tabs
          value={category}
          onChange={handleCategoryChange}
          aria-label="category tabs"
        >
          <Tab
            value={Category.NEW_IDEAS}
            label="New Ideas"
            {...a11yProps(Category.NEW_IDEAS)}
          />

          <Tab
            component={React.forwardRef((props: TabProps, ref: any) => {
              return (
                <>
                  <div ref={ref} {...props}>
                    {props.children}
                  </div>
                  {props['aria-selected'] && (
                    <Box display="flex" alignItems="flex-end" ml={2}>
                      <Select value={interval} onChange={handleIntervalChange}>
                        <MenuItem value={Interval.Day}>Today</MenuItem>
                        <MenuItem value={Interval.Week}>This Week</MenuItem>
                        <MenuItem value={Interval.Year}>This Year</MenuItem>
                        <MenuItem value={Interval.AllTime}>All Time</MenuItem>
                      </Select>
                    </Box>
                  )}
                </>
              );
            })}
            value={Category.TOP_IDEAS}
            label="Top Ideas"
            {...a11yProps(Category.TOP_IDEAS)}
          />
        </Tabs>
      </Box>
    </Paper>
  );
}

export default IdeaCategoryTab;

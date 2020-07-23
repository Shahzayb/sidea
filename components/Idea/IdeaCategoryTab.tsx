import React from 'react';
import { useIdeaCategory, Category } from '../../context/idea-category-context';
import {
  Paper,
  Box,
  Tabs,
  Tab,
  TabProps,
  Select,
  MenuItem,
} from '@material-ui/core';

import {
  NewReleases as NewIcon,
  TrendingUp as TopIcon,
} from '@material-ui/icons';

import { Interval } from '../../graphql/client/types';
import { useRouter } from 'next/router';
import Link from '../Link';
import { a11yProps } from '../Tabs/TabPanel';

function IdeaCategoryTab() {
  const {
    category,
    changeCategory,
    interval,
    changeInterval,
  } = useIdeaCategory();

  const router = useRouter();

  const handleCategoryChange = (
    event: React.ChangeEvent<{}>,
    value: Category
  ) => {
    changeCategory(value);
  };

  const handleIntervalChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = event.target.value as Interval;
    changeInterval(value);
  };

  return (
    <Paper>
      <Box paddingX={1}>
        <Tabs
          value={category}
          onChange={handleCategoryChange}
          aria-label="category tabs"
          textColor="secondary"
        >
          <Tab
            value={Category.NEW_IDEAS}
            icon={<NewIcon />}
            label="New Ideas"
            href="/new"
            naked
            shallow
            component={Link}
            {...a11yProps(Category.NEW_IDEAS, 'category')}
          />

          <Tab
            icon={<TopIcon />}
            component={React.forwardRef((props: TabProps, ref: any) => {
              return (
                <>
                  <div ref={ref} {...props}>
                    <Link
                      color="inherit"
                      underline="none"
                      href="/top?interval=day"
                      shallow
                    >
                      {props.children}
                    </Link>
                  </div>
                  {props['aria-selected'] && (
                    <Box display="flex" alignItems="flex-end" ml={2}>
                      <Select value={interval} onChange={handleIntervalChange}>
                        <MenuItem
                          component={Link}
                          shallow
                          href="/top?interval=day"
                          color="inherit"
                          underline="none"
                          value={Interval.Day}
                        >
                          Today
                        </MenuItem>

                        <MenuItem
                          component={Link}
                          shallow
                          href="/top?interval=week"
                          color="inherit"
                          underline="none"
                          value={Interval.Week}
                        >
                          This Week
                        </MenuItem>

                        <MenuItem
                          component={Link}
                          shallow
                          href="/top?interval=month"
                          color="inherit"
                          underline="none"
                          value={Interval.Month}
                        >
                          This Month
                        </MenuItem>

                        <MenuItem
                          component={Link}
                          shallow
                          href="/top?interval=year"
                          color="inherit"
                          underline="none"
                          value={Interval.Year}
                        >
                          This Year
                        </MenuItem>

                        <MenuItem
                          component={Link}
                          shallow
                          href="/top?interval=all_time"
                          color="inherit"
                          underline="none"
                          value={Interval.AllTime}
                        >
                          All Time
                        </MenuItem>
                      </Select>
                    </Box>
                  )}
                </>
              );
            })}
            value={Category.TOP_IDEAS}
            label="Top Ideas"
            {...a11yProps(Category.TOP_IDEAS, 'category')}
          />
        </Tabs>
      </Box>
    </Paper>
  );
}

export default IdeaCategoryTab;

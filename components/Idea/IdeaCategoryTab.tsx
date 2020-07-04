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
import { Interval } from '../../graphql/client/types';
import { useRouter } from 'next/router';
import Link from '../Link';

function a11yProps(index: any) {
  return {
    id: `category-tab-${index}`,
    'aria-controls': `category-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: Category;
  value: Category;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`category-tabpanel-${index}`}
      aria-labelledby={`category-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

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
    // let url = '/';
    // if (value === Category.NEW_IDEAS) {
    //   url += 'new';
    // } else if (value === Category.TOP_IDEAS) {
    //   url += `top?interval=${interval.toLowerCase()}`;
    // }
    changeCategory(value);
    console.log('handleCategoryChange');
    // router.push(url);
  };

  const handleIntervalChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = event.target.value as Interval;
    changeInterval(value);
    console.log('handleIntervalChange');
    // router.push(`/top?interval=${value.toLowerCase()}`, undefined, {
    //   shallow: true,
    // });
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
            href="/new"
            naked
            shallow
            component={Link}
            {...a11yProps(Category.NEW_IDEAS)}
          />

          <Tab
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
            {...a11yProps(Category.TOP_IDEAS)}
          />
        </Tabs>
      </Box>
    </Paper>
  );
}

export default IdeaCategoryTab;

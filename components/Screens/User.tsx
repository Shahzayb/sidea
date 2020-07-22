import React from 'react';
import UserContainer from '../User/UserContainer';
import { useRouter } from 'next/router';
import UserNavigationTab, { UserPageTabs } from '../User/UserNavigationTab';

import Navbar from '../Navbar';
import Footer from '../Footer';
import { Container, Box, makeStyles } from '@material-ui/core';
import TabPanel from '../Tabs/TabPanel';
import UserIdeas from '../User/UserIdeas';
import SavedUserIdeas from '../User/SavedUserIdeas';
import UserProfileCardSkeleton from '../Skeletons/UserProfileCardSkeleton';
import IdeaLinkSkeleton from '../Skeletons/IdeaLinkSkeleton';
import UserLikes from '../User/UserLikes';
import withNavbar from '../../hoc/withNavbar';
import withFooter from '../../hoc/withFooter';
import withLayout from '../../hoc/withLayout';

const useStyles = makeStyles((theme) => ({
  columnLayout: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'row-reverse',
      alignItems: 'flex-start',
    },
  },
  columnOne: {
    [theme.breakpoints.up('md')]: {
      flex: 2,
      marginRight: theme.spacing(4),
    },
  },
  columnTwo: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      flex: 1,
      marginBottom: 0,
    },
  },
}));

interface Props {
  page: UserPageTabs;
}

function User({ page }: Props) {
  const classes = useStyles();

  const {
    query: { userId },
  } = useRouter();

  if (!userId) {
    return (
      <div className={classes.columnLayout}>
        <div className={classes.columnTwo}>
          <UserProfileCardSkeleton />
        </div>

        <div className={classes.columnOne}>
          <IdeaLinkSkeleton />
        </div>
      </div>
    );
  }

  if (Array.isArray(userId)) {
    throw new Error('invalid query type');
  }
  return (
    <div className={classes.columnLayout}>
      <div className={classes.columnTwo}>
        <UserContainer id={userId} />
      </div>

      <div className={classes.columnOne}>
        <UserNavigationTab userId={userId} page={page} />
        <Box my={2}>
          <TabPanel value={page} index="ideas" name="user">
            <UserIdeas id={userId} />
          </TabPanel>
          <TabPanel value={page} index="likes" name="user">
            <UserLikes id={userId} />
          </TabPanel>
          <TabPanel value={page} index="saved" name="user">
            <SavedUserIdeas id={userId} />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}

export default withLayout(withFooter(withNavbar(User)), 'lg');

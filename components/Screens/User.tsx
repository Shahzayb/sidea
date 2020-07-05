import React from 'react';
import UserContainer from '../User/UserContainer';
import { useRouter } from 'next/router';
import UserNavigationTab, { UserPageTabs } from '../User/UserNavigationTab';

import Navbar from '../Navbar';
import Footer from '../Footer';
import { Container, Box, makeStyles } from '@material-ui/core';
import TabPanel from '../Tabs/TabPanel';
import UserIdeas from '../User/UserIdeas';

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
    return <div> userId loading</div>;
  }

  if (Array.isArray(userId)) {
    throw new Error('invalid query type');
  }
  return (
    <div>
      <Navbar />
      <Container
        maxWidth="lg"
        className={classes.columnLayout}
        style={{ marginTop: '5rem' }}
      >
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
              <div>likes</div>
            </TabPanel>
            <TabPanel value={page} index="saved" name="user">
              <div>saved</div>
            </TabPanel>
          </Box>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default User;

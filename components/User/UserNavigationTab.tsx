import React from 'react';
import { Paper, Box, Tabs, Tab } from '@material-ui/core';
import { Save as SaveIcon, Favorite as FavoriteIcon } from '@material-ui/icons';
import IdeaIcon from '../Icons/Idea';

import Link from '../Link';
import { a11yProps } from '../Tabs/TabPanel';

export type UserPageTabs = 'ideas' | 'likes' | 'saved';

interface Props {
  userId: string;
  page: UserPageTabs;
}

function UserNavigationTab({ userId, page }: Props) {
  const [curTab, setCurTab] = React.useState<UserPageTabs>(page);
  const handleChange = (event: React.ChangeEvent<{}>, value: UserPageTabs) => {
    setCurTab(value);
  };
  return (
    <Paper>
      <Box paddingX={1}>
        <Tabs
          value={curTab}
          onChange={handleChange}
          textColor="secondary"
          aria-label="user tabs"
        >
          <Tab
            label="Ideas"
            icon={<IdeaIcon />}
            href={`/user/[userId]/ideas`}
            as={`/user/${userId}/ideas`}
            naked
            component={Link}
            value="ideas"
            {...a11yProps('ideas', 'user')}
          />
          <Tab
            label="Saved"
            icon={<SaveIcon />}
            href={`/user/[userId]/ideas/saved`}
            as={`/user/${userId}/ideas/saved`}
            naked
            component={Link}
            value="saved"
            {...a11yProps('saved', 'user')}
          />
          <Tab
            label="Likes"
            icon={<FavoriteIcon />}
            href={`/user/[userId]/ideas/likes`}
            as={`/user/${userId}/ideas/likes`}
            naked
            component={Link}
            value="likes"
            {...a11yProps('likes', 'user')}
          />
        </Tabs>
      </Box>
    </Paper>
  );
}

export default UserNavigationTab;

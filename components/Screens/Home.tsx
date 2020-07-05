import { Box } from '@material-ui/core';
import withNavbar from '../../hoc/withNavbar';
import withFooter from '../../hoc/withFooter';
import withLayout from '../../hoc/withLayout';
import Welcome from '../Welcome';
import NewIdeas from '../Idea/NewIdeas';
import IdeaCategoryTab from '../Idea/IdeaCategoryTab';
import { useIdeaCategory, Category } from '../../context/idea-category-context';
import TopIdeas from '../Idea/TopIdeas';
import { useAuth } from '../../context/auth-context';
import TabPanel from '../Tabs/TabPanel';

const Home = () => {
  const { category, interval } = useIdeaCategory();
  const { authenticated, loading } = useAuth();
  return (
    <div>
      {!authenticated && !loading && <Welcome />}
      <main>
        <section>
          <Box my={2}>
            <IdeaCategoryTab />
          </Box>
          <Box my={2}>
            <TabPanel
              value={category}
              index={Category.NEW_IDEAS}
              name="category"
            >
              <NewIdeas />
            </TabPanel>
            <TabPanel
              value={category}
              index={Category.TOP_IDEAS}
              name="category"
            >
              <TopIdeas interval={interval} />
            </TabPanel>
          </Box>
        </section>
      </main>
    </div>
  );
};

export default withLayout(withFooter(withNavbar(Home)), 'md');

import { Box } from '@material-ui/core';
import withNavbar from '../hoc/withNavbar';
import withFooter from '../hoc/withFooter';
import withLayout from '../hoc/withLayout';
import Welcome from './Welcome';
import NewIdeas from './Idea/NewIdeas';
import IdeaCategoryTab, { TabPanel } from './Idea/IdeaCategoryTab';
import { useIdeaCategory, Category } from '../context/idea-category-context';
import TopIdeas from './Idea/TopIdeas';
import { useAuth } from '../context/auth-context';

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
            <TabPanel value={category} index={Category.NEW_IDEAS}>
              <NewIdeas />
            </TabPanel>
            <TabPanel value={category} index={Category.TOP_IDEAS}>
              <TopIdeas interval={interval} />
            </TabPanel>
          </Box>
        </section>
      </main>
    </div>
  );
};

export default withLayout(withFooter(withNavbar(Home)), 'md');

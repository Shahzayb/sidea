import { Box } from '@material-ui/core';
import withNavbar from '../hoc/withNavbar';
import withFooter from '../hoc/withFooter';

import withLayout from '../hoc/withLayout';
import Welcome from '../components/Welcome';
import NewIdeas from '../components/Main/Idea/NewIdeas';
import IdeaCategoryTab from '../components/Main/Idea/IdeaCategoryTab';
import { useIdeaCategory, Category } from '../context/idea-category-context';
import TopIdeas from '../components/Main/Idea/TopIdeas';
import { useAuth } from '../context/auth-context';

const Index = () => {
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
            {category === Category.NEW_IDEAS && <NewIdeas />}
            {category === Category.TOP_IDEAS && (
              <TopIdeas interval={interval} />
            )}
          </Box>
        </section>
      </main>
    </div>
  );
};

export default withLayout(withFooter(withNavbar(Index)), 'md');

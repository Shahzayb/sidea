import { Box } from '@material-ui/core';
import withNavbar from '../hoc/withNavbar';
import withFooter from '../hoc/withFooter';

import withLayout from '../hoc/withLayout';
import Welcome from '../components/Welcome';
import NewIdeas from '../components/Main/Idea/NewIdeas';

const Index = () => {
  return (
    <div>
      <Welcome />
      <main>
        {/* ideas list section */}
        <section>
          <Box my={2}>
            <NewIdeas />
          </Box>
        </section>
      </main>
    </div>
  );
};

export default withLayout(withFooter(withNavbar(Index)), 'md');

import Illustration from '../components/Illustration';
import { Typography, Button, Container } from '@material-ui/core';
import ButtonLink from '../components/ButtonLink';
import withNavbar from '../hoc/withNavbar';
import withFooter from '../hoc/withFooter';

const Index = () => {
  return (
    <div>
      <Container maxWidth="lg">
        <div style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
          <div style={{ flex: 1 }}>
            <Typography component="h1" variant="h3">
              Find Idea For Your Next Full-Stack Web Project
            </Typography>
            <div>
              <Button style={{ marginRight: '1rem' }}>explore</Button>
              <ButtonLink href="/idea/create">create idea</ButtonLink>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <Illustration />
          </div>
        </div>
        <main>
          {/* ideas list section */}
          <section></section>
        </main>
      </Container>
    </div>
  );
};

export default withFooter(withNavbar(Index));

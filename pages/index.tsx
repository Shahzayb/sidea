import Navbar from '../components/Navbar';
import Illustration from '../components/Illustration';
import { Typography, Button, Container } from '@material-ui/core';
// import { useGetIdeaByIdQuery } from '../graphql/client/types';

export default () => {
  // const query = useGetIdeaByIdQuery({
  //   variables: {
  //     id: '10',
  //   },
  // });

  // console.log('query', query);
  return (
    <div>
      <Navbar />
      <Container
        maxWidth="lg"
        style={{ display: 'flex', alignItems: 'center', height: '100vh' }}
      >
        <div style={{ flex: 1 }}>
          <Typography component="h1" variant="h3">
            Find Idea For Your Next Full-Stack Web Project
          </Typography>
          <div>
            <Button style={{ marginRight: '1rem' }}>explore</Button>
            <Button>create idea</Button>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <Illustration />
          {/* <img
            src="/assets/undraw_lightbulb_moment_evxr.svg"
            alt="idea"
          /> */}
        </div>
      </Container>
    </div>
  );
};

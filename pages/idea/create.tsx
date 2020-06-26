import React from 'react';
import dynamic from 'next/dynamic';
import CreateIdeaFormSkeleton from '../../components/Skeletons/CreateIdeaFormSkeleton';
import withNavbar from '../../hoc/withNavbar';
import withLayout from '../../hoc/withLayout';
import { Paper, Box, Typography } from '@material-ui/core';
import withFooter from '../../hoc/withFooter';
import { useAuth } from '../../context/auth-context';
import withRouteProtection from '../../hoc/withRouteProtection';
import useGutterAllChild from '../../hooks/useGutterAllChild';

const CreateIdeaForm = dynamic(
  () => import('../../components/Forms/CreateIdeaForm'),
  {
    ssr: false,
    loading: CreateIdeaFormSkeleton,
  }
);

function CreateIdea() {
  const { loading, authenticated } = useAuth();
  const gutterClx = useGutterAllChild({ spacing: 3 });
  return (
    <Paper>
      <Box
        className={gutterClx.gutterAllChild}
        p={2}
        py={4}
        style={{ marginTop: '6rem' }}
      >
        <Typography component="h1" variant="h5">
          Create Idea
        </Typography>
        {authenticated && <CreateIdeaForm />}
        {(loading || !authenticated) && <CreateIdeaFormSkeleton />}
      </Box>
    </Paper>
  );
}

export default withRouteProtection(
  withFooter(withLayout(withNavbar(CreateIdea), 'md'))
);

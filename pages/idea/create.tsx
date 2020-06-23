import React from 'react';
import dynamic from 'next/dynamic';
import CreateIdeaFormSkeleton from '../../components/Skeletons/CreateIdeaFormSkeleton';
import withNavbar from '../../hoc/withNavbar';
import withLayout from '../../hoc/withLayout';
import { Paper, Box } from '@material-ui/core';
import withFooter from '../../hoc/withFooter';
import { useAuth } from '../../context/auth-context';
import withRouteProtection from '../../hoc/withRouteProtection';

const CreateIdeaForm = dynamic(
  () => import('../../components/Forms/CreateIdeaForm'),
  {
    ssr: false,
    loading: CreateIdeaFormSkeleton,
  }
);

function CreateIdea() {
  const { loading, authenticated } = useAuth();
  return (
    <Paper>
      <Box p={2} py={4} style={{ marginTop: '6rem' }}>
        {authenticated && <CreateIdeaForm />}
        {(loading || !authenticated) && <CreateIdeaFormSkeleton />}
      </Box>
    </Paper>
  );
}

export default withRouteProtection(
  withFooter(withLayout(withNavbar(CreateIdea), 'md'))
);

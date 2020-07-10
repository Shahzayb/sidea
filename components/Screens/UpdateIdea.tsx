import React from 'react';
import { useAuth } from '../../context/auth-context';
import useGutterAllChild from '../../hooks/useGutterAllChild';
import { Paper, Box, Typography } from '@material-ui/core';
import { useGetIdeaByIdQuery } from '../../graphql/client/types';
import dynamic from 'next/dynamic';
import CustomError from '../Errors/CustomError';
import UpdateIdeaFormSkeleton from '../Skeletons/UpdateIdeaFormSkeleton';
import Head from 'next/head';

const UpdateIdeaForm = dynamic(() => import('../Forms/UpdateIdeaForm'), {
  ssr: false,
  loading: UpdateIdeaFormSkeleton,
});

interface Props {
  id: string;
}

function UpdateIdea({ id }: Props) {
  const { data, loading, error, refetch, networkStatus } = useGetIdeaByIdQuery({
    variables: {
      id,
    },
    notifyOnNetworkStatusChange: true,
  });

  const { loading: userLoading, authenticated } = useAuth();

  const gutterClx = useGutterAllChild({ spacing: 3 });

  if (loading || userLoading || networkStatus === 4 || !authenticated) {
    return <UpdateIdeaFormSkeleton />;
  }

  if (error) {
    return (
      <CustomError
        title="Ooops. Something went wrong!"
        retry={() => {
          refetch().catch(console.log);
        }}
      />
    );
  }

  if (!data || !data.idea) {
    return <CustomError title="No idea found." />;
  }

  return (
    <>
      <Head>
        <title>Edit - {data.idea.title}</title>
      </Head>
      <Paper component="main" style={{ marginTop: '6rem' }}>
        <Box className={gutterClx.gutterAllChild} p={2} py={4}>
          <Typography component="h1" variant="h5">
            Update Idea
          </Typography>

          <UpdateIdeaForm idea={data.idea} />
        </Box>
      </Paper>
    </>
  );
}

export default UpdateIdea;

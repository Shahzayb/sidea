import React from 'react';
import useGutterAllChild from '../../hooks/useGutterAllChild';
import { useAuth } from '../../context/auth-context';
import { Container, Paper, Typography, Box } from '@material-ui/core';
import Copyright from '../../components/Copyright';
import withRouteProtection from '../../hoc/withRouteProtection';
import LogoHomeLink from '../../components/LogoHomeLink';
import ResetPasswordForm from '../../components/Forms/ResetPasswordForm';
import ResetPasswordFormSkeleton from '../../components/Skeletons/ResetPasswordFormSkeleton';
import { GetServerSideProps } from 'next';
import NextError from 'next/error';

interface Props {
  userId: string | string[] | undefined;
  token: string | string[] | undefined;
}

function Index({ userId, token }: Props) {
  const classes = useGutterAllChild({ spacing: 3 });
  const { loading, authenticated } = useAuth();

  if (!userId || !token || Array.isArray(userId) || Array.isArray(token)) {
    return <NextError statusCode={404} />;
  }

  return (
    <Container
      style={{ marginTop: '4rem', marginBottom: '4rem' }}
      component="main"
      maxWidth="xs"
    >
      <Paper className={classes.gutterAllChild} style={{ padding: '1rem' }}>
        <LogoHomeLink />
        <Typography align="center" component="h1" variant="h5">
          Reset password
        </Typography>
        <Typography align="center">Please provide your new password</Typography>

        {!loading && !authenticated && (
          <ResetPasswordForm userId={userId} token={token} />
        )}
        {(loading || authenticated) && <ResetPasswordFormSkeleton />}

        <Box mt={5}>
          <Copyright />
        </Box>
      </Paper>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      userId: context.query.userId,
      token: context.query.token,
    },
  };
};

export default withRouteProtection(Index, 'UNAUTHENTICATED_ONLY');

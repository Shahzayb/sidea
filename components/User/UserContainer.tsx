import React from 'react';
import { useGetUserByIdQuery } from '../../graphql/client/types';
import CustomError from '../Errors/CustomError';

import Head from 'next/head';
import UserProfileCard from './UserProfileCard';
import UserProfileCardSkeleton from '../Skeletons/UserProfileCardSkeleton';
import { Paper } from '@material-ui/core';

interface Props {
  id: string;
}

function UserContainer({ id }: Props) {
  const { data, loading, error, refetch, networkStatus } = useGetUserByIdQuery({
    variables: {
      id,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading || networkStatus === 4) {
    return <UserProfileCardSkeleton />;
  }

  if (error) {
    return (
      <Paper>
        <CustomError
          title="Ooops. Something went wrong!"
          retry={() => {
            if (refetch) {
              refetch().catch(console.log);
            }
          }}
        />
      </Paper>
    );
  }

  if (!data || !data.user) {
    return (
      <Paper>
        <CustomError title="No user found." />
      </Paper>
    );
  }

  return (
    <>
      <Head>
        <title>{data.user.username} - Sidea</title>
      </Head>
      <UserProfileCard user={data.user} />
    </>
  );
}

export default UserContainer;

import React from 'react';
import { useGetUserByIdQuery } from '../../graphql/client/types';
import CustomError from '../Errors/CustomError';

import Head from 'next/head';
import UserProfileCard from './UserProfileCard';

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
    return <div>loading</div>;
  }

  if (error) {
    return (
      <CustomError
        title="Ooops. Something went wrong!"
        retry={() => {
          if (refetch) {
            refetch().catch(console.log);
          }
        }}
      />
    );
  }

  if (!data || !data.user) {
    return <CustomError title="No user found." />;
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

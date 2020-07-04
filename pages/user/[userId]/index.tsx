import React from 'react';
import { useRouter } from 'next/router';
import User from '../../../components/User/User';
import withNavbar from '../../../hoc/withNavbar';
import withFooter from '../../../hoc/withFooter';

function Index() {
  const {
    query: { userId },
  } = useRouter();

  if (!userId) {
    return <div> userId loading</div>;
  }

  if (Array.isArray(userId)) {
    throw new Error('invalid query type');
  }

  return <User id={userId} />;
}

export default withFooter(withNavbar(Index));

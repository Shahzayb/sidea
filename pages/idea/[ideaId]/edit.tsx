import React from 'react';
import { useRouter } from 'next/router';
import withLayout from '../../../hoc/withLayout';
import withNavbar from '../../../hoc/withNavbar';
import withFooter from '../../../hoc/withFooter';
import withRouteProtection from '../../../hoc/withRouteProtection';
import UpdateIdea from '../../../components/Screens/UpdateIdea';
import UpdateIdeaFormSkeleton from '../../../components/Skeletons/UpdateIdeaFormSkeleton';

const Index = () => {
  const {
    query: { ideaId },
  } = useRouter();

  if (!ideaId) {
    return <UpdateIdeaFormSkeleton />;
  }

  if (Array.isArray(ideaId)) {
    throw new Error('invalid query type');
  }

  return (
    <main>
      <UpdateIdea id={ideaId} />
    </main>
  );
};

export default withRouteProtection(
  withFooter(withLayout(withNavbar(Index), 'md'))
);

import React from 'react';
import { useRouter } from 'next/router';
import withLayout from '../../hoc/withLayout';
import withNavbar from '../../hoc/withNavbar';
import IdeaContainer from '../../components/Idea/Idea';
import withFooter from '../../hoc/withFooter';
import IdeaSkeleton from '../../components/Skeletons/IdeaSkeleton';

const Index = () => {
  const {
    query: { ideaId },
  } = useRouter();

  if (!ideaId) {
    return <IdeaSkeleton />;
  }

  if (Array.isArray(ideaId)) {
    throw new Error('invalid query type');
  }

  return (
    <main>
      <IdeaContainer id={ideaId} />
    </main>
  );
};

export default withFooter(withLayout(withNavbar(Index), 'sm'));

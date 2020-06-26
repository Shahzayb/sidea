import React from 'react';
import { useRouter } from 'next/router';
import withLayout from '../../hoc/withLayout';
import withNavbar from '../../hoc/withNavbar';
import IdeaContainer from '../../components/Idea';
import withFooter from '../../hoc/withFooter';
import IdeaSkeleton from '../../components/Skeletons/IdeaSkeleton';

const Idea = () => {
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
    <div>
      <IdeaContainer id={ideaId} />
    </div>
  );
};

export default withFooter(withLayout(withNavbar(Idea), 'sm'));

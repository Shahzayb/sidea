import React from 'react';
import dynamic from 'next/dynamic';
import CreateIdeaFormSkeleton from '../../components/Skeletons/CreateIdeaFormSkeleton';
import withNavbar from '../../hoc/withNavbar';
import withLayout from '../../hoc/withLayout';

const CreateIdeaForm = dynamic(
  () => import('../../components/Forms/CreateIdeaForm'),
  {
    ssr: false,
    loading: CreateIdeaFormSkeleton,
  }
);

function CreateIdea() {
  return (
    <div>
      <CreateIdeaForm />
    </div>
  );
}

export default withLayout(withNavbar(CreateIdea));

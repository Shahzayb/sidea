import React from 'react';
import dynamic from 'next/dynamic';
import CreateIdeaFormSkeleton from '../components/Skeletons/CreateIdeaFormSkeleton';

const CreateIdeaForm = dynamic(
  () => import('../components/Forms/CreateIdeaForm'),
  {
    ssr: false,
    loading: CreateIdeaFormSkeleton,
  }
);

function CreateIdea() {
  return (
    <div style={{ margin: '1rem' }}>
      <CreateIdeaForm />
    </div>
  );
}

export default CreateIdea;

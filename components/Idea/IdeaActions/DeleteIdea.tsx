import React from 'react';

import { Delete as DeleteIcon } from '@material-ui/icons';
import { useDeleteIdeaMutation } from '../../../graphql/client/types';
import AuthenticatedDeleteConfirmButton from '../../Buttons/AuthenticatedDeleteConfirmButton';

interface Props {
  id: string;
  onError?: () => void;
  onSuccess?: () => void;
  onLoading?: () => void;
}

function DeleteIdea({ id, onError, onSuccess, onLoading }: Props) {
  const [deleteIdeaMutation, { loading, client }] = useDeleteIdeaMutation({
    variables: {
      id,
    },
    onError() {
      onError && onError();
    },
    onCompleted() {
      onSuccess && onSuccess();
    },
    async update() {
      if (client) {
        try {
          await client.resetStore();
        } catch {}
      }
    },
  });

  return (
    <>
      <AuthenticatedDeleteConfirmButton
        successHandler={async () => {
          if (!loading) {
            onLoading && onLoading();
            try {
              await deleteIdeaMutation();
            } catch {}
          }
        }}
        size="small"
        startIcon={<DeleteIcon />}
        dialog={{
          title: {
            id: 'delete-idea-title',
            text: 'Delete this idea?',
          },
          description: {
            id: 'delete-idea-description',
            text:
              "After deleting this idea, you won't be able to recover it or its features.",
          },
        }}
      >
        delete
      </AuthenticatedDeleteConfirmButton>
    </>
  );
}

export default DeleteIdea;

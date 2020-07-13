import React from 'react';
import { Tooltip } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import AuthenticatedDeleteConfirmIconButton from '../../Buttons/AuthenticatedDeleteConfirmIconButton';
import {
  useDeleteFeatureMutation,
  GetIdeaFeaturesDocument,
  GetIdeaFeaturesQuery,
} from '../../../graphql/client/types';
import { useSnackbar } from 'notistack';

interface Props {
  id: string;
  ideaId: string;
  disabled?: boolean;
  onError?: () => void;
  onSuccess?: () => void;
  onLoading?: () => void;
}

function DeleteFeature({
  id,
  disabled,
  ideaId,
  onError,
  onSuccess,
  onLoading,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const [deleteFeatureMutation, { loading }] = useDeleteFeatureMutation({
    variables: {
      id,
    },
    onError() {
      enqueueSnackbar('Failed to delete feature');
      onError && onError();
    },
    onCompleted() {
      enqueueSnackbar('Feature is deleted');
      onSuccess && onSuccess();
    },
    async update(proxy, { data }) {
      try {
        if (data) {
          const _features = proxy.readQuery<GetIdeaFeaturesQuery>({
            query: GetIdeaFeaturesDocument,
            variables: {
              idea_id: ideaId,
            },
          });

          if (_features) {
            proxy.writeQuery<GetIdeaFeaturesQuery>({
              query: GetIdeaFeaturesDocument,
              variables: {
                idea_id: ideaId,
              },
              data: {
                ..._features,
                features: {
                  ..._features.features,
                  entry: _features.features.entry.filter(
                    (feature) => feature.id !== id
                  ),
                },
              },
            });
          }
        }
      } catch (error) {
        console.log('error', error);
      }
    },
  });

  return (
    <Tooltip
      placement="bottom"
      title="Delete feature"
      aria-label="Delete feature"
    >
      <AuthenticatedDeleteConfirmIconButton
        disabled={disabled}
        size="small"
        aria-label="delete"
        dialog={{
          title: {
            id: 'delete-feature-title',
            text: 'Delete this feature?',
          },
          description: {
            id: 'delete-feature-description',
            text: "After delete, you won't be able to recover this feature.",
          },
        }}
        successHandler={async () => {
          if (!loading) {
            onLoading && onLoading();
            try {
              await deleteFeatureMutation();
            } catch {}
          }
        }}
      >
        <DeleteIcon />
      </AuthenticatedDeleteConfirmIconButton>
    </Tooltip>
  );
}

export default DeleteFeature;

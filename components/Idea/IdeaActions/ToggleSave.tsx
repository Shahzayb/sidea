import React from 'react';
import { Button } from '@material-ui/core';

import {
  PlaylistAdd as SaveIcon,
  PlaylistAddCheck as UnsaveIcon,
} from '@material-ui/icons';

import {
  useSaveIdeaMutation,
  useUnsaveIdeaMutation,
  Idea,
} from '../../../graphql/client/types';

import { useSnackbar } from 'notistack';
import { useAuth } from '../../../context/auth-context';
import LoginModal from '../../LoginModal';

interface Props {
  idea: Pick<Idea, 'id' | 'isSavedByMe'>;
}

function ToggleSave({ idea }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { authenticated } = useAuth();
  const [isModalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (authenticated) {
      setModalOpen(false);
    }
  }, [authenticated]);

  const [save, saveResult] = useSaveIdeaMutation({
    variables: {
      idea_id: idea.id,
    },
    optimisticResponse: {
      __typename: 'Mutation',
      saveIdea: {
        __typename: 'Save',
        id: `${-parseInt(Math.random().toString(8).substr(2, 9), 10)}`,
        idea: {
          __typename: 'Idea',
          id: idea.id,
          isSavedByMe: true,
        },
      },
    },
  });

  const [unsave, unsaveResult] = useUnsaveIdeaMutation({
    variables: {
      idea_id: idea.id,
    },
    optimisticResponse: {
      __typename: 'Mutation',
      unsaveIdea: {
        __typename: 'Save',
        id: `${-parseInt(Math.random().toString(8).substr(2, 9), 10)}`,
        idea: {
          __typename: 'Idea',
          id: idea.id,
          isSavedByMe: false,
        },
      },
    },
  });

  return (
    <>
      <Button
        size="small"
        startIcon={idea.isSavedByMe ? <UnsaveIcon /> : <SaveIcon />}
        onClick={() => {
          if (!authenticated) {
            setModalOpen(true);
          } else if (!unsaveResult.loading && !saveResult.loading) {
            if (idea.isSavedByMe) {
              unsave()
                .then(({ data, errors }) => {
                  if (data) {
                    enqueueSnackbar('Idea is unsaved');
                  } else {
                    return Promise.reject({ graphQLErrors: errors });
                  }
                })
                .catch((e) => {
                  enqueueSnackbar('Failed to unsave idea');
                });
            } else {
              save()
                .then(({ data, errors }) => {
                  if (data) {
                    enqueueSnackbar('Idea is saved');
                  } else {
                    return Promise.reject({ graphQLErrors: errors });
                  }
                })
                .catch((e) => {
                  enqueueSnackbar('Failed to save idea');
                });
            }
          }
        }}
      >
        {idea.isSavedByMe ? 'Unsave' : 'Save'}
      </Button>
      <LoginModal open={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default ToggleSave;

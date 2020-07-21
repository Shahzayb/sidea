import React from 'react';

import {
  PlaylistAdd as SaveIcon,
  PlaylistAddCheck as UnsaveIcon,
} from '@material-ui/icons';

import {
  useSaveIdeaMutation,
  useUnsaveIdeaMutation,
  Idea,
  GetSavedUserIdeasQuery,
  GetSavedUserIdeasQueryVariables,
  GetSavedUserIdeasDocument,
  GetIdeaByIdDocument,
  GetIdeaByIdQuery,
  GetIdeaByIdQueryVariables,
} from '../../../graphql/client/types';

import { useSnackbar } from 'notistack';
import { clientPageQueryLimit } from '../../../client-env';
import AuthenticatedButton from '../../Buttons/AuthenticatedButton';

interface Props {
  idea: Pick<Idea, 'id' | 'isSavedByMe'>;
}

function ToggleSave({ idea }: Props) {
  const { enqueueSnackbar } = useSnackbar();

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
    update(proxy, { data }) {
      try {
        if (data && !data.saveIdea.id.startsWith('-')) {
          const _idea = proxy.readQuery<
            GetIdeaByIdQuery,
            GetIdeaByIdQueryVariables
          >({
            query: GetIdeaByIdDocument,
            variables: {
              id: idea.id,
            },
          });

          if (_idea && _idea.idea) {
            const _userSavedIdeas = proxy.readQuery<
              GetSavedUserIdeasQuery,
              GetSavedUserIdeasQueryVariables
            >({
              query: GetSavedUserIdeasDocument,
              variables: {
                id: _idea.idea.user.id,
                limit: clientPageQueryLimit,
              },
            });

            if (_userSavedIdeas && _userSavedIdeas.user) {
              const _ideaExists =
                _userSavedIdeas.user.savedIdeas.entry.findIndex(
                  (idea) => idea.id === _idea.idea!.id
                ) !== -1;

              if (!_ideaExists) {
                proxy.writeQuery<
                  GetSavedUserIdeasQuery,
                  GetSavedUserIdeasQueryVariables
                >({
                  query: GetSavedUserIdeasDocument,
                  variables: {
                    id: _idea.idea.user.id,
                    limit: clientPageQueryLimit,
                  },
                  data: {
                    ..._userSavedIdeas,
                    user: {
                      ..._userSavedIdeas.user,
                      savedIdeas: {
                        ..._userSavedIdeas.user.savedIdeas,
                        entry: [
                          {
                            __typename: 'Idea',
                            id: _idea.idea.id,
                            createdAt: _idea.idea.createdAt,
                            title: _idea.idea.title,
                            user: {
                              avatar: _idea.idea.user.avatar,
                              id: _idea.idea.user.id,
                              __typename: 'User',
                              username: _idea.idea.user.username,
                            },
                            isLikedByMe: _idea.idea.isLikedByMe,
                            isSavedByMe: _idea.idea.isSavedByMe,
                            likesCount: _idea.idea.likesCount,
                          },
                          ..._userSavedIdeas.user.savedIdeas.entry,
                        ],
                      },
                    },
                  },
                });
              }
            }
          }
        }
      } catch {}
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
    update(proxy, { data }) {
      try {
        if (data && !data.unsaveIdea.id.startsWith('-')) {
          const _idea = proxy.readQuery<
            GetIdeaByIdQuery,
            GetIdeaByIdQueryVariables
          >({
            query: GetIdeaByIdDocument,
            variables: {
              id: idea.id,
            },
          });

          if (_idea && _idea.idea) {
            const _userSavedIdeas = proxy.readQuery<
              GetSavedUserIdeasQuery,
              GetSavedUserIdeasQueryVariables
            >({
              query: GetSavedUserIdeasDocument,
              variables: {
                id: _idea.idea.user.id,
                limit: clientPageQueryLimit,
              },
            });

            if (_userSavedIdeas && _userSavedIdeas.user) {
              const _ideaExists =
                _userSavedIdeas.user.savedIdeas.entry.findIndex(
                  (idea) => idea.id === _idea.idea!.id
                ) !== -1;

              if (_ideaExists) {
                proxy.writeQuery<
                  GetSavedUserIdeasQuery,
                  GetSavedUserIdeasQueryVariables
                >({
                  query: GetSavedUserIdeasDocument,
                  variables: {
                    id: _idea.idea.user.id,
                    limit: clientPageQueryLimit,
                  },
                  data: {
                    ..._userSavedIdeas,
                    user: {
                      ..._userSavedIdeas.user,
                      savedIdeas: {
                        ..._userSavedIdeas.user.savedIdeas,
                        entry: _userSavedIdeas.user.savedIdeas.entry.filter(
                          (idea) => idea.id !== _idea.idea?.id
                        ),
                      },
                    },
                  },
                });
              }
            }
          }
        }
      } catch {}
    },
  });

  return (
    <>
      <AuthenticatedButton
        size="small"
        startIcon={idea.isSavedByMe ? <UnsaveIcon /> : <SaveIcon />}
        onClick={() => {
          if (!unsaveResult.loading && !saveResult.loading) {
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
      </AuthenticatedButton>
    </>
  );
}

export default ToggleSave;

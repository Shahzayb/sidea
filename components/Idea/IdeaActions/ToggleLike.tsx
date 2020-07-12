import React from 'react';
import { makeStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {
  useLikeIdeaMutation,
  useUnlikeIdeaMutation,
  Idea,
  GetIdeaByIdDocument,
  GetIdeaByIdQuery,
  GetIdeaByIdQueryVariables,
  GetUserLikesQuery,
  GetUserLikesDocument,
  GetUserLikesQueryVariables,
} from '../../../graphql/client/types';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import { clientPageQueryLimit } from '../../../client-env';
import AuthenticatedButton from '../../Buttons/AuthenticatedButton';

const useStyles = makeStyles((theme) => ({
  liked: {
    color: theme.palette.error.main,
  },
}));

interface Props {
  idea: Pick<Idea, 'id' | 'isLikedByMe' | 'likesCount'>;
}

function ToggleLike({ idea }: Props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [like, likeResult] = useLikeIdeaMutation({
    variables: {
      idea_id: idea.id,
    },
    optimisticResponse: {
      __typename: 'Mutation',
      likeIdea: {
        __typename: 'Like',
        id: `${-parseInt(Math.random().toString(8).substr(2, 9), 10)}`,
        idea: {
          __typename: 'Idea',
          id: idea.id,
          isLikedByMe: true,
          likesCount: idea.likesCount + 1,
        },
      },
    },
    update(proxy, { data }) {
      try {
        if (data && !data.likeIdea.id.startsWith('-')) {
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
            const _userLikes = proxy.readQuery<
              GetUserLikesQuery,
              GetUserLikesQueryVariables
            >({
              query: GetUserLikesDocument,
              variables: {
                id: _idea.idea.user.id,
                limit: clientPageQueryLimit,
              },
            });

            if (_userLikes && _userLikes.user) {
              const _ideaExists =
                _userLikes.user.likedIdeas.entry.findIndex(
                  (idea) => idea.id === _idea.idea!.id
                ) !== -1;

              if (!_ideaExists) {
                proxy.writeQuery<GetUserLikesQuery, GetUserLikesQueryVariables>(
                  {
                    query: GetUserLikesDocument,
                    variables: {
                      id: _idea.idea.user.id,
                      limit: clientPageQueryLimit,
                    },
                    data: {
                      ..._userLikes,
                      user: {
                        ..._userLikes.user,
                        likedIdeas: {
                          ..._userLikes.user.likedIdeas,
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
                            },
                            ..._userLikes.user.likedIdeas.entry,
                          ],
                        },
                      },
                    },
                  }
                );
              }
            }
          }
        }
      } catch {}
    },
  });

  const [unlike, unlikeResult] = useUnlikeIdeaMutation({
    variables: {
      idea_id: idea.id,
    },
    optimisticResponse: {
      __typename: 'Mutation',
      unlikeIdea: {
        __typename: 'Like',
        id: `${-parseInt(Math.random().toString(8).substr(2, 9), 10)}`,
        idea: {
          __typename: 'Idea',
          id: idea.id,
          isLikedByMe: false,
          likesCount: idea.likesCount - 1,
        },
      },
    },
    update(proxy, { data }) {
      try {
        if (data && !data.unlikeIdea.id.startsWith('-')) {
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
            const _userLikes = proxy.readQuery<
              GetUserLikesQuery,
              GetUserLikesQueryVariables
            >({
              query: GetUserLikesDocument,
              variables: {
                id: _idea.idea.user.id,
                limit: clientPageQueryLimit,
              },
            });

            if (_userLikes && _userLikes.user) {
              const _ideaExists =
                _userLikes.user.likedIdeas.entry.findIndex(
                  (idea) => idea.id === _idea.idea!.id
                ) !== -1;

              if (_ideaExists) {
                proxy.writeQuery<GetUserLikesQuery, GetUserLikesQueryVariables>(
                  {
                    query: GetUserLikesDocument,
                    variables: {
                      id: _idea.idea.user.id,
                      limit: clientPageQueryLimit,
                    },
                    data: {
                      ..._userLikes,
                      user: {
                        ..._userLikes.user,
                        likedIdeas: {
                          ..._userLikes.user.likedIdeas,
                          entry: _userLikes.user.likedIdeas.entry.filter(
                            (idea) => idea.id !== _idea!.idea!.id
                          ),
                        },
                      },
                    },
                  }
                );
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
        classes={{
          startIcon: clsx({
            [classes.liked]: idea.isLikedByMe,
          }),
        }}
        size="small"
        startIcon={<FavoriteIcon />}
        onClick={() => {
          if (!unlikeResult.loading && !likeResult.loading) {
            if (idea.isLikedByMe) {
              unlike()
                .then(({ data, errors }) => {
                  if (data) {
                    enqueueSnackbar('Idea is unliked');
                  } else {
                    return Promise.reject({ graphQLErrors: errors });
                  }
                })
                .catch((e) => {
                  enqueueSnackbar('Failed to unlike idea');
                });
            } else {
              like()
                .then(({ data, errors }) => {
                  if (data) {
                    enqueueSnackbar('Idea is liked');
                  } else {
                    return Promise.reject({ graphQLErrors: errors });
                  }
                })
                .catch((e) => {
                  enqueueSnackbar('Failed to like idea');
                });
            }
          }
        }}
      >
        {idea.isLikedByMe ? 'Unlike' : 'Like'}
      </AuthenticatedButton>
    </>
  );
}

export default ToggleLike;

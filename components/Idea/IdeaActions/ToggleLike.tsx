import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {
  useLikeIdeaMutation,
  useUnlikeIdeaMutation,
  Idea,
} from '../../../graphql/client/types';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';

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
  });

  return (
    <Button
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
              .then(() => {
                enqueueSnackbar('Idea is unliked');
              })
              .catch((e) => {
                enqueueSnackbar('Failed to unlike idea');
              });
          } else {
            like()
              .then(() => {
                enqueueSnackbar('Idea is liked');
              })
              .catch((e) => {
                enqueueSnackbar('Failed to like idea');
              });
          }
        }
      }}
    >
      {idea.isLikedByMe ? 'Unlike' : 'Like'}
    </Button>
  );
}

export default ToggleLike;

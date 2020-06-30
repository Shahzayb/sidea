import React from 'react';
import { Button } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

function LikeButton() {
  return (
    <div>
      <Button size="small" startIcon={<FavoriteIcon />}>
        Like
      </Button>
    </div>
  );
}

export default LikeButton;

import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  gutterAllChild: {
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
}));

function CreateIdeaFormSkeleton() {
  const classes = useStyles();
  return (
    <div className={classes.gutterAllChild}>
      <Typography component="div" variant="h4">
        <Skeleton />
      </Typography>
      <Skeleton variant="rect" component="div" height={40} />
      <Skeleton variant="rect" component="div" height={80} />
      <Skeleton variant="rect" component="div" height={40} />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <Skeleton component="div" variant="rect" height={40} />
        </div>
        <div>
          <Skeleton component="div" variant="rect" width={40} height={40} />
        </div>
      </div>
    </div>
  );
}

export default CreateIdeaFormSkeleton;

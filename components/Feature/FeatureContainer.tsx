import React from 'react';
import {
  ListItem,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  makeStyles,
} from '@material-ui/core';

import { Feature } from '../../graphql/client/types';
import DeleteFeature from './FeatureActions/DeleteFeature';
import EditFeature from './FeatureActions/EditFeature';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  listText: {
    paddingRight: '40px',
  },
  disabledText: {
    color: theme.palette.text.disabled,
  },
  [theme.breakpoints.up('sm')]: {
    listText: {
      paddingRight: '60px',
    },
  },
}));

interface Props {
  feature: Pick<Feature, 'id' | 'title'>;
  ideaId: string;
}

function FeatureContainer({ feature, ideaId }: Props) {
  const [disable, setDisable] = React.useState(false);
  const classes = useStyles();
  return (
    <ListItem key={feature.id} divider>
      <ListItemText
        classes={{
          root: clsx(classes.listText, { [classes.disabledText]: disable }),
        }}
        primary={<Typography>{feature.title}</Typography>}
      />
      <ListItemSecondaryAction>
        <EditFeature />
        <DeleteFeature
          disabled={disable}
          id={feature.id}
          ideaId={ideaId}
          onLoading={() => {
            setDisable(true);
          }}
          onSuccess={() => {
            setDisable(false);
          }}
          onError={() => {
            setDisable(false);
          }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default FeatureContainer;

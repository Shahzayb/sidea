import React from 'react';
import {
  ListItem,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  Tooltip,
  IconButton,
} from '@material-ui/core';

import { Feature } from '../../graphql/client/types';
import DeleteFeature from './FeatureActions/DeleteFeature';
import EditFeature from './FeatureActions/EditFeature';

interface Props {
  feature: Pick<Feature, 'id' | 'title'>;
}

function FeatureContainer({ feature }: Props) {
  return (
    <ListItem key={feature.id} divider>
      <ListItemText primary={<Typography>{feature.title}</Typography>} />
      <ListItemSecondaryAction>
        <EditFeature />
        <DeleteFeature id={feature.id} />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default FeatureContainer;

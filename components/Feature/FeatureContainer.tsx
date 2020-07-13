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
import UpdateFeatureForm from '../Forms/UpdateFeatureForm';

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

type Mode = 'edit' | 'view';

function FeatureContainer({ feature, ideaId }: Props) {
  const [disable, setDisable] = React.useState(false);
  const [mode, setMode] = React.useState<Mode>('view');

  const classes = useStyles();
  return (
    <ListItem key={feature.id} divider>
      {mode === 'view' && (
        <>
          <ListItemText
            classes={{
              root: clsx(classes.listText, { [classes.disabledText]: disable }),
            }}
            primary={<Typography>{feature.title}</Typography>}
          />
          <ListItemSecondaryAction>
            <EditFeature
              disabled={disable}
              onClick={() => {
                setMode('edit');
              }}
            />
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
        </>
      )}
      {mode === 'edit' && (
        <UpdateFeatureForm
          feature={feature}
          onSuccess={() => {
            setMode('view');
          }}
          onClose={() => {
            setMode('view');
          }}
        />
      )}
    </ListItem>
  );
}

export default FeatureContainer;

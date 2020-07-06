import React from 'react';
import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

function Features() {
  return (
    <>
      <Typography style={{ marginTop: '2rem' }} component="h2" variant="h6">
        Features
      </Typography>
      <Divider />
      <List>
        <ListItem divider>
          <ListItemText primary={<Typography>User can login</Typography>} />
          <ListItemSecondaryAction>
            <IconButton size="small" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem divider>
          <ListItemText primary={<Typography>User can logout</Typography>} />
          <ListItemSecondaryAction>
            <IconButton size="small" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem divider>
          <ListItemText
            primary={<Typography>User can upload picture</Typography>}
          />
          <ListItemSecondaryAction>
            <IconButton size="small" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem divider>
          <ListItemText
            primary={<Typography>User can like picture</Typography>}
          />
          <ListItemSecondaryAction>
            <IconButton size="small" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>{' '}
    </>
  );
}

export default Features;

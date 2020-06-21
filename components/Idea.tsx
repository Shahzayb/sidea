import React from 'react';
import Head from 'next/head';
import {
  Paper,
  Avatar,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  makeStyles,
} from '@material-ui/core';
import {
  List as ListIcon,
  Delete as DeleteIcon,
  Favorite as FavoriteIcon,
  PlaylistAdd as SaveIcon,
  PlaylistAddCheck as UnsaveIcon,
  Edit as EditIcon,
  Share as ShareIcon,
} from '@material-ui/icons';
import CreateFeatureForm from './Forms/CreateFeatureForm';

const useStyles = makeStyles((theme) => ({
  gutterAllChild: {
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
}));

function Idea() {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>
          Store was losing $2,000 per month because of a slow website : Username
        </title>
      </Head>
      <Paper
        className={classes.gutterAllChild}
        elevation={0}
        style={{ padding: '1rem' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar style={{ marginRight: '0.5rem' }}>H</Avatar>
            <Typography component="span" variant="subtitle2">
              username
            </Typography>
          </div>
          <Typography variant="caption" color="textSecondary">
            1 hour ago
          </Typography>
        </div>
        <Typography component="h1" variant="h5">
          Store was losing $2,000 per month because of a slow website
        </Typography>
        <Typography component="div" variant="body1">
          <p>
            Three months ago an e-commerce store (doing $20,000+ in sales per
            month) hired me to redesign their website. The very first thing I
            noticed was how SLOW the website was. Store owners often neglect
            this aspect because they are busy with marketing, inventory and
            shipping. Unfortunately, slow websites do not convert well.
          </p>
          <p>
            Over the past two months, new website's conversion rate has
            increased by 9% and the bounce rate has improved tremendously. I
            know that not everyone can code but there are still ways to
            considerably speed up your website.
          </p>
          <p>
            <br />
          </p>
          <ol>
            <li>
              Resize images - I can't stress this enough! Many of the clients
              I've worked with use 6000x4000px professional photos when what
              they really need is a 600x400px image for product listing.
            </li>
            <li>
              Uninstall and remove all unnecessary plugins and apps - Often
              times, once a plugin is installed, it's never removed even if it
              no longer serves a useful function. Take your time and make sure
              to use only what you really need.
            </li>
            <li>
              Use a content delivery network (CDN) - A content delivery network
              caches your images on its globally distributed network of servers.
              If a customer from the middle east visits your website that is
              hosted in the US, your website will load fast.
            </li>
          </ol>
          <p>
            Slow websites not only decrease your conversion rates but also rank
            you lower in google search results.
          </p>
        </Typography>
        {/* <div>Tags</div> */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginTop: '2rem',
          }}
        >
          <Button size="small" startIcon={<ListIcon />}>
            12 Features
          </Button>
          <Button size="small" startIcon={<FavoriteIcon />}>
            12 Likes
          </Button>
          <Button size="small" startIcon={<SaveIcon />}>
            save
          </Button>

          <Button size="small" startIcon={<ShareIcon />}>
            share
          </Button>

          <Button size="small" startIcon={<DeleteIcon />}>
            delete
          </Button>
          <Button size="small" startIcon={<EditIcon />}>
            edit
          </Button>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <CreateFeatureForm />
        </div>

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
        </List>
      </Paper>
    </>
  );
}

export default Idea;

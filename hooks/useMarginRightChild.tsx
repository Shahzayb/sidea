import { makeStyles } from '@material-ui/core';

const useMarginRightChild = makeStyles((theme) => ({
  root: {
    '& > *:not(:last-child)': {
      marginRight: theme.spacing(1),
    },
  },
  [theme.breakpoints.up('sm')]: {
    root: {
      '& > *:not(:last-child)': {
        marginRight: theme.spacing(2),
      },
    },
  },
}));

export default useMarginRightChild;

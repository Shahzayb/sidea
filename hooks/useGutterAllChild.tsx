import { makeStyles } from '@material-ui/core';

interface Props {
  spacing: number;
}

const useGutterAllChild = makeStyles((theme) => ({
  gutterAllChild: {
    '& > *:not(:last-child)': {
      marginBottom: (props: Props) => theme.spacing(props.spacing),
    },
  },
}));

export default useGutterAllChild;

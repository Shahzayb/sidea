import { withStyles, Tooltip } from '@material-ui/core';

const ErrorTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
  arrow: {
    color: theme.palette.error.main,
  },
}))(Tooltip);

export default ErrorTooltip;

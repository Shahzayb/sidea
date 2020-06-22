import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Button, ButtonProps } from '@material-ui/core';

function ResponsiveButton(props: ButtonProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return <Button {...props} size={isSmallScreen ? 'small' : 'medium'} />;
}

export default ResponsiveButton;

import React from 'react';
import { IconButtonProps, IconButton } from '@material-ui/core';
import { useAuth } from '../../context/auth-context';
import LoginModal from '../LoginModal';

const AuthenticatedIconButton = React.forwardRef<
  HTMLButtonElement,
  IconButtonProps
>((props, ref) => {
  const { authenticated } = useAuth();
  const [isModalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (authenticated) {
      setModalOpen(false);
    }
  }, [authenticated]);

  const clickHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!authenticated) {
      setModalOpen(true);
    } else {
      if (props.onClick) {
        props.onClick(event);
      }
    }
  };

  return (
    <>
      <IconButton {...props} ref={ref} onClick={clickHandler} />
      <LoginModal open={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
});

export default AuthenticatedIconButton;

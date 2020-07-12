import React from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import { useAuth } from '../../context/auth-context';
import LoginModal from '../LoginModal';

function AuthenticatedButton(props: ButtonProps) {
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
      <Button {...props} onClick={clickHandler} />
      <LoginModal open={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default AuthenticatedButton;

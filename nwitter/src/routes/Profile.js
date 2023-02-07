import { authService } from 'fbase';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default () => {
  const Navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    Navigate('/');
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

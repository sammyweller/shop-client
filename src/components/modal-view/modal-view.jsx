import React from 'react';

const ModalView = ({ show, onClose, onLogin, onSignUp }) => {
  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Hi, friend!</h2>
        <p>Please log in or sign up to continue.</p>
        <button onClick={onLogin}>Log in</button>
        <button onClick={onSignUp}>Sign up</button>
      </div>
    </div>
  );
};

export default ModalView;
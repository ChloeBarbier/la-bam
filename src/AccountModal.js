import React from 'react';
// import PropTypes from 'prop-types';
// import { Context } from './config/state.manager';

const AccountModal = ({signOut}) => {
  const [modalStyleDisplay, setModalStyleDisplay] = React.useState('none');

  // When the user clicks on the button, open the modal
  const onClickLike = () => {
    setModalStyleDisplay("block");
  }

  // When the user clicks on <span> (x), close the modal
  const onClose = () => {
    setModalStyleDisplay("none");
  }

  return (
    <div className="account">
      <button className="button like" onClick={onClickLike} type="button">
        <i className="bi bi-door-open-fill" role="img" aria-label="like"></i>
      </button>

      <div className={`modal accountModal ${modalStyleDisplay}`}>
        <div className="modal-content">
          <div className="modal-title">Se déconnecter ?</div>
          <button 
            className="button closeModal" 
            onClick={onClose} 
            type="button">
            <i className="bi bi-x" role="img" aria-label="close"></i>
          </button>
          <div className="buttons-tool">
            <button 
              className="button" 
              onClick={signOut} 
              type="button">
                Oui
              {/* <i className="bi bi-hand-thumbs-up-fill" role="img" aria-label="sortAtoZ"></i> */}
            </button>
            <button 
              className="button" 
              onClick={onClose} 
              type="button">
                Non
              {/* <i className="bi bi-hand-thumbs-down-fill" role="img" aria-label="sortZtoA"></i> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;

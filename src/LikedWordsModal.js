import React from 'react';
// import PropTypes from 'prop-types';
import { Context } from './config/state.manager';

const LikedWordsModal = () => {
  // const { title, options, name } = props;
  const { state, dispatch } = React.useContext(Context);
  const { likedWords } = state;
  const [modalStyleDisplay, setModalStyleDisplay] = React.useState('none');
  const [likedWordsSorted, setLikedWordsSorted] = React.useState(likedWords);

  // When the user clicks on the button, open the modal
  const onClickLike = () => {
    setModalStyleDisplay("block");
  }

  // When the user clicks on <span> (x), close the modal
  const onClose = () => {
    setModalStyleDisplay("none");
  }

  const onDelete = (word) => {
    dispatch({ 
      type: 'setLikedWords', 
      likedWords: {
        ...likedWords,
        [word]: false
      } 
    });
  }

  const disabled = Object.keys(likedWords).find(key => likedWords[key] === true) === undefined;

  const onSortAtoZ = () => {
    const ordered = Object.keys(likedWords).sort().reduce(
      (obj, key) => { 
        obj[key] = likedWords[key]; 
        return obj;
      }, 
      {}
    );
    setLikedWordsSorted(ordered);
  };

  const onSortZtoA = () => {
    const ordered = Object.keys(likedWords).sort().reduce(
      (obj, key) => { 
        obj[key] = likedWords[key]; 
        return obj;
      }, 
      {}
    );
    let unordered = {};
    for (var i=Object.keys(ordered).length-1; i>0; i--) {
      unordered = {
        ...unordered,
        [Object.keys(ordered)[i]]: ordered[Object.keys(ordered)[i]]
      };
    }
      
    setLikedWordsSorted(unordered);
  };

  const sortByAddTime = () => {
    setLikedWordsSorted(likedWords);
  }

  React.useEffect(() => {
    setLikedWordsSorted(likedWords)
  }, [likedWords]);
  
  return (
    <div className="likedWords">
      <button disabled={disabled} className="button like" onClick={onClickLike} type="button">
        <i className="bi bi-heart-fill" role="img" aria-label="like"></i>
      </button>

      <div className={`modal likedWordsModal ${modalStyleDisplay}`}>
        <div className="modal-content">
          <div className="modal-title">Liste des préférés</div>
          <button 
            className="button closeModal" 
            onClick={onClose} 
            type="button">
            <i className="bi bi-x" role="img" aria-label="close"></i>
          </button>
          <div className="buttons-tool">
            <button 
              className="button sortAtoZ" 
              onClick={onSortAtoZ} 
              type="button">
              <i className="bi bi-sort-alpha-down" role="img" aria-label="sortAtoZ"></i>
            </button>
            <button 
              className="button sortZtoA" 
              onClick={onSortZtoA} 
              type="button">
              <i className="bi bi-sort-alpha-up" role="img" aria-label="sortZtoA"></i>
            </button>
            <button 
              className="button sortZtoA" 
              onClick={sortByAddTime} 
              type="button">
              <i className="bi bi-stopwatch" role="img" aria-label="sortByAddTime"></i>
            </button>
          </div>
          
          <div className="list">
            {Object.keys(likedWordsSorted).length 
              ? Object.keys(likedWordsSorted).map((key, i) => {
                if (likedWordsSorted[key] === true) {
                  return (
                    <div key={i} className="raw">
                      <button 
                        className="button delete" 
                        onClick={() => onDelete(key)} 
                        type="button">
                          <i className="bi bi-trash-fill" role="img" aria-label="delete"></i>
                      </button>
                      <span className="item">{key}</span>
                    </div>
                  );
                } return null;
                }) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikedWordsModal;

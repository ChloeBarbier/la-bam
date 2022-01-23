import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  word: '...',
  dictioFr: [],
  dictioEn: [],
  dictioDe: [],
  dictioEs: [],
  dictioIt: [],
  lists: {},
  parameters: {
    sonority: 0, 
    originality: 4, 
    language: 0, 
    length: 0,
    firstLetter: 0,
    list: 'firstname'
  },
  likedWords: {},
  userAuth: {
    creationTime: null,
    displayName: "invité",
    email: null,
    emailVerified: false,
    isAnonymous: true,
    lastSignInTime: null,
    phoneNumber: null,
    photoURL: null,
    providerId: null,
    providerUid: null,
    uid: null
  }
};

const Context = React.createContext(initialState);

const reducer = (state, action) => {
  // console.log(state, action)
  switch (action.type) {
    case 'init': {
      return {
        ...state,
      };
    }
    case 'setWord': {
      return {
        ...state,
        word: action.word || state.word,
      };
    }
    case 'setLists': {
      return {
        ...state,
        lists: action.lists || state.lists,
      };
    }
    case 'setDictioFr': {
      return {
        ...state,
        dictioFr: action.dictioFr || state.dictioFr,
      };
    }
    case 'setDictioEn': {
      return {
        ...state,
        dictioEn: action.dictioEn || state.dictioEn,
      };
    }
    case 'setDictioDe': {
      return {
        ...state,
        dictioDe: action.dictioDe || state.dictioDe,
      };
    }
    case 'setDictioEs': {
      return {
        ...state,
        dictioEs: action.dictioEs || state.dictioEs,
      };
    }
    case 'setDictioIt': {
      return {
        ...state,
        dictioIt: action.dictioIt || state.dictioIt,
      };
    }
    case 'setParameters': {
      return {
        ...state,
        parameters: action.parameters || state.parameters,
      };
    }
    case 'setLikedWords': {
      return {
        ...state,
        likedWords: action.likedWords || state.likedWords,
      };
    }
    case 'setUserAuth': {
      return {
        ...state,
        userAuth: action.userAuth || state.userAuth
      }
    }
    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log('Provider', state);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.object.isRequired,
};

export { Context, Provider, initialState };

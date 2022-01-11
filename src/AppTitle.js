import React from 'react';
import PropTypes from 'prop-types';
// import { Context } from './config/state.manager';
import ListSelector from './ListSelector';
import SubTitle from './SubTitle';
import LikedWordsModal from './LikedWordsModal';
import AccountModal from './AccountModal';

const AppTitle = ({isSignedIn, signOut, displayName}) => {
  // const { title, options, name } = props;
  // const { state, dispatch } = React.useContext(Context);
  // const { parameters } = state;

  if (isSignedIn) {
    return (
      <div className="App-title">
        <LikedWordsModal />
        <AccountModal signOut={signOut} />
        <span className="title">La boite à 
          <ListSelector name='liste' />
        </span>
        <SubTitle displayName={displayName} />
      </div>
    );
  }
  return (
    <div className="App-title">
      <span className="title">La boîte à mots</span>
      <div className="help">
        <div>Veuillez-vous connecter pour entrer</div>
        {/* <div>(Les fonctionnalités de la session "invité" seront limitées)</div> */}
      </div>
    </div>
  );
};

AppTitle.propTypes = {
  title: PropTypes.string,
  name: PropTypes.oneOf(['sonority', 'originality', 'language', 'length', 'firstLetter']),
  options: PropTypes.array,
};

export default AppTitle;

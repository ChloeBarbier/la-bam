import React from 'react';
import PropTypes from 'prop-types';
// import { Context } from './config/state.manager';
import ListSelector from './ListSelector';
import SubTitle from './SubTitle';
import LikedWordsModal from './LikedWordsModal';

const AppTitle = ({displayName}) => {
  // const { title, options, name } = props;
  // const { state, dispatch } = React.useContext(Context);
  // const { parameters } = state;

  return (
    <div className="App-title">
      <LikedWordsModal />
      <span className="title">La boite à 
        <ListSelector name='liste' />
      </span>
      <SubTitle displayName={displayName} />
    </div>
  );
};

AppTitle.propTypes = {
  title: PropTypes.string,
  name: PropTypes.oneOf(['sonority', 'originality', 'language', 'length', 'firstLetter']),
  options: PropTypes.array,
};

export default AppTitle;

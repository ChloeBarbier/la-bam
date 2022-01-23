import React from 'react';
import { Context } from './config/state.manager';
import { listOptions } from './constants';

const SubTitle = () => {
  const { state } = React.useContext(Context);
  const { parameters, userAuth } = state;
  const { displayName } = userAuth;
  const selectedList = listOptions.find(Option => Option.value === parameters.list);
  const listLabel = selectedList ? selectedList.label.toLowerCase() : 'mots';

  return (
    <div className="help">
      <div>Bienvenue <b>{displayName}</b>!</div>
      <div>Générez de nouveaux <span>{listLabel}</span> à l'infini</div>
    </div>
  );
};

export default SubTitle;

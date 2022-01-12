import React from 'react';
import { Context } from './config/state.manager';
import { listOptions } from './constants';

const SubTitle = () => {
  const { state } = React.useContext(Context);
  const { parameters, authUser } = state;
  const { displayName } = authUser;
  const selectedList = listOptions.find(Option => Option.value === parameters.list);

  return (
    <div className="help">
      Bienvenue <b>{displayName}</b>!
      Générez de nouveaux <span>{selectedList ? selectedList.label.toLowerCase() : 'mots'}</span> à l'infini
    </div>
  );
};

export default SubTitle;

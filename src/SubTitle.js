import React from 'react';
import { Context } from './config/state.manager';
import { listOptions } from './constants';

const SubTitle = ({displayName}) => {
  const { state } = React.useContext(Context);
  const { parameters } = state;
  const selectedList = listOptions.find(Option => Option.value === parameters.list);

  return (
    <div className="help">
      Bienvenu.e <b>{displayName}</b>!
      Génère de nouveaux <span>{selectedList ? selectedList.label.toLowerCase() : 'mots'}</span> à l'infini
    </div>
  );
};

export default SubTitle;

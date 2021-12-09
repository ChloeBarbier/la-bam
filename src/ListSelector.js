import React from 'react';
import map from 'lodash/map';
import { Context } from './config/state.manager';
import { listOptions as options } from './constants';

const ListSelector = () => {
  const { state, dispatch } = React.useContext(Context);
  const { parameters } = state;

  const onClick = event => {
    dispatch(
      {
        type: 'setParameters', 
        parameters: 
        {
          ...parameters, 
          list: event.target.value
        } 
      }
    );
  }

  return (
      <select onChange={onClick} className="list-selector select" id="list-label">
        { map(options, (option) => (
          <option 
            onClick={onClick} 
            key={option.value} 
            value={option.value}
          >
            {option.label}
          </option>
          ))}
      </select>
  );
};

export default ListSelector;

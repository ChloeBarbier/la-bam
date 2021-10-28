import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { Context } from './config/state.manager';
import { listOptions as options } from './constants';

const ListSelector = (props) => {
  const { name } = props;
  const { state, dispatch } = React.useContext(Context);
  const { parameters } = state;

  const onClick = event => {
    // console.warn("option", event.target.value, parameters, name)
    dispatch(
      {
        type: 'setParameters', 
        parameters: 
        {
          ...parameters, 
          [name]: parseInt(event.target.value, 10)
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

ListSelector.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
};

export default ListSelector;

import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { Context } from './config/state.manager';

const Parameter = (props) => {
  const { title, options, name } = props;
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
    <label className="title-label" htmlFor="sonority-label">
      <span className="parameter-title">{title}</span>
      <select onChange={onClick} className="select-parameter select" id="sonority-label">
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
    </label>
  );
};

Parameter.propTypes = {
  title: PropTypes.string,
  name: PropTypes.oneOf(['sonority', 'originality', 'language', 'length', 'firstLetter']),
  options: PropTypes.array,
};

export default Parameter;

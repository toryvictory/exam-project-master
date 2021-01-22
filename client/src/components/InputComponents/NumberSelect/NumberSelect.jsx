import React from 'react';
import PropTypes from 'prop-types';

const NumberSelect = ({ min, max, ...props }) => {
  const options = [];
  for (let i = min; i < max + 1; i++) {
    if (i > -9 && i < 10) {
      options.push(<option key={i}>{`0${i}`}</option>);
    } else {
      options.push(<option key={i}>{i}</option>);
    }
  }

  return (
    <select {... props}>
      {options}
    </select>
  );
};

NumberSelect.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default NumberSelect;

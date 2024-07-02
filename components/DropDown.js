// components/Dropdown.js

import React from 'react';

const Dropdown = ({ options }) => {
  return (
    <select>
      {options.map((option, index) => (
        <option key={index} value={option.symTicker}>
          {option.symbolDesc}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;

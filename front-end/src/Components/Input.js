import { string } from 'prop-types';
import React from 'react';

function Input(props) {
  const { name, label } = props;
  return (
    <label htmlFor={ name }>
      {label}
      <input { ...props } />
    </label>
  );
}

Input.propTypes = {
  label: string,
  name: string,
}.isRequired;

export default Input;

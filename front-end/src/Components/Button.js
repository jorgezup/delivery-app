import { string } from 'prop-types';
import React from 'react';

function Button(props) {
  const { type, value } = props;
  return (
    <button { ...props } type={ type === 'button' ? 'button' : 'submit' }>
      {value}
    </button>
  );
}

Button.propTypes = {
  type: string,
  value: string,
}.isRequired;

export default Button;

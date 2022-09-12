import { string } from 'prop-types';
import React from 'react';

function Button(props) {
  const { type, value, className } = props;
  return (
    <button
      { ...props }
      type={ type === 'button' ? 'button' : 'submit' }
      className={ className }
    >
      {value}
    </button>
  );
}

Button.propTypes = {
  type: string,
  value: string,
  className: string,
}.isRequired;

export default Button;

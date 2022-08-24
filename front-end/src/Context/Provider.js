import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const MyDeliveryContext = createContext();

export default function ProviderDelivery({ children }) {
  return (
    <MyDeliveryContext.Provider>
      { children }
    </MyDeliveryContext.Provider>
  );
}

ProviderDelivery.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType).isRequired,
};

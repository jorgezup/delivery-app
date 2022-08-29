/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const MyDeliveryContext = createContext();

export default function ProviderDelivery({ children }) {
  const [userId, setUserId] = useState(0);

  const contextValue = {
    userId,
    setUserId,
  };

  return (
    <MyDeliveryContext.Provider value={ contextValue }>
      { children }
    </MyDeliveryContext.Provider>
  );
}

ProviderDelivery.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType).isRequired,
};

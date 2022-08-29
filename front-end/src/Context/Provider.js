import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const MyContext = createContext();

function ProviderDelivery({ children }) {
  // const [userId, setUserId] = useState(0);

  // const contextValue = {
  //   userId,
  //   setUserId,
  // };

  return (
    <MyContext.Provider>
      { children }
    </MyContext.Provider>
  );
}

ProviderDelivery.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType).isRequired,
};

export default ProviderDelivery;

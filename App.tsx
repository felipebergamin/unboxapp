import React from 'react';

import ConfigProvider from '~/contexts/config';
import Routes from '~/routes';

const App = () => {
  return (
    <ConfigProvider>
      <Routes />
    </ConfigProvider>
  );
};

export default App;

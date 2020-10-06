import React, { createContext, useEffect, useState } from 'react';

import IConfigResponse from '~/interfaces/IConfigResponse';
import client from '~/services/client';

interface IConfigContextValue {
  values: IConfigResponse | null;
  loading: boolean;
}

export const ConfigContext = createContext<IConfigContextValue>({
  loading: true,
  values: null,
});

const ConfigProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<IConfigResponse | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await client.get('configuration');
        setConfig(data);
      } catch {
        // TODO: handle error
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        values: config,
        loading,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;

import { memo, useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import Routes from '@/config/routes';
// eslint-disable-next-line camelcase
import type { Locale } from 'antd/lib/locale-provider';

import  vi_VN from 'antd/lib/locale/vi_VN';
export default memo(() => {
  const [locale, setLocal] = useState<Locale>(vi_VN);
  return (
    // eslint-disable-next-line camelcase
    <ConfigProvider locale={vi_VN}>
      <Routes />
    </ConfigProvider>
  );
});

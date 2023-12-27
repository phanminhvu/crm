import { memo, useEffect, useMemo } from 'react';
import { /* Outlet, */ useLocation } from 'react-router-dom';
import classnames from 'classnames';

import { useRecoilValue } from 'recoil';
import { globalState } from '@/store/global';
import { userState } from '@/store/user';

import { convertRouter, formatRoutes } from '@/utils/router';

import Permission from '@/components/Permission';
import LeftSider from './components/LeftSider';
import RightTop from './components/RightTop';
import RightFooter from './components/RightFooter';
import layoutRotes from './routes';
import { getNavigation } from '@/apis/services/NavigationService';
import { ResponseData } from '@/utils/request';
import useTitle from '@/hooks/useTitle';

import './css/index.less';
import { NavigationModel } from '@/apis/models/NavigationModel';
import { IRouter, RouteComponent } from '@/@types/router';

export interface UniversalLayoutProps {
  children: React.ReactNode;
}

export default  memo(({ children }: UniversalLayoutProps) => {
  const location = useLocation();
  const global = useRecoilValue(globalState);
  const user = useRecoilValue(userState);

  const routerPathKeyRouter = useMemo(() => formatRoutes(layoutRotes), []);
  const routeItem = useMemo(() => routerPathKeyRouter.pathKeyRouter[location.pathname], [location]);

  useTitle('Tiêu đề');

  return (
    <div id='universallayout' className={classnames({ light: global.theme === 'light' })}>
      {global.navMode === 'inline' && (
        <LeftSider
          collapsed={global.collapsed}
          userRoles={user.roles}
          menuData={routerPathKeyRouter.router}
          routeItem={routeItem}
          theme={global.theme}
          leftSiderFixed={global.leftSiderFixed}
        />
      )}
      <div id='universallayout-right'>
        <RightTop
          userRoles={user.roles}
          menuData={routerPathKeyRouter.router}
          jsonMenuData={routerPathKeyRouter.pathKeyRouter}
          routeItem={routeItem}
        />
        <div id='universallayout-right-main'>
          <Permission role={routeItem?.meta?.roles}>
            {/* <Outlet /> */}
            {children}
          </Permission>
          <RightFooter />
        </div>
      </div>
    </div>
  );
});

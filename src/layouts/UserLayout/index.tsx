import { memo, useMemo } from 'react';
import { /* Outlet, */ useLocation } from 'react-router-dom';
import useTitle from '@/hooks/useTitle';
import { formatRoutes } from '@/utils/router';
import layoutRotes from './routes';
import './css/index.less';

export interface UserLayoutProps {
  children: React.ReactNode;
}

export default memo(({ children }: UserLayoutProps) => {
  const location = useLocation();

  const routerPathKeyRouter = useMemo(() => formatRoutes(layoutRotes), []);

  const routeItem = useMemo(() => routerPathKeyRouter.pathKeyRouter[location.pathname], [location]);

  useTitle('Tiêu đề');

  return (
    <div className='user-layout'>
      <div className='lang'>
      </div>
      {/* <Outlet /> */}
      {children}
    </div>
  );
});

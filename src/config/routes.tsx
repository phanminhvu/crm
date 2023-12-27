import React, { lazy, memo, Suspense } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { createUseRoutes, pathKeyCreateUseRoutes } from '@/utils/router';
import { setToken } from '@/utils/localToken';
import PageLoading from '@/components/PageLoading';

// BlankLayout
import BlankLayout from '@/layouts/BlankLayout';

// SecurityLayout
import SecurityLayout from '@/layouts/SecurityLayout';

// UniversalLayout
import UniversalLayoutRoutes from '@/layouts/UniversalLayout/routes';
import UniversalLayout from '@/layouts/UniversalLayout';

// UserLayout
import UserLayoutRoutes from '@/layouts/UserLayout/routes';
import UserLayout from '@/layouts/UserLayout';


const routes = createUseRoutes([
  {
    path: '/',
    redirect: '/home',
    children: UniversalLayoutRoutes,
  },
  {
    path: '/user',
    redirect: '/user/login',
    children: UserLayoutRoutes,
  },
  {
    path: '*',
    component: lazy(() => import('@/pages/404')),
  },
]);

const layoutToRoutes = {
  UniversalLayout: pathKeyCreateUseRoutes([routes[0]]),
  UserLayout: pathKeyCreateUseRoutes([routes[1]]),
};

export const SuspenseLazy = memo(({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoading />}>{children}</Suspense>
));

export default memo(() => {
  const routesElement = useRoutes(routes);
  const location = useLocation();

  console.log('location', layoutToRoutes)
  console.log('location', location.pathname)

  if (layoutToRoutes.UniversalLayout[location.pathname] || location.pathname.includes('customer-list') ) {
    return (
      <SecurityLayout>
        <UniversalLayout>
          <SuspenseLazy>{routesElement}</SuspenseLazy>
        </UniversalLayout>
     </SecurityLayout>
    );
  }

  if (layoutToRoutes.UserLayout[location.pathname]) {
    return (
      <UserLayout>
        <SuspenseLazy>{routesElement}</SuspenseLazy>
      </UserLayout>
    );
  }

  return (
    <BlankLayout>
      <SuspenseLazy>{routesElement}</SuspenseLazy>
    </BlankLayout>
  );
});

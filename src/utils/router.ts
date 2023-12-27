import { createElement, lazy } from 'react';
import { Navigate, RouteObject, Location } from 'react-router-dom';
import { merge } from 'lodash/fp';
import qs from 'query-string';
import { isExternal } from '@/utils/validate';
import { equalObject } from '@/utils/object';
import {
  IRouter,
  IPathKeyRouter,
  IRouterPathKeyRouter,
  BreadcrumbType,
  TabNavType,
  IPathKeyRouteObject,
} from '@/@types/router';
import { NavigationModel } from '@/apis/models/NavigationModel';

export const createUseRoutes = (configRoutes: IRouter[], parentPath = '/'): RouteObject[] => {
  const routes: RouteObject[] = [];
  for (let index = 0; index < configRoutes.length; index++) {
    const item = configRoutes[index];
    if (isExternal(item.path)) {
      continue;
    }
    const routesItem: RouteObject = {};

    // path
    routesItem.path = item.path.startsWith('/')
      ? item.path
      : `${parentPath.endsWith('/') ? parentPath : `${parentPath}/`}${item.path}`;
    // element
    if (item.component) {
      routesItem.element = createElement(item.component);
    }
    // children
    const children: RouteObject[] = [];
    if (item.redirect) {
      children.push({
        path: routesItem.path,
        element: createElement(Navigate, { to: item.redirect }),
      });
    }
    if (item.children) {
      children.push(...createUseRoutes(item.children, routesItem.path));
    }
    if (children.length > 0) {
      routesItem.children = children;
    }

    // newItem push
    routes.push(routesItem);
  }

  return routes;
};

export const pathKeyCreateUseRoutes = (routes: RouteObject[]): IPathKeyRouteObject => {
  let jsonItems: IPathKeyRouteObject = {};
  for (let index = 0; index < routes.length; index++) {
    const item = routes[index];
    jsonItems[item.path || ''] = {
      ...item,
    };

    if (item.children) {
      jsonItems = merge(jsonItems, pathKeyCreateUseRoutes(item.children));
    }
  }
  return jsonItems;
};

export const convertRouter = (navs: NavigationModel[]) : IRouter[] => {
  const items: IRouter[] = [];
  navs.forEach((item: NavigationModel) => {
    items.push({
      path: item.url != null ? (item.url as string) : '/',
      children: (item?.children?.length as number > 0 ? convertRouter(item.children as NavigationModel[]) : []) as [],
      // component: lazy(() => import('@/pages/Home')),
      meta: {
        icon: item.iconClass as string,
        title: item.name as string
      },
      // redirect: item.url as string thêm vào nếu muốn redirect tới trang mặc định của parent
    })
  });
  return items;
};

export const formatRoutes = (routes: IRouter[], parentPath = '/', parentPaths: string[] = []): IRouterPathKeyRouter => {
  const items: IRouter[] = [];
  let jsonItems: IPathKeyRouter = {};

  for (let index = 0; index < routes.length; index++) {
    const item = routes[index];
    const newItem: IRouter = {
      ...item,
    };

    let path = item.path || '';
    if (!isExternal(item.path)) {
      path = item.path.startsWith('/')
        ? item.path
        : `${parentPath.endsWith('/') ? parentPath : `${parentPath}/`}${item.path}`;
    }
    newItem.path = path;

    // meta
    const meta = item.meta || {};
    // meta.parentPath
    const pPaths = meta.parentPath && meta.parentPath.length > 0 ? meta.parentPath : parentPaths;
    meta.parentPath = pPaths;
    newItem.meta = meta;

    // children
    let children: IRouter[] | undefined;
    let pkChildren: IPathKeyRouter | undefined;
    if (item.children) {
      const fRoutes = formatRoutes(item.children, path, [...pPaths, path]);

      children = fRoutes.router;
      newItem.children = children;

      pkChildren = fRoutes.pathKeyRouter;
    }

    // item
    items.push(newItem);
    jsonItems[path] = newItem;
    if (pkChildren) {
      jsonItems = merge(jsonItems, pkChildren);
    }
  }

  return {
    router: items,
    pathKeyRouter: jsonItems,
  };
};

export const hasPermissionRoles = (userRoles: string[], roles?: string | string[]): boolean => {
  if (userRoles.length < 1) {
    return false;
  }

  if (userRoles.includes('admin')) {
    return true;
  }

  if (typeof roles === 'undefined') {
    return true;
  }

  if (typeof roles === 'string') {
    return userRoles.includes(roles);
  }

  if (roles instanceof Array && roles.length === 0) {
    return true;
  }

  if (roles instanceof Array && roles.length > 0) {
    return roles.some((role) => userRoles.includes(role));
  }

  return false;
};

export const getPathsTheRoutes = (pathname: string[], jsonRoutesData: IPathKeyRouter): IRouter[] => {
  const routeItem: IRouter[] = [];

  for (let index = 0, len = pathname.length; index < len; index += 1) {
    const element = pathname[index];
    const item = jsonRoutesData[element] || {};
    if (item.path !== '') {
      routeItem.push(item);
    }
  }

  return routeItem;
};

export const getBreadcrumbRoutes = (pathname: string, jsonRoutesData: IPathKeyRouter): BreadcrumbType[] => {
  const route: IRouter = jsonRoutesData[pathname] || {};
  if (!route.path) {
    return [];
  }

  if (!route.meta?.breadcrumb) {
    const parentPath = route.meta?.parentPath || [];
    const routes = getPathsTheRoutes(parentPath, jsonRoutesData);
    const bread: BreadcrumbType[] = [];

    for (let index = 0; index < routes.length; index++) {
      const element = routes[index];
      bread.push({
        title: element.meta?.title || '',
        path: element.path,
      });
    }

    if (route.meta?.breadcrumb === false) {
      return bread;
    }

    bread.push({
      title: route.meta?.title || '',
      path: route.path,
    });

    return bread;
  }

  return route.meta.breadcrumb;
};

export const equalTabNavRoute = (location1: Location, location2: Location, type: TabNavType = 'path'): boolean => {
  let is = false;
  switch (type) {
    case 'querypath': // path + query
      is =
        equalObject(qs.parse(location1.search), qs.parse(location2.search)) &&
        location1.pathname === location2.pathname;
      break;
    default: // path
      is = location1.pathname === location2.pathname;
      break;
  }

  return is;
};

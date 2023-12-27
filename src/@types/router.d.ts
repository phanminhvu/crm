import { Location, RouteObject } from 'react-router-dom';

export interface IPathKeyRouteObject {
  [path: string]: RouteObject;
}

export interface BreadcrumbType {
  title: string;
  path: string;
}

export type TabNavType = 'path' | 'querypath';

export interface IRouteMeta {
  title?: string;
  hidden?: boolean;
  icon?: string;
  roles?: string[];
  breadcrumb?: BreadcrumbType[] | false;
  selectLeftMenu?: string;
  parentPath?: string[];
  tabNavType?: TabNavType;
  tabNavCloseBefore?: (close: () => void) => void;
}

export type RouteComponent = React.FC<BrowserRouterProps> | (() => any);

export interface IRouter {
  path: string;
  meta?: IRouteMeta;
  redirect?: string;
  component?: RouteComponent;
  children?: IRouter[];
}

export interface IPathKeyRouter {
  [path: string]: IRouter;
}

export interface IRouterPathKeyRouter {
  router: IRouter[];
  pathKeyRouter: IPathKeyRouter;
}

export interface TabNavItem {
  location: Location;
  menu: IRouter;
}

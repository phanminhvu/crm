import { memo, useState, useMemo, useLayoutEffect } from 'react';
import { Menu } from 'antd';
import { unionWith } from 'lodash';
import { hasPermissionRoles } from '@/utils/router';
import { isExternal } from '@/utils/validate';
import ALink from '@/components/ALink';
import IconSvg from '@/components/IconSvg';

import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { Theme } from '@/@types/settings';
import { IRouter } from '@/@types/router';


const createMenuItems = (
  userRoles: string[],
  routes: IRouter[],
  parentPath = '/',
): ItemType[] => {
  const items: ItemType[] = [];

  for (let index = 0; index < routes.length; index++) {
    const item = routes[index];

    if (!hasPermissionRoles(userRoles, item.meta?.roles)) {
      continue;
    }

    const icon = item.meta?.icon || undefined;
    const hidden = item.meta?.hidden || false;
    if (hidden === true) {
      continue;
    }

    let path = item.path || '';
    if (!isExternal(item.path)) {
      path = item.path.startsWith('/')
        ? item.path
        : `${parentPath.endsWith('/') ? parentPath : `${parentPath}/`}${item.path}`;
    }

    const title = item.meta?.title || '--';

    if (item.children) {
      items.push({
        key: path,
        label: (
          <>
            {icon && (
              <span className='anticon'>
                <IconSvg name={icon} />
              </span>
            )}
            <span>{(title)}</span>
          </>
        ),
        children: createMenuItems( userRoles, item.children, path),
      });
    } else {
      items.push({
        key: path,
        label: (
          <ALink to={path}>
            {icon && (
              <span className='anticon'>
                <IconSvg name={icon} />
              </span>
            )}
            <span>{(title)}</span>
          </ALink>
        ),
      });
    }
  }

  return items;
};

export interface SiderMenuProps {
  menuData: IRouter[];
  routeItem: IRouter;
  userRoles?: string[];
  collapsed?: boolean;
  mode?: 'horizontal' | 'inline';
  theme?: Theme;
}

export default memo(
  ({ menuData, routeItem, userRoles = [], collapsed = false, mode = 'inline', theme = 'dark' }: SiderMenuProps) => {
    const selectedKeys = useMemo(() => {
      if (!routeItem) {
        return [];
      }
      if (routeItem.meta && routeItem.meta.selectLeftMenu) {
        return [routeItem.meta.selectLeftMenu];
      }
      return [routeItem.path];
    }, [routeItem]);
    const parentPaths = useMemo(() => {
      if (routeItem && routeItem.meta && routeItem.meta.parentPath) {
        return routeItem.meta.parentPath;
      }
      return [];
    }, [routeItem]);
    const [openKeys, setOpenKeys] = useState<string[]>(mode === 'inline' ? parentPaths : []);

    useLayoutEffect(() => {
      if (!collapsed && mode === 'inline') {
        setOpenKeys(unionWith(openKeys, parentPaths));
      } else {
        setOpenKeys([]);
      }
    }, [collapsed, parentPaths]);
    return mode === 'inline' ? (
      <Menu
        className='universallayout-menu'
        mode={mode}
        theme={theme}
        inlineCollapsed={collapsed}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
        items={createMenuItems(userRoles, menuData)}
      />
    ) : (
      <Menu
        className='universallayout-menu'
        mode={mode}
        theme={theme}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
        items={createMenuItems(userRoles, menuData)}
      />
    );
  },
);

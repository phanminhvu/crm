import { memo, useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useLocation, useNavigate, Location } from 'react-router-dom';
import classnames from 'classnames';
import { Dropdown, Menu } from 'antd';

import { useRecoilState } from 'recoil';
import { globalState } from '@/store/global';

import settings from '@/config/settings';

import { equalTabNavRoute } from '@/utils/router';

import IconSvg from '@/components/IconSvg';

import { IRouter, IPathKeyRouter, TabNavItem } from '@/@types/router';

export interface RightTabNavProps {
  jsonMenuData: IPathKeyRouter;
  routeItem: IRouter;
}

export default memo(({ jsonMenuData, routeItem }: RightTabNavProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [tabNavIndex, setTabNavIndex] = useState<number>(0);

  const [translateX, setTranslateX] = useState<number>(0);
  const scrollBoxRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  const handleScroll = (offset: number): void => {
    const boxWidth = scrollBoxRef.current ? scrollBoxRef.current.offsetWidth : 0;
    const contentWidth = scrollContentRef.current ? scrollContentRef.current.offsetWidth : 0;
    if (offset > 0) {
      setTranslateX(Math.min(0, translateX + offset));
    } else if (boxWidth < contentWidth) {
      if (translateX >= -(contentWidth - boxWidth)) {
        setTranslateX(Math.max(translateX + offset, boxWidth - contentWidth));
      }
    } else {
      setTranslateX(0);
    }
  };

  const tabNavPadding = 30;
  const moveToView = (index: number): void => {
    if (!scrollContentRef.current || !scrollContentRef.current.childNodes) {
      return;
    }

    const tabItemEl = scrollContentRef.current.childNodes[index] as HTMLSpanElement;
    if (!tabItemEl) {
      return;
    }

    const tabItemElOffsetLeft = tabItemEl.offsetLeft;
    const tabItemOffsetWidth = tabItemEl.offsetWidth;

    const boxWidth = scrollBoxRef.current ? scrollBoxRef.current.offsetWidth : 0;
    const contentWidth = scrollContentRef.current ? scrollContentRef.current.offsetWidth : 0;
    if (contentWidth < boxWidth || tabItemElOffsetLeft === 0) {
      setTranslateX(0);
    } else if (tabItemElOffsetLeft < -translateX) {
      setTranslateX(-tabItemElOffsetLeft + tabNavPadding);
    } else if (tabItemElOffsetLeft > -translateX && tabItemElOffsetLeft + tabItemOffsetWidth < -translateX + boxWidth) {
      setTranslateX(Math.min(0, boxWidth - tabItemOffsetWidth - tabItemElOffsetLeft - tabNavPadding));
    } else {
      setTranslateX(-(tabItemElOffsetLeft - (boxWidth - tabNavPadding - tabItemOffsetWidth)));
    }
  };

  useEffect(() => {
    moveToView(tabNavIndex);
  }, [tabNavIndex, scrollContentRef.current]);

  const handleRolling = (e: { deltaY: number }) => {
    handleScroll(-e.deltaY);
  };

  const [global, setGlobal] = useRecoilState(globalState);
  const tabNavList = useMemo(() => global.headTabNavList, [global]);

  const setGlobalHeadTabNavList = useCallback(
    (val: (currVal: typeof global) => TabNavItem[]) => {
      setGlobal((preVal) => {
        const navList = val(preVal);
        return {
          ...preVal,
          headTabNavList: [...navList],
        };
      });
    },
    [global, setGlobal],
  );

  const setTabNav = (location: Location, routeItem: IRouter): void => {
    if (!routeItem || location.pathname !== routeItem.path || (routeItem.children && routeItem.children?.length > 0)) {
      return;
    }
    let index = 0;
    setGlobalHeadTabNavList((val) => {
      index = val.headTabNavList.findIndex((item) =>
        equalTabNavRoute(item.location, location, routeItem?.meta?.tabNavType),
      );
      if (index < 0) {
        index = val.headTabNavList.length;
        return [
          ...val.headTabNavList,
          {
            location,
            menu: {
              ...routeItem,
            },
          },
        ];
      }
      return val.headTabNavList;
    });
    setTabNavIndex(index);
  };

  const closeTabNavAll = (): void => {
    const navList: TabNavItem[] = tabNavList.filter(
      (item: TabNavItem) =>
        (item.menu.meta?.tabNavCloseBefore && typeof item.menu.meta.tabNavCloseBefore === 'function') ||
        item.menu.path === settings.tabNavHomePath,
    );

    setGlobalHeadTabNavList(() => [...navList]);

    navigate(settings.tabNavHomePath);
  };

  const closeTabNavOther = (): void => {
    const navList: TabNavItem[] = tabNavList.filter(
      (item: TabNavItem) =>
        (item.menu.meta?.tabNavCloseBefore && typeof item.menu.meta.tabNavCloseBefore === 'function') ||
        item.menu.path === settings.tabNavHomePath ||
        equalTabNavRoute(location, item.location, item.menu.meta?.tabNavType),
    );
    setGlobalHeadTabNavList(() => [...navList]);
  };

  const closeTabNavLeftRight = (param: 'left' | 'right'): void => {
    const index = tabNavList.findIndex((item) => equalTabNavRoute(location, item.location, item.menu.meta?.tabNavType));

    const navList: TabNavItem[] = tabNavList.filter(
      (item: TabNavItem, i: number) =>
        (item.menu.meta?.tabNavCloseBefore && typeof item.menu.meta.tabNavCloseBefore === 'function') ||
        item.menu.path === settings.tabNavHomePath ||
        (param === 'left' ? i >= index : i <= index),
    );

    setGlobalHeadTabNavList(() => [...navList]);
  };

  const closeTabNav = (item: TabNavItem, index: number): void => {
    let isRouterPush: boolean | TabNavItem = false;
    if (equalTabNavRoute(location, item.location, item.menu?.meta?.tabNavType)) {
      isRouterPush = tabNavList[index - 1];
    }

    if (isRouterPush === undefined) {
      return;
    }

    const navList: TabNavItem[] = tabNavList.filter(
      (item2: TabNavItem) => !equalTabNavRoute(item2.location, item.location, item.menu?.meta?.tabNavType),
    );
    setGlobalHeadTabNavList(() => [...navList]);

    if (isRouterPush !== false) {
      navigate(isRouterPush.location);
    }
  };

  const closeCurrentTabNav = (item: TabNavItem, index: number): void => {
    if (item.menu.meta?.tabNavCloseBefore && typeof item.menu.meta.tabNavCloseBefore === 'function') {
      item.menu.meta.tabNavCloseBefore(() => {
        closeTabNav(item, index);
      });
    } else {
      closeTabNav(item, index);
    }
  };

  const onMenuClick = useCallback(
    ({ key }: { key: string }) => {
      switch (key) {
        case 'closeleft':
          closeTabNavLeftRight('left');
          break;
        case 'closeright':
          closeTabNavLeftRight('right');
          break;
        case 'closeother':
          closeTabNavOther();
          break;
        case 'closeall':
          closeTabNavAll();
          break;
        default:
          break;
      }
    },
    [global],
  );

  useEffect(() => {
    const homeRouter = jsonMenuData[settings.tabNavHomePath];
    if (!homeRouter) {
      return;
    }

    setTabNav(
      {
        pathname: settings.tabNavHomePath,
        hash: '',
        search: '',
        state: null,
        key: '',
      },
      homeRouter,
    );
  }, []);

  useEffect(() => {
    setTabNav(location, routeItem);
  }, [routeItem, location]);

  return (
    <div className='universallayout-top-tab-nav'>
      <div className='left' onClick={() => handleScroll(200)}>
        <span className='icon'>
          <IconSvg name='arrow-left' />
        </span>
      </div>
      <div className='middle' ref={scrollBoxRef} onWheel={handleRolling}>
        <div className='tab' ref={scrollContentRef} style={{ transform: `translateX(${translateX}px)` }}>
          {tabNavList.map((item, index) => (
            <span
              key={`tab-nav-${index}`}
              className={classnames('item', {
                active: equalTabNavRoute(location, item.location, item.menu?.meta?.tabNavType),
              })}
              onClick={() => navigate(item.location)}
            >
              <span className='icon-pre'>
                <IconSvg name='refresh' />
              </span>
              <span>{(item.menu.meta?.title || '')}</span>
              {item.menu.path !== settings.tabNavHomePath && (
                <span
                  className='icon'
                  onClick={(e) => {
                    e.stopPropagation();
                    closeCurrentTabNav(item, index);
                  }}
                >
                  <IconSvg name='close' />
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
      <div className='right' onClick={() => handleScroll(-200)}>
        <span className='icon'>
          <IconSvg name='arrow-right' />
        </span>
      </div>
      <div className='down'>
        <Dropdown
          overlay={
            <Menu
              onClick={onMenuClick}
              items={[
                {
                  key: 'closeleft',
                  label: (
                    <>
                      <IconSvg name='arrow-left2' />
                      Đóng tab trái
                    </>
                  ),
                },
                {
                  key: 'closeright',
                  label: (
                    <>
                      <IconSvg name='arrow-right2' />
                      Đóng tab phải
                    </>
                  ),
                },
                {
                  key: 'closeother',
                  label: (
                    <>
                      <IconSvg name='close' />
                      Đóng hết các tab đã mở
                    </>
                  ),
                },
                {
                  key: 'closeall',
                  label: (
                    <>
                      <IconSvg name='close2' />
                      Đóng tất cả các tab
                    </>
                  ),
                },
              ]}
            />
          }
        >
          <span className='icon-box icon'>
            <IconSvg name='more' />
          </span>
        </Dropdown>
      </div>
    </div>
  );
});

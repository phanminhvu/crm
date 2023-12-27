import { memo } from 'react';
import { Popover, Divider, Switch } from 'antd';
import classnames from 'classnames';

import { useRecoilState } from 'recoil';
import { globalState } from '@/store/global';

import IconSvg from '@/components/IconSvg';

import { Theme, NavMode } from '@/@types/settings';

import style from './index.module.less';

export default memo(() => {
  const [global, setGlobal] = useRecoilState(globalState);

  const setTheme = (theme: Theme) => {
    setGlobal({ ...global, theme });
  };

  const setNavMode = (navMode: NavMode) => {
    setGlobal({ ...global, navMode });
  };

  const onChangeHeadFixed = () => {
    setGlobal({ ...global, headFixed: !global.headFixed });
  };

  const onChangeTabNavEnable = () => {
    setGlobal({ ...global, tabNavEnable: !global.tabNavEnable });
  };

  const onChangeLeftSiderFixed = () => {
    setGlobal({ ...global, leftSiderFixed: !global.leftSiderFixed });
  };
  return (
    <Popover
      content={
        <div className={style.setting}>
          <div className={style['setting-title']}>Chủ đề sáng tối</div>

          <div className={style['setting-radio']}>
            <div
              className={classnames(style['setting-radio-item'], style['style-dark'])}
              title='dark'
              onClick={() => {
                setTheme('dark');
              }}
            >
              {global.theme === 'dark' && (
                <span className={style['choose-icon']}>
                  <IconSvg name='tick' />
                </span>
              )}
            </div>
            <div
              className={classnames(style['setting-radio-item'], style['style-light'])}
              title='light'
              onClick={() => {
                setTheme('light');
              }}
            >
              {global.theme === 'light' && (
                <span className={style['choose-icon']}>
                  <IconSvg name='tick' />
                </span>
              )}
            </div>
          </div>

          <Divider style={{ margin: '10px 0' }} />

          <div className={style['setting-title']}>Menu ngang dọc</div>
          <div className={style['setting-radio']}>
            <div
              className={classnames(style['setting-radio-item'], style['nav-inline'])}
              title='inline'
              onClick={() => {
                setNavMode('inline');
              }}
            >
              {global.navMode === 'inline' && (
                <span className={style['choose-icon']}>
                  <IconSvg name='tick' />
                </span>
              )}
            </div>
            <div
              className={classnames(style['setting-radio-item'], style['nav-horizontal'])}
              title='horizontal'
              onClick={() => {
                setNavMode('horizontal');
              }}
            >
              {global.navMode === 'horizontal' && (
                <span className={style['choose-icon']}>
                  <IconSvg name='tick' />
                </span>
              )}
            </div>
          </div>

          <Divider style={{ margin: '10px 0' }} />

          <div className={style['setting-list']}>
            <div className={style['setting-list-item']}>
              <span>Cố định header</span>
              <span className={style['setting-list-item-action']}>
                <Switch
                  checkedChildren='Bật'
                  unCheckedChildren='Tắt'
                  checked={global.headFixed}
                  onChange={onChangeHeadFixed}
                />
              </span>
            </div>
            <div className={style['setting-list-item']}>
              <span>Tab đã mở</span>
              <span className={style['setting-list-item-action']}>
                <Switch
                  checkedChildren='Bật'
                  unCheckedChildren='Tắt'
                  checked={global.tabNavEnable}
                  onChange={onChangeTabNavEnable}
                />
              </span>
            </div>
            <div className={style['setting-list-item']}>
              <span>Cố định menu trái</span>
              <span className={style['setting-list-item-action']}>
                <Switch
                  checkedChildren='Bật'
                  unCheckedChildren='Tắt'
                  checked={global.leftSiderFixed}
                  onChange={onChangeLeftSiderFixed}
                />
              </span>
            </div>
          </div>
        </div>
      }
      trigger='hover'
      placement='bottomRight'
    >
      <span className='universallayout-top-settings'>
        <IconSvg name='theme' />
      </span>
    </Popover>
  );
});

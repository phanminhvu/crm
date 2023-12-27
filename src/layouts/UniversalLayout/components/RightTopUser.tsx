import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';

import { useRecoilState} from 'recoil';
import { userState, initialState } from '@/store/user';

import { removeToken } from '@/utils/localToken';

import IconSvg from '@/components/IconSvg';

export default memo(() => {
  const [user, setUser] = useRecoilState(userState);

  const navigate = useNavigate();

  const onMenuClick = useCallback(
    ({ key }: { key: string }) => {
      if (key === 'logout') {
        setUser({
          ...user,
          ...initialState,
        });
        removeToken();
        navigate('/user/login', {
          replace: true,
        });
      }
    },
    [user, setUser],
  );
  return (
    <Dropdown
      overlay={
        <Menu
          onClick={onMenuClick}
          items={[
            {
              key: 'userinfo',
              label: <>{'Thông tin cá nhân'}</>,
            },
            {
              key: 'logout',
              label: <>{'Đăng xuất'}</>,
            },
          ]}
        />
      }
    >
      <a className='universallayout-top-usermenu ant-dropdown-link' onClick={(e) => e.preventDefault()}>
        {user.name}
        <IconSvg name='arrow-down' />
      </a>
    </Dropdown>
  );
});

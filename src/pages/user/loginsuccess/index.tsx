import { memo } from 'react';
import { Alert } from 'antd';
import { setToken, setRole } from '@/utils/localToken';
import style from './index.module.less';

const url = new URL(window.location.href.replace('#', '?'));
const searchParams = url.searchParams;
const access_token = searchParams.get('access_token');
console.log(url.hash);
if (access_token != null && access_token != '') {
  setToken(access_token);
  setRole('admin');
}

type Timer = ReturnType<typeof setTimeout>;

const timer: Timer = setTimeout(() => {
  window.location.href = window.location.origin;
}, 2000);

export default memo(() => {
  return (
    <div className={style.main}>
      <Alert message={'Đăng nhập thành công !'} type='success' showIcon />
    </div>
  );
});

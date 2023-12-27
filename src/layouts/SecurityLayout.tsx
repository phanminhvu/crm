import { memo, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useRecoilState } from 'recoil';
import { userState, CurrentUser } from '@/store/user';

import PageLoading from '@/components/PageLoading';

import { ResponseData } from '@/utils/request';
import { queryCurrent } from '@/apis/services/PageService';
import { getToken } from '@/utils/localToken';

export interface SecurityLayoutProps {
  children: React.ReactNode;
}

export default memo(({ children }: SecurityLayoutProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const isLogin = useMemo(() => user.id > 0, [user]);

  const getUser = useCallback(async () => {
    if(getToken() != null ){
      try {
        // call api get user info
        const response: ResponseData<CurrentUser> = await queryCurrent();
        const { data } = response;
        setUser({
          ...user,
          ...data,
        });
      } catch (error: any) {
        console.log('error', error);
        if (error.message && error.message === 'CustomError') {
          const response = error.response || { data: { code: 10002, msg: '' } };
          const { code, msg } = response.data;
          if (code === 10002 || code === 401) {
            navigate('/user/login', { replace: true });
          } else {
            message.error(msg || error);
          }
        }
      }
    }else{
      const response: ResponseData<CurrentUser> = await queryCurrent();
      const { data } = response;
      setUser({
        ...user,
        ...data,
      });
      // navigate('/user/login', { replace: true });
    }

  }, [user, setUser]);

  useEffect(() => {
    getUser();
  }, []);
  return <>{isLogin ? children : <PageLoading />}</>;


});

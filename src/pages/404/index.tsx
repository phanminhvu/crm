import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

export default memo(() => (
  <Result
    status='404'
    title='404'
    subTitle='Trang không tồn tại'
    extra={
      <Link to='/'>
        <Button type='primary'>Trang chủ</Button>
      </Link>
    }
  />
));

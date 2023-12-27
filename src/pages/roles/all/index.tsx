import { Card, Alert, Descriptions, Button, Divider } from 'antd';
import Permission from '@/components/Permission';

function App() {
  return (
    <div className='layout-main-conent'>
      <Card>

        <Descriptions
          title='3 tài khoản mặc định để test với mật khẩu：123456'
          layout='vertical'
          size='small'
          bordered
          style={{ marginTop: '20px' }}
        >
          <Descriptions.Item label='admin'> Có tất cả các quyền</Descriptions.Item>
          <Descriptions.Item label='user'>Quyền user</Descriptions.Item>
          <Descriptions.Item label='test'>Quyền test</Descriptions.Item>
        </Descriptions>

        <Alert
          message='Đăng nhập với các tài khoản ở trên để test'
          type='error'
          style={{ marginTop: '20px' }}
        ></Alert>

        <Descriptions
          title='Mô tả phân quyền'
          layout='vertical'
          size='small'
          bordered
          column={1}
          style={{ marginTop: '20px' }}
        >
          <Descriptions.Item label='Không phân quyền'>
            <Button type='primary'>Xóa</Button>
            <Button type='primary' danger>
              Sửa
            </Button>
          </Descriptions.Item>
          <Divider>
            <h3>Khi phân quyền từng nút：</h3>
          </Divider>
          <Descriptions.Item label='Phân quyền 1'>
            <Permission role='user' noNode={<>Không có quyền！</>}>
              <Button type='primary' danger>
                Xóa
              </Button>
            </Permission>
          </Descriptions.Item>
          <Descriptions.Item label='Phân quyền 2'>
            <Permission role='test' noNode={<>Không có quyền！</>}>
              <Button type='primary'>Sửa</Button>
            </Permission>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}

export default App;

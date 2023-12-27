import { useEffect, useMemo, useState } from 'react';
import { Badge, Card, Descriptions, Divider, Spin, Table } from 'antd';

import { DetailDataType } from '@/apis/models/data';
import { ResponseData } from '@/utils/request';
import { queryDetail } from '@/apis/services/PageService';
import styles from './index.module.less';

const progressColumns = [
  {
    title: 'Thời gian',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Đánh giá',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (text: string) => {
      if (text === 'success') {
        return <Badge status='success' text='Hoàn thành' />;
      }
      return <Badge status='processing' text='Đang chạy' />;
    },
  },

  {
    title: 'ID',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: 'Thời gian',
    dataIndex: 'cost',
    key: 'cost',
  },
];
const initDetail: DetailDataType = {
  userInfo: {
    name: '',
    tel: '',
    courier: '',
    address: '',
    remark: '',
  },
  refundApplication: {
    ladingNo: '',
    saleNo: '',
    state: '',
    childOrders: '',
  },
  returnGoods: [],
  returnProgress: [],
};

function App() {
  const [loading, setLoading] = useState<boolean>();
  const [detail, setDetail] = useState<DetailDataType>({
    ...initDetail,
  });

  const userInfo = useMemo(
    () =>
      detail.userInfo || {
        name: '',
        tel: '',
        courier: '',
        address: '',
        remark: '',
      },
    [detail],
  );
  const refundApplication = useMemo(
    () =>
      detail.refundApplication || {
        ladingNo: '',
        saleNo: '',
        state: '',
        childOrders: '',
      },
    [detail],
  );
  const returnGoods = useMemo(() => detail.returnGoods || [], [detail]);
  const goodsData = useMemo(() => {
    if (returnGoods.length > 0) {
      let num = 0;
      let amount = 0;
      returnGoods.forEach((item) => {
        num += Number(item.num);
        amount += Number(item.amount);
      });
      return returnGoods.concat({
        id: 'Tổng',
        num,
        amount,
      });
    }
    return [];
  }, [returnGoods]);
  const returnProgress = useMemo(() => detail.returnProgress || [], [detail]);

  const renderContent = (value: any, row: any, index: any) => {
    const obj: {
      children: any;
      props: { colSpan?: number };
    } = {
      children: value,
      props: {},
    };
    if (index === returnGoods.length) {
      obj.props.colSpan = 0;
    }
    return obj;
  };
  const goodsColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: React.ReactNode, row: any, index: number) => {
        if (index < returnGoods.length) {
          return <a href=''>{text}</a>;
        }
        return {
          children: <span style={{ fontWeight: 600 }}>Tổng</span>,
          props: {
            colSpan: 4,
          },
        };
      },
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: renderContent,
    },
    {
      title: 'Mã',
      dataIndex: 'barcode',
      key: 'barcode',
      render: renderContent,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      align: 'right' as 'left' | 'right' | 'center',
      render: renderContent,
    },
    {
      title: 'Khối lượng',
      dataIndex: 'num',
      key: 'num',
      align: 'right' as 'left' | 'right' | 'center',
      render: (text: React.ReactNode, row: any, index: number) => {
        if (index < returnGoods.length) {
          return text;
        }
        return <span style={{ fontWeight: 600 }}>{text}</span>;
      },
    },
    {
      title: 'Thành tiền',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right' as 'left' | 'right' | 'center',
      render: (text: React.ReactNode, row: any, index: number) => {
        if (index < returnGoods.length) {
          return text;
        }
        return <span style={{ fontWeight: 600 }}>{text}</span>;
      },
    },
  ];

  const getData = async () => {
    setLoading(true);
    try {
      const response: ResponseData<DetailDataType> = await queryDetail();
      const { data } = response;
      setDetail({
        ...initDetail,
        ...data,
      });
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='layout-main-conent'>
      <Spin spinning={loading} size='large'>
        <Card bordered={false} title='Chi tiết tài khoản' style={{ marginBottom: '20px' }}>
          <Descriptions bordered column={2} className={styles['cus-table']}>
            <Descriptions.Item label='Tên'>{userInfo.name}</Descriptions.Item>
            <Descriptions.Item label='Số điện thoại'>{userInfo.tel}</Descriptions.Item>
            <Descriptions.Item label='Chức năng'>{userInfo.courier}</Descriptions.Item>
            <Descriptions.Item label='Địa chỉ'>{userInfo.address}</Descriptions.Item>
            <Descriptions.Item label='Ghi chú'>{userInfo.remark}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card bordered={false}>

          <Descriptions title='Chi tiết tài khoản'>
            <Descriptions.Item label='Tên'>{userInfo.name}</Descriptions.Item>
            <Descriptions.Item label='Số điện thoại'>{userInfo.tel}</Descriptions.Item>
            <Descriptions.Item label='Chức năng'>{userInfo.courier}</Descriptions.Item>
            <Descriptions.Item label='Địa chỉ'>{userInfo.address}</Descriptions.Item>
            <Descriptions.Item label='Ghi chú'>{userInfo.remark}</Descriptions.Item>
          </Descriptions>

          <Divider />
          
          <div className='ant-descriptions'>
            <div className='ant-descriptions-header'>
              <div className='ant-descriptions-title'>Thông tin dạng bảng</div>
            </div>
            <div className='ant-descriptions-view'>
              <Table rowKey='id' pagination={false} dataSource={goodsData} columns={goodsColumns} />
            </div>
          </div>

          <Divider />

          <div className='ant-descriptions'>
            <div className='ant-descriptions-header'>
              <div className='ant-descriptions-title'>Thông tin dạng bảng</div>
            </div>
            <div className='ant-descriptions-view'>
              <Table pagination={false} dataSource={returnProgress} columns={progressColumns} />
            </div>
          </div>
        </Card>
      </Spin>
    </div>
  );
}

export default App;

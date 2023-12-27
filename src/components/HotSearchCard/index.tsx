import React, { useEffect, useState } from 'react';
import { Card, Table } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { TableListItem } from '@/apis/models/data';
import { PaginationConfig } from '@/utils/request';

import styles from '@/assets/css/index.module.less';

import { ResponseData } from '@/utils/request';
import { hotSearchQueryList } from '@/apis/services/PageService';

const initPagination = {
  total: 0,
  current: 1,
  pageSize: 5,
  showSizeChanger: false,
  showQuickJumper: false
};

const HotSearchCard: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<TableListItem[]>([]);
  const [pagination, setPagination] = useState<PaginationConfig>({
    ...initPagination,
  });

  const getList = async (current: number) => {
    setLoading(true);
    try {
      const response: ResponseData<{ list: TableListItem[]; total: number }> = await hotSearchQueryList({
        per: pagination.pageSize,
        page: current,
      });
      const { data } = response;
      setList(data?.list || []);
      setPagination({
        ...initPagination,
        current,
        total: data?.total || 0,
      });
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getList(1);
  }, []);

  const columns: ColumnsType<TableListItem> = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: 80,
      render: (_, record, index) => <>{(pagination.current - 1) * pagination.pageSize + index + 1}</>,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
    },
    {
      title: 'Lượt',
      dataIndex: 'hit',
    },
  ];

  return (
    <Card className={styles.homeBoxCard} title={'Lượt tiếp cận'}>
      <Table
        size='small'
        rowKey='name'
        columns={columns}
        dataSource={list}
        loading={loading}
        pagination={pagination}
        onChange={(p: TablePaginationConfig) => {
          getList(p.current || 1);
        }}
      />
    </Card>
  );
};

export default HotSearchCard;

import { useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Form, FormInstance, Input, message, Modal, Radio, Row, Table, Tag } from 'antd';
import { ResponseData, PaginationConfig } from '@/utils/request';
import { deleteDepartment, getDepartment, postDepartment, putDepartment } from '@/apis/services/DepartmentService';
import { DepartmentModel } from '@/apis/models/DepartmentModel';

import IconSvg from '@/components/IconSvg';

import CreateForm from '@/components/CreateForm/CreateForm';
import UpdateForm from '@/components/UpdateForm/UpdateForm';
import { ColumnsType } from 'antd/lib/table';
import TypeSelect from '../../../../../components/TypeSelect';

const searchFormItemLayout = {
  labelCol: { span: 3, offset: 0 },
};




var departments : DepartmentModel[];

function App() {
  // Load
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<DepartmentModel[]>([]);
  const [pagination, setPagination] = useState<PaginationConfig>({
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
  });
  const getList = async (current: number): Promise<void> => {
    setLoading(true);

    // @ts-ignore
    const response: ResponseData = await getDepartment();
    departments = (response.data || []) as DepartmentModel[];
    setList((response.data || []) as DepartmentModel[]);
    setPagination({
      ...pagination,
      current,
      total: response.totalCount || 0,
    });

    setLoading(false);
  };
  useEffect(() => {
    getList(1);
  }, []);

  const [deleteLoading, setDeleteLoading] = useState<string[]>([]);
  const deleteTableData = (id: string) => {
    Modal.confirm({
      title: 'Cảnh báo',
      content: 'Bạn có chắc chắn muốn xóa ?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: async () => {
        setDeleteLoading([id]);

        await deleteDepartment(id);
        message.success('Thành công !');
        getList(pagination.current);

        setDeleteLoading([]);
      },
    });
  };

  // Data
  const [updateSubmitLoading, setUpdateSubmitLoading] = useState<boolean>(false);
  const [updateFormVisible, setUpdateFormVisible] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<Partial<DepartmentModel>>({});
  const [detailUpdateLoading, setDetailUpdateLoading] = useState<string[]>([]);
  const detailUpdateData = async (id: string) => {
    setDetailUpdateLoading([id]);

    const data = departments.find((item: DepartmentModel) => (item.id == id));
    setUpdateData({
      ...data,
    });
    setUpdateFormVisible(true);

    setDetailUpdateLoading([]);
  };

  const updataFormCancel = async () => {
    setUpdateData({});
    setUpdateFormVisible(false);
  };

  const updateSubmit = async (values: DepartmentModel) => {
    setUpdateSubmitLoading(true);

    const { id } = values;
    await putDepartment(id || '', values);
    updataFormCancel();
    message.success('Thành công !');
    getList(pagination.current);

    setUpdateSubmitLoading(false);
  };

  // Save
  const [createSubmitLoading, setCreateSubmitLoading] = useState<boolean>(false);
  const [createFormVisible, setCreateFormVisible] = useState<boolean>(false);
  const createSubmit = async (values: Omit<DepartmentModel, 'id'>, form: FormInstance) => {
    setCreateSubmitLoading(true);

    await postDepartment(values);
    form.resetFields();
    setCreateFormVisible(false);
    message.success('Thành công !');
    getList(1);

    setCreateSubmitLoading(false);
  };

  // searchForm
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchForm] = Form.useForm();
  const searchFormSubmit = async () => {
    try {
      // const fieldsValue = await searchForm.validateFields();
      // console.log('search', fieldsValue);
      message.warning('Tìm kiếm!');
    } catch (error: any) {
      console.log(error);
    }
  };

  const columns: ColumnsType<DepartmentModel> = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: 80,
      render: (_, record, index) => <>{(pagination.current - 1) * pagination.pageSize + index + 1}</>,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      width: 300,
      render: (_, record) => <span>{record.id}</span>,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      render: (_, record) => <span>{record.name}</span>,
    },
    {
      title: 'Mã',
      dataIndex: 'code',
      render: (_, record) => <span>{record.code}</span>,
    },
    {
      title: 'Tạo ngày',
      dataIndex: 'type',
      render: (_, record) => <span>{record.createdOnDate}</span>,
    },
    {
      title: 'Tháo tác',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <>
          <Button
            type='link'
            loading={detailUpdateLoading.includes(record.id || '')}
            onClick={() => detailUpdateData(record.id || '')}
          >
            Sửa
          </Button>
          <Divider type='vertical' />
          <Button type='link' loading={deleteLoading.includes(record.id || '')} onClick={() => deleteTableData(record.id || '')}>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className='layout-main-conent'>
      <Card bordered={false} style={{ marginBottom: '15px' }} bodyStyle={{ paddingBottom: '0' }}>
        <Form form={searchForm} name='search'>
          <Row gutter={16} justify='end'>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item {...searchFormItemLayout} label='Tên：' name='name'>
                <Input placeholder='Tên' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item {...searchFormItemLayout} label='Url：' name='herf'>
                <Input placeholder='Url' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item {...searchFormItemLayout} label='Loại：' name='type'>
                <TypeSelect placeholder='Chọn' />
              </Form.Item>
            </Col>
            {searchOpen ? (
              <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                <Form.Item {...searchFormItemLayout} label='Ghi chú：' name='remark'>
                  <Input placeholder='Ghi chú' />
                </Form.Item>
              </Col>
            ) : null}
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <div className='text-align-right' style={{ paddingBottom: '24px' }}>
                <Button type='primary' htmlType='submit' onClick={searchFormSubmit}>
                  Tìm kiếm
                </Button>
                <Button htmlType='button' style={{ marginLeft: 8 }} onClick={() => searchForm.resetFields()}>
                  Làm lại
                </Button>
                <Button type='link' style={{ marginLeft: 8 }} onClick={() => setSearchOpen(!searchOpen)}>
                  {searchOpen ? (
                    <>
                      Thu gọn
                      <IconSvg name='arrow-down' style={{ transform: 'rotate(180deg)' }} />
                    </>
                  ) : (
                    <>
                      Mở rộng
                      <IconSvg name='arrow-down' />
                    </>
                  )}
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card
        bordered={false}
        title={
          <Button type='primary' onClick={() => setCreateFormVisible(true)}>
            Thêm mới
          </Button>
        }
        extra={
          <div>
            <Radio.Group defaultValue='all'>
              <Radio.Button value='all'>Tất cả</Radio.Button>
              <Radio.Button value='header'>Đầu</Radio.Button>
              <Radio.Button value='footer'>Cuối</Radio.Button>
            </Radio.Group>
            <Input.Search placeholder='Tìm kiếm' style={{ width: '270px', marginLeft: '16px' }} onSearch={() => ({})} />
          </div>
        }
      >
        <Table
          rowKey='id'
          columns={columns}
          dataSource={list}
          loading={loading}
          pagination={{
            ...pagination,
            onChange: (page: number) => {
              getList(page);
            },
          }}
        />
      </Card>

      <CreateForm
        onCancel={() => setCreateFormVisible(false)}
        visible={createFormVisible}
        onSubmit={createSubmit}
        onSubmitLoading={createSubmitLoading}
      />

      {updateFormVisible && Object.keys(updateData).length > 0 ? (
        <UpdateForm
          values={updateData}
          onCancel={() => updataFormCancel()}
          visible={updateFormVisible}
          onSubmit={updateSubmit}
          onSubmitLoading={updateSubmitLoading}
        />
      ) : null}
    </div>
  );
}

export default App;

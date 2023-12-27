import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  FormInstance,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Table,
  Tag
} from 'antd';
import { ResponseData, PaginationConfig } from '@/utils/request';
import { deleteCompany, getCompany } from '@/apis/services/CompamyService';

import IconSvg from '@/components/IconSvg';

import CreateForm from '@/components/CreateForm/CreateForm';
import UpdateForm from '@/components/UpdateForm/UpdateForm';
import { ColumnsType } from 'antd/lib/table';
import TypeSelect from '../../components/TypeSelect';
import {CompanyModel} from "@/apis/models/CompanyModel";
import { useNavigate } from 'react-router-dom';
import {getCompanyType} from "@/apis/services/CompamyTypeService";
import {getCompanyGroup} from "@/apis/services/CompamyGroupService";
import {CompanyGroupModel} from "@/apis/models/CompanyGroupModel";

const searchFormItemLayout = {
  labelCol: { span: 12, offset: 0 },
};

var departments : CompanyModel[];
function App() {

  const navigate = useNavigate();
  // Load
  const [loading, setLoading] = useState<boolean>(false);
  const [defaultList, setdefaultList] = useState<CompanyModel[]>([]);
  const [list, setList] = useState<CompanyModel[]>([]);
  const [typeList, setTypeList] = useState<any>([]);
  const [groupList, setGroupList] = useState<any>([]);
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
    const response: ResponseData = await getCompany(pagination.current, pagination.pageSize);
    departments = (response.data || []) as CompanyModel[];

    setList((response.data) as CompanyModel[]);
    setdefaultList((response.data) as CompanyModel[]);
    setPagination({
      ...pagination,
      current,
      total: response.totalCount || 0,
    });

    setLoading(false);
  };
  useEffect(() => {
    getList(1);
    getAllCompanyType();
    getAllCompanyGroup();
  }, []);

  const getAllCompanyType = async () => {
    try {
      const res = await getCompanyType(1, 1000);
      setTypeList(res.data);
    } catch (error: any) {
      console.log(error);
    }
  }



  const getAllCompanyGroup = async () => {
    try {
      const res = await getCompanyGroup(1, 1000);
      setGroupList(res.data);
    } catch (error: any) {
      console.log(error);
    }
  }

  const [deleteLoading, setDeleteLoading] = useState<string[]>([]);
  const deleteTableData = (id: string) => {
    Modal.confirm({
      title: 'Cảnh báo',
      content: 'Bạn có chắc chắn muốn xóa ?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: async () => {
        setDeleteLoading([id]);
        await deleteCompany(id);
        message.success('Thành công !');
        getList(pagination.current);

        setDeleteLoading([]);
      },
    });
  };

  // searchForm
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchForm] = Form.useForm();
  const searchFormSubmit = async () => {
    try {
      const fieldsValue = await searchForm.validateFields();

      console.log('search', fieldsValue);

      const newList = defaultList.filter((item : any) =>
        item.name?.includes(fieldsValue.name || '') &&
        item.taxCode?.includes(fieldsValue.tax || '') &&
        (item.groupId === fieldsValue.group && fieldsValue.group )
        // (
        //   item.lstCompanyType?.filter( (typeItem : any) => typeItem.id === fieldsValue.type ).length > 0 && fieldsValue.type
        // )
      );

      setList(newList);
      console.log('search', fieldsValue);
      message.warning('Tìm kiếm!');
    } catch (error: any) {
      console.log(error);
    }
  };

  const columns: ColumnsType<CompanyModel> = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: 80,
      render: (_, record, index) => <>{(pagination.current - 1) * pagination.pageSize + index + 1}</>,
    },
    {
      title: 'Mã khách hàng',
      dataIndex: 'code',
      width: 300,
    },
    {
      title: 'Nhóm khách hàng',
      dataIndex: 'groupName',
    },
    {
      title: 'Loại hình khách hàng',
      dataIndex: 'groupName',
      render: (_, record : any) => (
        <>
          {record.lstCompanyType?.map((item: any) => <Tag>
            {item.companyTypeName}
          </Tag>)}
        </>
      ),
    },
    {
      title: 'Mã số thuế',
      dataIndex: 'taxCode',
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Tháo tác',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <>
          <Button
            type='link'
            // loading={detailUpdateLoading.includes(record.id || '')}
            onClick={() => navigate(`/customer-list/${record.id}` )}
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
        <Form form={searchForm} name='search' >
          <Row gutter={16} justify='end'>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item {...searchFormItemLayout} label='Nhóm khách hàng：' name='group'>
                <Select  allowClear>
                  {groupList.map((item: any) => <Select.Option value={item.id}>{item.groupName}</Select.Option>)}
                </Select>
              </Form.Item>
            </Col>
            {/*<Col xs={24} sm={24} md={24} lg={6} xl={6}>*/}
            {/*  <Form.Item {...searchFormItemLayout} label='Loại hình khách hàng：' name='type'>*/}
            {/*    <Select  allowClear>*/}
            {/*       {typeList.map((item: any) => <Select.Option value={item.id}>{item.companyTypeName}</Select.Option>)}*/}
            {/*    </Select>*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item {...searchFormItemLayout} label='Mã số thuế：' name='tax'>
                <Input placeholder='Mã số thuế' />
              </Form.Item>
            </Col>
            {/*{searchOpen ? (*/}
              <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                <Form.Item {...searchFormItemLayout} label='Tên khách hàng：' name='name'>
                  <Input placeholder='Tên khách hàng' />
                </Form.Item>
              </Col>
            {/*) : null}*/}
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <div className='text-align-right' style={{ paddingBottom: '24px' }}>
                <Button type='primary' htmlType='submit' onClick={searchFormSubmit}>
                  Tìm kiếm
                </Button>
                <Button htmlType='button' style={{ marginLeft: 8 }} onClick={() => {searchForm.resetFields()
                  setList(defaultList);
                }}>
                  Làm lại
                </Button>
                <Button type='link' style={{ marginLeft: 8 }} onClick={() => setSearchOpen(!searchOpen)}>
                  {/*{searchOpen ? (*/}
                  {/*  <>*/}
                  {/*    Thu gọn*/}
                  {/*    <IconSvg name='arrow-down' style={{ transform: 'rotate(180deg)' }} />*/}
                  {/*  </>*/}
                  {/*) : (*/}
                  {/*  <>*/}
                  {/*    Mở rộng*/}
                  {/*    <IconSvg name='arrow-down' />*/}
                  {/*  </>*/}
                  {/*)}*/}
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card
        bordered={false}
        title={
          <Button type='primary' onClick={() =>navigate(`/customer-list/new` )}>
            Thêm mới
          </Button>
        }
        // extra={
        //   <div>
        //     <Radio.Group defaultValue='all'>
        //       <Radio.Button value='all'>Tất cả</Radio.Button>
        //       <Radio.Button value='header'>Đầu</Radio.Button>
        //       <Radio.Button value='footer'>Cuối</Radio.Button>
        //     </Radio.Group>
        //     <Input.Search placeholder='Tìm kiếm' style={{ width: '270px', marginLeft: '16px' }} onSearch={() => ({})} />
        //   </div>
        // }
      >
        <Table
          rowKey='id'
          columns={columns}
          dataSource={list}
          // loading={loading}
          pagination={{
            ...pagination,
            onChange: (page: number) => {
              getList(page);
            },
          }}
        />
      </Card>
    </div>
  );
}

export default App;

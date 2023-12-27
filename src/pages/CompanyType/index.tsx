import { useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Pagination, Form,  FormInstance, Input, message, Modal, Radio, Row, Table, Tag } from 'antd';
import { ResponseData, PaginationConfig } from '@/utils/request';
import { deleteCompanyType, getCompanyType, postCompanyType, putCompanyType } from '@/apis/services/CompamyTypeService';
import { CompanyTypeModel } from '@/apis/models/CompanyTypeModel';

import IconSvg from '@/components/IconSvg';
import CreateForm from '@/components/CreateForm/CreateForm';
import UpdateForm from '@/components/UpdateForm/UpdateForm';
import { ColumnsType } from 'antd/lib/table';
import TypeSelect from '../../components/TypeSelect';
import type { ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable
} from '@ant-design/pro-components';
const searchFormItemLayout = {
  labelCol: { span: 12, offset: 0 },
};
import {
  CheckCircleOutlined,
  CloseCircleOutlined,

} from '@ant-design/icons';
import {putDepartment} from "@/apis/services/DepartmentService";
import {deleteCompanyGroup} from "@/apis/services/CompamyGroupService";
import {CompanyGroupModel} from "@/apis/models/CompanyGroupModel";

var CompanyTypes : CompanyTypeModel[];


const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};






function App() {

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>(
    'bottom',
  );
  // Load
  const [loading, setLoading] = useState<boolean>(false);
  const [defaultList, setdefaultList] = useState<CompanyTypeModel[]>([]);

  const [list, setList] = useState<CompanyTypeModel[]>([]);
  const [pagination, setPagination] = useState<PaginationConfig>({
    total: 20,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
  });
  const getList = async (current: number, pageSize: number): Promise<void> => {
    setLoading(true);
    // @ts-ignore
    const response: ResponseData = await getCompanyType( current, pageSize);
    CompanyTypes = (response.data || []) as CompanyTypeModel[];
    setList((response.data || []) as CompanyTypeModel[]);
    setdefaultList((response.data || []) as CompanyTypeModel[]);
    setPagination({
      ...pagination,
      current: response.pageNumber ,
      total: response.totalItems ,
      pageSize: response.pageSize,
    });

    setLoading(false);
  };
  useEffect(() => {
    getList( pagination.current , pagination.pageSize);
  }, []);


  // Data


  // searchForm
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchForm] = Form.useForm();
  const searchFormSubmit = async () => {
    try {
      const fieldsValue = await searchForm.validateFields();
      const newList = defaultList.filter((item) =>
        item.companyTypeCode?.includes(fieldsValue.code || '') &&
        item.companyTypeName?.includes(fieldsValue.name || '')
      );

      setList(newList);

      message.warning('Tìm kiếm!');
    } catch (error: any) {
      console.log(error);
    }
  };

  const columns: ProColumns<CompanyTypeModel>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: 80,
      readonly: true,
      render: (_, record, index) => <>{(pagination.current - 1) * pagination.pageSize + index + 1}</>,
    },
    {
      title: 'Mã loại hình',
      dataIndex: 'companyTypeCode',
    },
    {
      title: 'Tên loại hình khách hàng',
      dataIndex: 'companyTypeName',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'notice',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      valueType: 'switch',
      render: (text, record, index, action) => {
        if (record.status) {
          return     <Tag icon={<CheckCircleOutlined />} color="success">
            Hoạt động
          </Tag>
        }else {
          return  <Tag icon={<CloseCircleOutlined />} color="error">
            Không hoạt động
          </Tag>
        }
      }
    },
    {
      title: 'Thao tác',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            // @ts-ignore
            action?.startEditable?.(record.id);
          }}
        >
          Sửa
        </a>,
        <a
          key="delete"
          onClick={() => {
            setList(list.filter((item) => item.id !== record.id));
            // @ts-ignore
            deleteCompanyType(record.id)
            message.success('Thành công');
          }}
        >
         Xóa
        </a>,
      ],
    },
  ];


  return (
    <div className='layout-main-conent'>
      <Card bordered={false} style={{ marginBottom: '15px' }} bodyStyle={{ paddingBottom: '0' }}>
        <Form form={searchForm} name='search'>
          <Row gutter={16} justify='end'>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item {...searchFormItemLayout} label='Mã loại hình：' name='name'>
                <Input placeholder='Mã loại hình' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item {...searchFormItemLayout} label='Tên loại hình：' name='herf'>
                <Input placeholder='Tên loại hình' />
              </Form.Item>
            </Col>

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

              </div>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card
        bordered={false}
        // title={
        //   <Button type='primary' onClick={() => setCreateFormVisible(true)}>
        //     Thêm mới
        //   </Button>
        // }
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
        <EditableProTable<CompanyTypeModel>
          rowKey="id"
          scroll={{
            x: 960,
          }}
          recordCreatorProps={
             {
               position: 'bottom',
                record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
              }

          }
          loading={false}
          columns={columns}
          request={async () => ({
            data: list,
            success: true,
          })}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSize: pagination.pageSize,
            current: pagination.current,
            total: pagination.total,
            onChange: (page, pageSize) => {
              getList(page, pageSize);
            },
          }}
          value={list}
          // onChange={setList}
          editable={{
            type: 'multiple',
            saveText: 'Lưu',
            cancelText: 'Hủy',
            deleteText: 'Xóa',
            deletePopconfirmMessage : 'Bạn có chắc chắn muốn xóa không?',
            onlyOneLineEditorAlertMessage: 'Chỉ có thể chỉnh sửa một dòng',
            onlyAddOneLineAlertMessage : 'Chỉ có thể thêm một dòng',
            editableKeys,
            onSave: async (rowKey, data, row) => {
              data.createdBy  = '';
              data.updatedBy = '';
              if(list.filter(item => item.id === rowKey).length > 0){
                await putCompanyType(rowKey.toString() || '', data);
              } else {
              await postCompanyType(data);
              }
              await getList(pagination.current, pagination.pageSize);
              message.success('Thành công');
              // await waitTime(200);
            },
            onDelete: async (rowKeys) => {

                // @ts-ignore
              deleteCompanyType(rowKeys);
              message.success('Thành công');
            },
            onChange: setEditableRowKeys,
          }}
        />
      </Card>
    </div>
  );
}

export default App;

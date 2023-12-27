import {useEffect, useState} from 'react';
import {
  Button,
  Card,
  Checkbox,
  InputNumber,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Radio,
  Space,
  Switch,
  Row,Table,
  Select,
  Upload, Tag
} from 'antd';
import {FormDataType} from '@/apis/models/data';
import {createData} from '@/apis/services/PageService';
import TableForm from '@/components/TableForm/TableForm';
import { useNavigate } from 'react-router-dom';
import FooterToolbar from '@/components/FooterToolbar';
import { v4 as uuidv4 } from 'uuid';
const {TextArea} = Input;
import {
  InboxOutlined,
  EditTwoTone,
  MinusCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import {CompanyTypeModel} from "@/apis/models/CompanyTypeModel";
import {getCompanyType} from "@/apis/services/CompamyTypeService";
import {
  deleteCompanyGroup,
  getCompanyGroup,
  postCompanyGroup,
  putCompanyGroup
} from "@/apis/services/CompamyGroupService";
import {CompanyGroupModel} from "@/apis/models/CompanyGroupModel";
import {getCompany1, postCompany, putCompany} from "@/apis/services/CompamyService";
import {CompanyModel} from "@/apis/models/CompanyModel";
import {ResponseDetailsData} from "@/utils/request";
import {deleteCompanyTypeCompany, postCompanyTypeCompany} from "@/apis/services/CompanyTypeCompany";
import {CompanyAdditionalModel} from "@/apis/models/CompanyAdditionalModel";
import {
  getCompanyAdditional,
  postCompanyAdditional,
  putCompanyAdditional
} from "@/apis/services/CompanyAdditionalService";
import {CompanyCopperationModel} from "@/apis/models/CompanyCopperationModel";
import {
  getCompanyCopperation,
  postCompanyCopperation,
  putCompanyCopperation
} from "@/apis/services/CompanyCopperationService";
import {
  deleteCompanySpecific,
  getCompanySpecific,
  postCompanySpecific,
  putCompanySpecific
} from "@/apis/services/CompanySpecificService";
import {EditableProTable, ProColumns} from "@ant-design/pro-components";
import {CompanyRepresentativeModel} from "@/apis/models/CompanyRepresentativeModel";
import {
  deleteCompanyRepresentative,
  getCompanyRepresentative,
  postCompanyRepresentative,
  putCompanyRepresentative
} from "@/apis/services/CompanyRepresentativeService";
import { useParams } from "react-router-dom";
import {getCompanySystem, postCompanySystem, putCompanySystem} from "@/apis/services/CompanySystemService";
import {CompanySystemModel} from "@/apis/models/CompanySystemModel";
import {
  deleteCompanyDocument,
  getCompanyDocument,
  postCompanyDocument,
  uploadDocument
} from "@/apis/services/CompamyDocumentService";
import {CompanyDocumentModel} from "@/apis/models/CompanyDocumentModel";
const {Dragger} = Upload;


function App() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [data, setData] = useState<any>({} );
  const [coperationId, setCoperationId] = useState<string>('');
  const [specificId, setSpecificId] = useState<string>('');
  const [systemId, setSystemId] = useState<string>('');
  const [additionalId, setAdditionalId] = useState<string>('');
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [list, setList] = useState<CompanyRepresentativeModel[]>([]);
  const [thongTinThemResponse, setThongTinThemResponse] = useState<any>([]);
  const [thongTinThem, setThongTinThem] = useState<any>([]);
  const [typeList, setTypeList] = useState<any>([]);
  const [groupList, setGroupList] = useState<any>([]);
  const [lienHeList, setLienHeList] = useState<any>([]);
  const [documentList, setDocumentList] = useState<CompanyDocumentModel[]>([]);
  const navigate = useNavigate();

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    getAllCompanyType();
    getAllCompanyGroup()
    if(id){
      getCompany(id);
      getRepresentative(id);
      getAdditional(id);
      getCopperation(id);
      getSpecific(id);
      getSystem(id);
      getDocument(id);
    }else {
      console.log('alo')
    }

  }, []);


  const getSpecific = async (id: string) => {
    try {
      const res : any = await getCompanySpecific(id);
      setThongTinThem(res);
      setThongTinThemResponse(res);
    } catch (error: any) {
      console.log(error);
    }
  }


  const getDocument = async (id: string) => {
    try {
      const res : any = await getCompanyDocument(id);
       setDocumentList(res);
    } catch (error: any) {
      console.log(error);
    }
  }

  const getSystem = async (id: string) => {
    try {
      const res : any = await getCompanySystem(id);
      form.setFieldsValue({
        customerType: res.customerType,
        saleStaff: res.saleStaff
      });
      setSystemId(res.id);
    } catch (error: any) {
      console.log(error);
    }
  }

  const getAdditional = async (id: string) => {
    try {
      const res : any = await getCompanyAdditional(id);
      form.setFieldsValue({
        accountBank: res.accountBank,
        bankName: res.bankName,
        // founding: res.founding,
        revenue: res.revenue,
        staffSize: res.staffSize,
        daysOwed: res.daysOwed,
        debtLimit: res.debtLimit,
        customerFrom: res.customerFrom
      });
      setAdditionalId(res.id);
    } catch (error: any) {
      console.log(error);
    }
  }


  const getCopperation = async (id: string) => {
    try {
      const res : any = await getCompanyCopperation(id);
      form.setFieldsValue({
        mou: res.mou,
        status: res.status,
        mouDuration: res.mouDuration,
        cooperationField: res.cooperationField,
        frequenceUse: res.frequenceUse,
        cooperationOther: res.cooperationOther,
        notice: res.notice,
        coordinatingAgent: res.coordinatingAgent,
        product: res.product
      });
      setCoperationId(res.id);
    } catch (error: any) {
      console.log(error);
    }
  }


  const getCompany = async (id: string) => {
    try {
      const company : any = await getCompany1(id);
      setData(company);
      form.setFieldsValue({
        name: company.name,
        code: company.code,
        companyTypeId: company.lstCompanyType.map((item: any) => item.id),
        group: company.group,
        taxCode: company.taxCode,
        field: company.field,
        shortName: company.shortName,
        address: company.address,
        phoneNumber: company.phoneNumber,
        email: company.email,
        groupId: company.groupId,
        website: company.website,
        fax: company.fax,
        description: company.description,
        notice: company.notice,
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  const getRepresentative = async (id: string) => {
    try {
      const res: any = await getCompanyRepresentative(id);
      setList(res);
    } catch (error: any) {
      console.log(error);
    }
  }


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

  const columns: ProColumns<CompanyGroupModel>[] = [
    {
      title: 'Họ tên',
      dataIndex: 'name',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'position',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      valueType: 'select',
      valueEnum: {
        0: {text: 'Nam'},
        1: {text: 'Nữ'},
        2: {text: 'Khác'},
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      valueType: 'digit',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },

    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      valueType: 'switch',
      render: (text, record, index, action) => {
        if (record.status) {
          return <Tag icon={<CheckCircleOutlined/>} color="success">
            Hoạt động
          </Tag>
        } else {
          return <Tag icon={<CloseCircleOutlined/>} color="error">
            Không hoạt động
          </Tag>
        }
      }
    },

    {
      title: 'Ghi chú',
      dataIndex: 'notice',
      valueType: 'textarea',
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
          }}
        >
          Xóa
        </a>,
      ],
    },
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const companyRequest: CompanyModel = {
        id: "1",
        name: values.name,
        code: values.code,
        taxCode: values.taxCode,
        phoneNumber: values.phoneNumber,
        email: values.email,
        field: values.field,
        shortName: values.shortName,
        website: values.website,
        address: "a",
        districtId: "a",
        city: "a",
        groupId: values.groupId,
        notice: values.notice,
      };
      if(!id){
        await handleAddNew(companyRequest, values);
      }else{
        await handleEdit(companyRequest, values);
      }
      // onReset();
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleEdit = async ( companyRequest: CompanyModel, values: any ) => {
    // @ts-ignore

    const companyResponse: ResponseDetailsData = await putCompany( id  , companyRequest);
    const responseMessage = companyResponse.responseMessage;
    if (companyResponse.responseCode === 200) {

      const companyData: any = companyResponse.data;
      const companyID: string = companyData.id
      const AdditionalInformationRequest: CompanyAdditionalModel = {
        accountBank: values.accountBank,
        companyId: id,
        bankName: values.bankName,
        founding: values.founding,
        revenue: values.revenue,
        staffSize: values.staffSize,
        daysOwed: values.daysOwed,
        debtLimit: values.debtLimit,
        customerFrom: values.customerFrom,
      }
      const CopperationRequest: CompanyCopperationModel = {
        mou: values.mou,
        companyId: id,
        status: values.status,
        mouDuration: values.mouDuration,
        cooperationField: values.cooperationField,
        frequenceUse: values.frequenceUse,
        cooperationOther: values.cooperationOther,
        product: values.product,
        coordinatingAgent: values.coordinatingAgent,
      }

      const SystemRequest: CompanySystemModel = {
        companyId: id,
        customerType: values.customerType,
        saleStaff: values.saleStaff,
      }

      const systemResponse: ResponseDetailsData = await putCompanySystem( systemId ,SystemRequest);


      const companyTypeRequest: any = values.companyTypeId
      const typeList: any = data.lstCompanyType;
      for(let i = 0; i < typeList.length; i++){
        await deleteCompanyTypeCompany(id as string , typeList[i].id);
      }

      for (let i = 0; i < companyTypeRequest.length; i++) {
        const typeCompanyTypeRequest: any = {
          companyId: id,
          companyTypeId: companyTypeRequest[i]
        }
        const typeCompanyTypeResponse: ResponseDetailsData = await postCompanyTypeCompany(typeCompanyTypeRequest);
        const responseMessage = typeCompanyTypeResponse.responseMessage;
      }

      const AdditionalInformationResponse: ResponseDetailsData = await putCompanyAdditional(additionalId ,AdditionalInformationRequest);

      const CopperationResponse: ResponseDetailsData = await putCompanyCopperation( coperationId ,CopperationRequest);

      const deleteArr = thongTinThemResponse.filter( (itemA : any) => !thongTinThem.some( (itemB : any) => itemB.id === itemA.id));
      const putArr = thongTinThem.filter((itemB : any) => thongTinThemResponse.some((itemA : any) => itemA.id === itemB.id));
      const postArr = thongTinThem.filter((itemB : any) => !thongTinThemResponse.some((itemA : any) => itemA.id === itemB.id));

      if(deleteArr.length > 0){
        for(let i = 0; i < deleteArr.length; i++){
          await deleteCompanySpecific(deleteArr[i].id);
        }
      }

      if(putArr.length > 0){
        for(let i = 0; i < putArr.length; i++){
          const item = {...putArr[i]} ;
          item.companyId = companyID;
          const CompanySpecificResponse: ResponseDetailsData = await putCompanySpecific( item.id, item);
        }
      }

      if(postArr.length > 0){
        for(let i = 0; i < postArr.length; i++){
          const item = {...postArr[i]} ;
          item.companyId = companyID;
          const CompanySpecificResponse: ResponseDetailsData = await postCompanySpecific(item);
        }
      }


      // for (let i = 0; i < thongTinThem.length; i++) {
      //   const item = {...thongTinThem[i]} ;
      //   item.companyId = companyID;
      //   const CompanySpecificResponse: ResponseDetailsData = await postCompanySpecific(item);
      // }

      message.success(responseMessage);
    } else {
      message.error(responseMessage);
    }


  };


  const handleAddNew = async ( companyRequest: CompanyModel, values: any ) => {
    const companyResponse: ResponseDetailsData = await postCompany(companyRequest);
    const responseMessage = companyResponse.responseMessage;
    if (companyResponse.responseCode === 200) {

      const companyData: any = companyResponse.data;
      const companyID: string = companyData.id
      const AdditionalInformationRequest: CompanyAdditionalModel = {
        accountBank: values.accountBank,
        companyId: companyID,
        bankName: values.bankName,
        founding: values.founding,
        revenue: values.revenue,
        staffSize: values.staffSize,
        daysOwed: values.daysOwed,
        debtLimit: values.debtLimit,
        customerFrom: values.customerFrom,
      }
      const CopperationRequest: CompanyCopperationModel = {
        mou: values.mou,
        companyId: companyID,
        status: values.status,
        mouDuration: values.mouDuration,
        cooperationField: values.cooperationField,
        frequenceUse: values.frequenceUse,
        cooperationOther: values.cooperationOther,
        product: values.product,
        coordinatingAgent: values.coordinatingAgent,

      }
      const companyTypeRequest: any = values.companyTypeId
      for (let i = 0; i < companyTypeRequest.length; i++) {
        const typeCompanyTypeRequest: any = {
          companyId: companyID,
          companyTypeId: companyTypeRequest[i]
        }
        const typeCompanyTypeResponse: ResponseDetailsData = await postCompanyTypeCompany(typeCompanyTypeRequest);
        const responseMessage = typeCompanyTypeResponse.responseMessage;
      }


      const SystemRequest: CompanySystemModel = {
        companyId: companyID,
        customerType: values.customerType,
        saleStaff: values.saleStaff,
      }

      const SystemResponse: ResponseDetailsData = await postCompanySystem(SystemRequest);
      const AdditionalInformationResponse: ResponseDetailsData = await postCompanyAdditional(AdditionalInformationRequest);
      const CopperationResponse: ResponseDetailsData = await postCompanyCopperation(CopperationRequest);
      for (let i = 0; i < thongTinThem.length; i++) {
        const item = {...thongTinThem[i]} ;
        item.companyId = companyID;
        const CompanySpecificResponse: ResponseDetailsData = await postCompanySpecific(item);
      }


      for (let i = 0; i < documentList.length; i++) {
        documentList[i].companyId = companyID;
        const CompanyRepresentativeResponse: ResponseDetailsData = await postCompanyDocument(documentList[i]);
      }

      for (let i = 0; i < list.length; i++) {
        list[i].companyId = companyID;
        const CompanyRepresentativeResponse: ResponseDetailsData = await postCompanyRepresentative(list[i]);
      }

      message.success(responseMessage);
      navigate(`/customer-list/${companyID}`);
    } else {
      message.error(responseMessage);
    }


  };

  const handleAddlist = async (data: CompanyRepresentativeModel) => {
    setList([...list, data]);
    if(id){
      data.companyId = id;
      const CompanyRepresentativeResponse: ResponseDetailsData = await postCompanyRepresentative(data);
    }
  };

  const handeEditList = async ( key : string ,data: CompanyRepresentativeModel) => {
    const newList = list.map((item) => item.id === key ? data : item);
    setList(newList);
    if(id){
      data.companyId = id;
      const CompanyRepresentativeResponse: ResponseDetailsData = await putCompanyRepresentative(key ,data);
    }

    console.log(key, data)
  }

  const handleDeleteList = async (key: string) => {
    setList(list.filter((item) => item.id !== key));
    if(id){
      await deleteCompanyRepresentative(key);
    }
  }

  const handleInputChange = (e: any) => {
    const {id, value} = e.target;
    const thongTinThemTemp = thongTinThem.map( (item: any) => item.id == id ? {
      id,
      title: value
    } : item);
    setThongTinThem(thongTinThemTemp);
  }


  const props = {
    name: 'file',
    multiple: true,
    showUploadList: {
      showDownloadIcon: true,
      showRemoveIcon: true,
    },
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info: any) {
      const {status} = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const handleFileUpload = async (file: any) => {

    console.log('File uploading...', file)
    try {
      // Replace 'YOUR_API_ENDPOINT' with your API endpoint
      const response : any = await uploadDocument(file)

      const url = `https://10.11.10.13:9092/${response.fileUrl}`

      if(!id){
        const document : CompanyDocumentModel = {
          id : uuidv4(),
          documentName: file.name,
          size: file.size,
          path: url,
        }
        setDocumentList([...documentList, document]);
      }else {
        const document : CompanyDocumentModel = {
          documentName: file.name,
          size: file.size,
          path: url,
          companyId: id,
        }
        const documentResponse : any = await postCompanyDocument(document);
        console.log(documentResponse)
        setDocumentList([...documentList, documentResponse.data]);
      }



      // Handle the response accordingly
      console.log('File uploaded:', response.data);
      message.success('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      message.error('File upload failed.');
    }
  };

  const colDocument = [
    {
      title: 'Name',
      dataIndex: 'documentName',
    },
    {
      title: 'Size',
      dataIndex: 'size',
    },
    {
      title: 'URl',
      dataIndex: 'path',
      render: (text: any, record: any) => [
        <Button href={text} disabled={!id}>
          Download file
        </Button>,
      ],
    },
    {
      title: 'Actions',
      dataIndex: 'size',
      render: (text: any, record: any) => [
        <a
          key="delete"
          onClick={() => {
            setDocumentList(documentList.filter((item) => item.id !== record.id));
            if(id) {
              const documentResponse : any = deleteCompanyDocument(record.id);
            }
            // @ts-ignore
          }}
        >
          Xóa
        </a>,
      ],
    },

  ]



  return (
    <div className='layout-main-conent'>
      <Form
        /* hideRequiredMark */
        layout='horizontal'
        name='basic'
        form={form}
        onFinish={onFinish}
        labelCol={{span: 8}}
        labelAlign={'left'}

      >
        <Card bordered={false} title='Thông tin chung' style={{marginBottom: '20px'}}>
          <Row gutter={50}>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Mã khách hàng：'
                name='code'
                rules={[
                  {
                    required: true,
                    message: 'Bắt buộc',
                  },
                ]}
              >
                <Input placeholder='Mã khách hàng'/>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Lĩnh vực：'
                name='field'
              >
                <Input placeholder='Lĩnh vực'/>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Tên đơn vị：'
                name='name'
                rules={[
                  {
                    required: true,
                    message: 'Bắt buộc',
                  },
                ]}
              >
                <Input placeholder='Tên đơn vị'/>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Phân loại khách hàng'
                name='companyTypeId'
                rules={[
                  {
                    required: true,
                    message: 'Bắt buộc',
                  },
                ]}
              >
                <Select placeholder='Chọn' allowClear mode="multiple">
                  {typeList.map((item: CompanyTypeModel) =>
                    <Select.Option value={item.id}>{item.companyTypeName}</Select.Option>
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Tên viết tắt：'
                name='shortName'
              >
                <Input placeholder='Tên viết tắt'/>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Nhóm khách hàng'
                name='groupId'
                rules={[
                  {
                    required: true,
                    message: 'Bắt buộc',
                  },
                ]}
              >
                <Select placeholder='Chọn' allowClear>
                  {groupList.map((item: CompanyGroupModel) =>
                    <Select.Option value={item.id}>{item.groupName}</Select.Option>
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Mã số thuế'
                name='taxCode'
                rules={[
                  {
                    required: true,
                    message: 'Bắt buộc',
                  },
                ]}
              >
                <Input placeholder='Mã số thuế'/>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Mô tả'
                name='notice'
              >
                <TextArea rows={4} placeholder='Mô tả'/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Website：'
                name='website'
              >
                <Input placeholder='Website'/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Email：'
                name='email'
              >
                <Input placeholder='Email'/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Số điện thoại：'
                name='phoneNumber'
              >
                <InputNumber style={{width: '100%'}} placeholder='Số điện thoại'/>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card bordered={false} title='Thông tin liên hệ đại diện' style={{marginBottom: '20px'}}>
          <EditableProTable<CompanyGroupModel>
            rowKey="id"
            scroll={{
              x: 960,
            }}
            recordCreatorProps={
              {
                position: 'bottom',
                record: () => ({id: (Math.random() * 1000000).toFixed(0)}),
              }

            }
            loading={false}
            columns={columns}
            request={async () => ({
              data: list,
              success: true,
            })}
            value={list}
            // onChange={setList}
            editable={{
              type: 'multiple',
              saveText: 'Lưu',
              cancelText: 'Hủy',
              deleteText: 'Xóa',
              deletePopconfirmMessage: 'Bạn có chắc chắn muốn xóa không?',
              onlyOneLineEditorAlertMessage: 'Chỉ có thể chỉnh sửa một dòng',
              onlyAddOneLineAlertMessage: 'Chỉ có thể thêm một dòng',
              editableKeys,
              onSave: async (rowKey, data, row) => {
                data.createdBy = '';
                data.updatedBy = '';
                if (list.filter(item => item.id === rowKey).length > 0) {
                  await handeEditList(rowKey.toString() || '', data);
                } else {
                  await handleAddlist(data);
                }

                // await waitTime(200);
              },
              onDelete: async (rowKeys) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                await handleDeleteList(rowKeys);
              },
              onChange: setEditableRowKeys,
            }}
          />
        </Card>

        <Card bordered={false} title='Thông tin bổ sung' style={{marginBottom: '20px'}}>
          <Row gutter={50}>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Số tài khoản：'
                name='accountBank'
              >
                <Input placeholder='Số tài khoản'/>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Mở tại ngân hàng：'
                name='bankName'
              >
                <Input placeholder='Mở tại ngân hàng'/>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Ngày thành lập：'
                name='founding'
              >
                <DatePicker format={"YYYY-MM-DDTHH:mm:ss.sssZ"}/>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Là khách hàng từ'
                name='customerFrom'
              >
                <Input placeholder='Là khách hàng từ'/>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Doanh thu：'
                name='revenue'
              >
                <InputNumber style={{width: '100%'}} placeholder='Doanh thu'/>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Quy mô nhân sự'
                name='staffSize'
              >
                <InputNumber style={{width: '100%'}} placeholder='Quy mô nhân sự'/>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Số ngày được nợ'
                name='daysOwed'
              >
                <InputNumber style={{width: '100%'}} placeholder='Số ngày được nợ'/>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Hạn múc nợ'
                name='debtLimit'
              >
                <InputNumber style={{width: '100%'}} placeholder='Hạn mức nợ'/>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card bordered={false} title='Thông tin hợp tác' style={{marginBottom: '20px'}}>
          <Row gutter={50}>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Tình trạng：'
                name='status'
                valuePropName="checked"
              >
                <Switch/>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Lĩnh vực hợp tác：'
                name='cooperationField'
              >
                <Input placeholder='Lĩnh vực hợp tác'/>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Ký MOU：'
                name='mou'
              >
                <Radio.Group>
                  <Radio value={true}>Đã ký</Radio>
                  <Radio value={false}>Chưa ký</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Sản phẩm dịch vụ'
                name='product'
              >
                <Input placeholder='Sản phẩm dịch vụ'/>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Thời hạn MOU：'
                name='mouDuration'
              >
                <InputNumber style={{width: '100%'}} placeholder='Thời hạn MOU'/>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Tần suất sử dụng '
                name='frequenceUse'
              >
                <InputNumber style={{width: '100%'}} placeholder='Tần suất sử dụng'/>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Đại lý phối hợp (nếu có)'
                name='cooperationOther'
              >
                <Input placeholder='Đại lý phối hợp'/>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Ghi chú'
                name='coordinatingAgent'
              >
                <Input placeholder='Ghi chú'/>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card bordered={false} title='Tài liệu liên quan (Hợp đồng hoặc các giấy tờ tài liệu hợp tác)'
              style={{marginBottom: '20px'}}>
          <Row gutter={15}>
            <Col span={12}>   <Dragger  name="file"
                                        showUploadList={false}
                                        multiple={false}
                                        customRequest={({ file }) => handleFileUpload(file)}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined/>
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                banned files.
              </p>
            </Dragger></Col>
            <Col span={12} >
              <Table bordered={false} pagination={false} size={'small'} dataSource={documentList} columns={colDocument} />

            </Col>


          </Row>
        </Card>

        <Card bordered={false} title='Thông tin đặc thù(Sở/phòng GD)' style={{marginBottom: '20px'}}
              extra={<Button onClick={() => {
                const thongtinthem = {
                  id: uuidv4(),
                  title: '',
                  description: '',
                }
                if (thongTinThem.length > 0 && thongTinThem[thongTinThem.length - 1].title === '') {
                  message.error('Vui lòng nhập thông tin trước khi thêm mới')
                } else {
                  const list = [...thongTinThem];
                  list.push(thongtinthem);
                  setThongTinThem(list)
                }

              }}>Thêm mới</Button>}>

          <Row gutter={50}>
              {  Array.isArray(thongTinThem) &&
                thongTinThem.map((item: any, index: any) => (

                  <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    wrapperCol={{span: 16}}
                    label={<Input onChange={handleInputChange} value={item.title} id={item.id} prefix={<EditTwoTone/>} bordered={false}
                                  placeholder='Nhập tiêu đề'/>}
                    rules={[
                      {
                        required: true,
                        message: 'Bắt buộc',
                      },
                    ]}
                  >
                    <Space.Compact
                      style={{
                        width: '100%',
                      }}
                    >
                      <Input onChange={(e) => {
                        const list = [...thongTinThem];
                        list[index].description = e.target.value;
                        setThongTinThem(list);
                      }} value={item.description} placeholder='Nhập thông tin'/>

                      <Button type="text" danger onClick={() => {
                        const list = [...thongTinThem];
                        list.splice(index, 1);
                        setThongTinThem(list);
                      }} style={{paddingLeft: '10px'}}>
                        <MinusCircleOutlined
                          style={{fontSize: '20px'}}
                        />
                      </Button>
                    </Space.Compact>
                  </Form.Item>
                  </Col>

                ))
              }
          </Row>
        </Card>

        <Card bordered={false} title='Thông tin hệ thống'>
          <Row gutter={16}>
            <Col lg={12} md={12} sm={24}>
              <Form.Item name='customerType'
                         // rules={[{required: true, message: 'Bắt buộc'}]}
              >
                <Radio.Group>
                  <Radio.Button value={2}>Khách hàng chung</Radio.Button>
                  <Radio.Button value={1}>Khách hàng cá nhân</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label='Nhân viên kinh doanh phụ trách：'
                name='saleStaff'
              >
                <Input placeholder='Nhân viên kinh doanh phụ trách'/>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <FooterToolbar className='text-align-right'>
          <Button type='primary' htmlType='submit' loading={loading}>
            Gửi
          </Button>
          <Button htmlType='button' onClick={onReset} style={{marginLeft: 8}}>
            Làm lại
          </Button>
        </FooterToolbar>
      </Form>
    </div>
  );
}

export default App;

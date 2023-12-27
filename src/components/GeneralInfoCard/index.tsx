import React,{ useState } from 'react';
import { Button, Card, Checkbox, Col, DatePicker, Form, Input, message, Radio, Row, Select, Upload  } from 'antd';
import { FormDataType } from '@/apis/models/data';




const { TextArea } = Input;


const WorksChartCard: React.FC = () => {
    const [form] = Form.useForm();

  return (
    <Card bordered={false} title='Thông tin chung' style={{ marginBottom: '20px' }}>
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
            <Input placeholder='Mã khách hàng' />
          </Form.Item>
        </Col>
        <Col lg={12} md={12} sm={24}>
          <Form.Item
            label='Lĩnh vực：'
            name='a'
          >
            <Input placeholder='Lĩnh vực' />
          </Form.Item>
        </Col>
        <Col lg={12} md={12} sm={24}>
          <Form.Item
            label='Tên đơn vị：'
            name='departmentId'
            rules={[
              {
                required: true,
                message: 'Bắt buộc',
              },
            ]}
          >
            <Input placeholder='Tên đơn vị' />
          </Form.Item>
        </Col>
        <Col lg={12} md={12} sm={24}>
          <Form.Item
            label='Phân loại khách hàng'
            name='customerTypeId'
            rules={[
              {
                required: true,
                message: 'Bắt buộc',
              },
            ]}
          >
            <Select placeholder='Chọn' allowClear>
              <Select.Option value='1'>select1</Select.Option>
              <Select.Option value='2'>select2</Select.Option>
              <Select.Option value='3'>select3</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col lg={12} md={12} sm={24}>
          <Form.Item
            label='Tên viết tắt：'
            name='code'
          >
            <Input placeholder='Tên viết tắt' />
          </Form.Item>
        </Col>
        <Col lg={12} md={12} sm={24}>
          <Form.Item
            label='Nhóm khách hàng'
            name='customerCategoryId'
            rules={[
              {
                required: true,
                message: 'Bắt buộc',
              },
            ]}
          >
            <Select placeholder='Chọn' allowClear>
              <Select.Option value='1'>select1</Select.Option>
              <Select.Option value='2'>select2</Select.Option>
              <Select.Option value='3'>select3</Select.Option>
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
            <Input placeholder='Mã số thuế' />
          </Form.Item>
        </Col>
        <Col lg={12} md={12} sm={24}>
          <Form.Item
            label='Mô tả'
            name='description'
          >
            <TextArea rows={4}  placeholder='Mô tả' />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col lg={12} md={12} sm={24}>
          <Form.Item
            label='Website：'
            name='Website'
          >
            <Input placeholder='Website' />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col lg={12} md={12} sm={24}>
          <Form.Item
            label='Email：'
            name='Email'
          >
            <Input placeholder='Email' />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col lg={12} md={12} sm={24}>
          <Form.Item
            label='Số điện thoại：'
            name='telephone'
          >
            <Input placeholder='Số điện thoại' />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default WorksChartCard;

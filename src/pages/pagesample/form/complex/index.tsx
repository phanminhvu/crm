import { useState } from 'react';
import { Button, Card, Checkbox, Col, DatePicker, Form, Input, message, Radio, Row, Select } from 'antd';
import { FormDataType } from '@/apis/models/data';
import { createData } from '@/apis/services/PageService';
import TableForm from '@/components/TableForm/TableForm';
import FooterToolbar from '@/components/FooterToolbar';

function App() {
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async (values: FormDataType) => {
    setLoading(true);
    try {
      await createData(values);
      message.success('Thành công');
      onReset();
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className='layout-main-conent'>
      <Form
        /* hideRequiredMark */
        layout='vertical'
        name='basic'
        form={form}
        onFinish={onFinish}
      >
        <Card bordered={false} title='Form 1' style={{ marginBottom: '20px' }}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label='Tiêu đề：'
                name='title'
                rules={[
                  {
                    required: true,
                    message: 'Bắt buộc',
                  },
                ]}
              >
                <Input placeholder='Tiêu đề' />
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label='Thời gian'
                name='date'
                rules={[
                  {
                    required: true,
                    message: 'Bắt buộc',
                  },
                ]}
              >
                <DatePicker.RangePicker style={{ width: '100%' }} placeholder={['Từ', 'Đến']} />
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label='Select'
                name='select'
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
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label='Radio' name='radio-group'>
                <Radio.Group>
                  <Radio value='a'>item 1</Radio>
                  <Radio value='b'>item 2</Radio>
                  <Radio value='c'>item 3</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card bordered={false} title='Radio' style={{ marginBottom: '20px' }}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label='Radio' name='radio-button' rules={[{ required: true, message: 'Bắt buộc' }]}>
                <Radio.Group>
                  <Radio.Button value='a'>item 1</Radio.Button>
                  <Radio.Button value='b'>item 2</Radio.Button>
                  <Radio.Button value='c'>item 3</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label='Checkbox' name='checkbox-group'>
                <Checkbox.Group>
                  <Checkbox value='A' style={{ lineHeight: '32px' }}>
                    A
                  </Checkbox>

                  <Checkbox value='B' style={{ lineHeight: '32px' }} disabled>
                    B
                  </Checkbox>

                  <Checkbox value='C' style={{ lineHeight: '32px' }}>
                    C
                  </Checkbox>

                  <Checkbox value='D' style={{ lineHeight: '32px' }}>
                    D
                  </Checkbox>

                  <Checkbox value='E' style={{ lineHeight: '32px' }}>
                    E
                  </Checkbox>

                  <Checkbox value='F' style={{ lineHeight: '32px' }}>
                    F
                  </Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item label='Nội dung' name='remark'>
                <Input.TextArea placeholder='Nội dung' rows={1} />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card bordered={false} title='Danh sách bảng'>
          <Form.Item name='users'>
            <TableForm />
          </Form.Item>
        </Card>

        <FooterToolbar className='text-align-right'>
          <Button type='primary' htmlType='submit' loading={loading}>
            Gửi
          </Button>
          <Button htmlType='button' onClick={onReset} style={{ marginLeft: 8 }}>
            Làm lại
          </Button>
        </FooterToolbar>
      </Form>
    </div>
  );
}

export default App;

import { useState } from 'react';
import { Button, Card, Checkbox, DatePicker, Form, Input, message, Radio, Select } from 'antd';
import { createData } from '@/apis/services/PageService';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 7 },
  },
};

function App() {
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async () => {
    setLoading(true);
    try {
      await createData();
      message.success('Thành công');
      onReset();
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div className='layout-main-conent'>
      <Card bordered={false}>
        <Form
          /* hideRequiredMark */
          name='basic'
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            {...formItemLayout}
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

          <Form.Item
            {...formItemLayout}
            label='Thời gian'
            name='date'
            rules={[
              {
                required: true,
                message: 'Bắt buộc',
              },
            ]}
          >
            <DatePicker.RangePicker
              style={{ width: '100%' }}
              placeholder={['Từ', 'Đến']}
              onChange={(value, string) => {
                console.log(value, string);
              }}
            />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
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

          <Form.Item {...formItemLayout} label='Radio' name='radio1'>
            <Radio.Group>
              <Radio value='a'>item 1</Radio>
              <Radio value='b'>item 2</Radio>
              <Radio value='c'>item 3</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label='Radio'
            name='radio2'
            rules={[{ required: true, message: 'Bắt buộc' }]}
          >
            <Radio.Group>
              <Radio.Button value='a'>item 1</Radio.Button>
              <Radio.Button value='b'>item 2</Radio.Button>
              <Radio.Button value='c'>item 3</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item {...formItemLayout} label='Checkbox' name='checkbox'>
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

          <Form.Item {...formItemLayout} label='Nội dung' name='remark'>
            <Input.TextArea style={{ minHeight: 32 }} placeholder='Nhập nội dung' rows={4} />
          </Form.Item>

          <Form.Item {...submitFormLayout}>
            <Button type='primary' htmlType='submit' loading={loading}>
              Gửi
            </Button>
            <Button htmlType='button' onClick={onReset} style={{ marginLeft: 8 }}>
              Làm lại
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default App;

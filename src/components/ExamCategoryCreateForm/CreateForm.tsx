import React from 'react';
import { FormInstance } from 'antd/lib/form';
import { Modal, Form, Input, Button, message } from 'antd';
import { DepartmentModel } from '@/apis/models/DepartmentModel';

interface CreateFormProps {
  visible: boolean;
  values?: Partial<DepartmentModel>;
  onSubmitLoading: boolean;
  onSubmit: (values: Omit<DepartmentModel, 'id'>, form: FormInstance) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { visible, values, onSubmit, onSubmitLoading, onCancel } = props;

  const formVals: Omit<DepartmentModel, 'id'> = {
    name: values?.name || '',
    code: values?.code || '',
  };

  const [form] = Form.useForm();

  const onFinish = async () => {
    try {
      const fieldsValue = await form.validateFields();
      onSubmit({ ...formVals, ...fieldsValue }, form);
    } catch (error) {
      message.warning('Hãy nhập đủ các trường');
    }
  };

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      title='Sửa'
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key='back' onClick={() => onCancel()}>
          Hủy
        </Button>,
        <Button key='submit' type='primary' htmlType='submit' loading={onSubmitLoading} onClick={() => onFinish()}>
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={form}
        name='createform'
        labelCol={{ span: 4 }}
        initialValues={{
          name: formVals.name,
          code: formVals.code,
        }}
      >
        <Form.Item
          label='Tên'
          name='name'
          rules={[
            {
              required: true,
              message: 'Bắt buộc',
            },
          ]}
        >
          <Input placeholder='Tên' />
        </Form.Item>
        <Form.Item
          label='Code'
          name='code'
          rules={[
            {
              required: true,
              message: 'Bắt buộc',
            },
          ]}
        >
          <Input placeholder='Tên' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateForm;

import { useState } from 'react';
import axios from 'axios';
import { Button, DatePicker, Form, Input, Modal, notification } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const CreateUser = ({ users, setUsers }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreate = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('/users/', values);
      setUsers([...users, response.data]);
      notification.success({
        message: 'SUCCESS',
        description: 'User created successfully',
      });
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'ERROR',
        description: 'An error occurred while creating the user',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        icon={<PlusCircleOutlined />}
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ width: '15%' }}>
        Create User
      </Button>
      <Modal
        title="Create User"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        okButtonProps={{ loading }}>
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item
            name="distinguished_name"
            label="Distinguished Name"
            rules={[{ required: true, message: 'Please input the distinguished name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="object_sid"
            label="ObjectSid"
            rules={[{ required: true, message: 'Please input the object sid!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="nt_security_descriptor"
            label="ntSecurityDescriptor"
            rules={[{ required: true, message: 'Please input the nt security descriptor!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="service_principal_name"
            label="ServicePrincipalName"
            rules={[{ required: true, message: 'Please input the service principal name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="when_created"
            label="Created At"
            rules={[{ required: true, message: 'Please input the creation date!' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

CreateUser.propTypes = {
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired,
};

export default CreateUser;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Spin, Flex, Typography, Popconfirm, notification, theme } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import CreateUser from './CreateUser';

const UsersPage = () => {
  const { token } = theme.useToken();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchUsers(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchUsers = async (page, pageSize) => {
    setLoading(true);
    try {
      const response = await axios.get('/users/', {
        params: {
          page: page,
          page_size: pageSize,
        },
      });
      setUsers(response.data.results);
      setPagination({
        ...pagination,
        total: response.data.count,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (distinguished_name) => {
    setLoading(true);
    try {
      await axios.delete(`/users/${distinguished_name}/`);
      setUsers(users.filter((user) => user.distinguished_name !== distinguished_name));
      notification.success({
        message: 'SUCCESS',
        description: 'User deleted successfully',
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'ERROR',
        description: 'An error occurred while deleting the user',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (newPagination) => {
    setPagination({
      ...pagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
  };

  const columns = [
    {
      title: 'Distinguished Name',
      dataIndex: 'distinguished_name',
      key: 'distinguished_name',
      render: (text) => <Link to={`/users/${text}`}>{text}</Link>,
    },
    {
      title: 'ObjectSid',
      dataIndex: 'object_sid',
      key: 'object_sid',
    },
    {
      title: ' ntSecurityDescriptor',
      dataIndex: 'nt_security_descriptor',
      key: 'nt_security_descriptor',
    },
    {
      title: ' servicePrincipalName',
      dataIndex: 'service_principal_name',
      key: 'service_principal_name',
    },
    {
      title: ' Created At',
      dataIndex: 'when_created',
      key: 'when_created',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      key: 'action',
      render: (text, record) => (
        <Popconfirm
          title="Are you sure to delete this user?"
          onConfirm={() => handleDelete(record.distinguished_name)}
          okText="Yes"
          cancelText="No">
          <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <Flex vertical justify="center" gap={token.size} style={{ padding: token.padding }}>
      <Typography.Title level={2} align="center">
        Users
      </Typography.Title>
      <CreateUser users={users} setUsers={setUsers} />
      <Spin spinning={loading}>
        <Table
          dataSource={users}
          columns={columns}
          rowKey="distinguished_name"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            pageSizeOptions: ['3', '10', '50'],
          }}
          onChange={handleTableChange}
        />
      </Spin>
    </Flex>
  );
};

export default UsersPage;

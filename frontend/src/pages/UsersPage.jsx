import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Spin, Flex, Typography, Popconfirm, notification, theme } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import CreateUser from './CreateUser';

const UsersPage = () => {
  const { token } = theme.useToken();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        // TODO: Add pagination support
        const response = await axios.get('/users/');
        setUsers(response.data.results);
        setTotalPages(Math.ceil(response.data.count / pageSize));
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePageChange = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`/users/?page=${page}&pageSize=${pageSize}`);
      setUsers(response.data.results);
      setTotalPages(Math.ceil(response.data.count / pageSize));
      setPage(page);
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
        <Table dataSource={users} columns={columns} rowKey="distinguished_name" />
      </Spin>
    </Flex>
  );
};

export default UsersPage;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Spin, Flex, Typography, Popconfirm, notification, theme } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import CreateComputer from './CreateComputer';

const ComputersPage = () => {
  const { token } = theme.useToken();
  const [computers, setComputers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchComputers(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchComputers = async (page, pageSize) => {
    setLoading(true);
    try {
      const response = await axios.get('/computers/', {
        params: {
          page: page,
          page_size: pageSize,
        },
      });
      setComputers(response.data.results);
      setPagination({
        ...pagination,
        total: response.data.count,
      });
    } catch (error) {
      console.error('Error fetching computers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (distinguished_name) => {
    setLoading(true);
    try {
      await axios.delete(`/computers/${distinguished_name}/`);
      setComputers(computers.filter((computer) => computer.distinguished_name !== distinguished_name));
      notification.success({
        message: 'SUCCESS',
        description: 'Computer deleted successfully',
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'ERROR',
        description: 'An error occurred while deleting the computer',
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
      render: (text) => <Link to={`/computers/${text}`}>{text}</Link>,
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
          title="Are you sure to delete this computer?"
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
        Computers
      </Typography.Title>
      <CreateComputer computers={computers} setComputers={setComputers} />
      <Spin spinning={loading}>
        <Table
          dataSource={computers}
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

export default ComputersPage;

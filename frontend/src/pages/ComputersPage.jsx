import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Spin, Flex, Typography, Popconfirm, notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const ComputersPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [computers, setComputers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchComputers = async () => {
      try {
        // TODO: Add pagination support
        const response = await axios.get('/computers/');
        console.log(response.data);
        setComputers(response.data.results);
        setTotalPages(Math.ceil(response.data.count / pageSize));
      } catch (error) {
        console.error('Error fetching computers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComputers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePageChange = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`/computers/?page=${page}&pageSize=${pageSize}`);
      setComputers(response.data.results);
      setTotalPages(Math.ceil(response.data.count / pageSize));
      setPage(page);
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
    <Flex vertical justify="center">
      <Typography.Title level={2} align="center">
        Computers
      </Typography.Title>
      <Spin spinning={loading}>
        <Table dataSource={computers} columns={columns} rowKey="distinguished_name" />
      </Spin>
    </Flex>
  );
};

export default ComputersPage;

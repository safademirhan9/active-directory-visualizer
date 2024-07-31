import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Spin, Flex, Typography } from 'antd';

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

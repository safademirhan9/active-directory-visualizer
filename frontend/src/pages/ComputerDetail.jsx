import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Card, Typography, Spin, Alert, Descriptions, Divider, Flex } from 'antd';

const ComputerDetail = () => {
  const { DistinguishedName } = useParams();
  const {
    data: computer,
    isLoading,
    error,
  } = useQuery(['computer', DistinguishedName], () => fetchComputerById(DistinguishedName));

  const fetchComputerById = async (id) => {
    const response = await axios.get(`/computers/${id}`);
    return response.data;
  };

  if (isLoading)
    return (
      <Flex justify="center" align="middle">
        <Spin size="large" />
      </Flex>
    );
  if (error) return <Alert message="Error fetching data" type="error" />;

  return (
    <Spin spinning={isLoading}>
      <Card
        title={<Typography.Title level={3}>Computer Details</Typography.Title>}
        bordered={false}
        style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Distinguished Name">{computer.distinguished_name}</Descriptions.Item>
          <Descriptions.Item label="ObjectSid">{computer.object_sid}</Descriptions.Item>
          <Descriptions.Item label="ntSecurityDescriptor">{computer.nt_security_descriptor}</Descriptions.Item>
          <Descriptions.Item label="Service Principal Name">{computer.service_principal_name}</Descriptions.Item>
          <Descriptions.Item label="Created At">{new Date(computer.when_created).toLocaleString()}</Descriptions.Item>
        </Descriptions>
        <Divider />
        <Typography.Text>Here you can find detailed information about the computer.</Typography.Text>
      </Card>
    </Spin>
  );
};

export default ComputerDetail;

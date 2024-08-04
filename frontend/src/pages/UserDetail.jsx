import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Card, Typography, Spin, Alert, Descriptions, Divider, Flex } from 'antd';

const UserDetail = () => {
  const { DistinguishedName } = useParams();
  const {
    data: user,
    isLoading,
    error,
  } = useQuery(['user', DistinguishedName], () => fetchUserById(DistinguishedName));

  const fetchUserById = async (id) => {
    const response = await axios.get(`/users/${id}`);
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
        title={<Typography.Title level={3}>User Details</Typography.Title>}
        bordered={false}
        style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Distinguished Name">{user.distinguished_name}</Descriptions.Item>
          <Descriptions.Item label="ObjectSid">{user.object_sid}</Descriptions.Item>
          <Descriptions.Item label="ntSecurityDescriptor">{user.nt_security_descriptor}</Descriptions.Item>
          <Descriptions.Item label="Service Principal Name">{user.service_principal_name}</Descriptions.Item>
          <Descriptions.Item label="Created At">{new Date(user.when_created).toLocaleString()}</Descriptions.Item>
        </Descriptions>
        <Divider />
        <Typography.Text>Here you can find detailed information about the user.</Typography.Text>
      </Card>
    </Spin>
  );
};

export default UserDetail;

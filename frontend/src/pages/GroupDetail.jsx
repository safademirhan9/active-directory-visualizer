import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Card, Typography, Spin, Alert, Descriptions, Divider, Flex } from 'antd';

const GroupDetail = () => {
  const { DistinguishedName } = useParams();
  const {
    data: group,
    isLoading,
    error,
  } = useQuery(['group', DistinguishedName], () => fetchGroupById(DistinguishedName));

  const fetchGroupById = async (id) => {
    const response = await axios.get(`/groups/${id}`);
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
        title={<Typography.Title level={3}>Group Details</Typography.Title>}
        bordered={false}
        style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Distinguished Name">{group.distinguished_name}</Descriptions.Item>
          <Descriptions.Item label="ObjectSid">{group.object_sid}</Descriptions.Item>
          <Descriptions.Item label="ntSecurityDescriptor">{group.nt_security_descriptor}</Descriptions.Item>
          <Descriptions.Item label="Service Principal Name">{group.service_principal_name}</Descriptions.Item>
          <Descriptions.Item label="Created At">{new Date(group.when_created).toLocaleString()}</Descriptions.Item>
        </Descriptions>
        <Divider />
        <Typography.Text>Here you can find detailed information about the group.</Typography.Text>
      </Card>
    </Spin>
  );
};

export default GroupDetail;

import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

const GroupDetail = () => {
  const { id } = useParams();
  const { data: group, isLoading, error } = useQuery(['group', id], () => fetchGroupById(id));

  const fetchGroupById = async (id) => {
    const response = await axios.get(`/groups/${id}`);
    return response.data;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div>
      <h1>Group Details</h1>
      <p>Distinguished Name: {group.distinguished_name}</p>
      <p>ObjectSid: {group.ObjectSid}</p>
      {/* Add more group details here */}
    </div>
  );
};

export default GroupDetail;

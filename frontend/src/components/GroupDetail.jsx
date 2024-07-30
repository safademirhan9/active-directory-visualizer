import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchGroupById } from '../api/groups';

const GroupDetail = () => {
  const { id } = useParams();
  const { data: group, isLoading, error } = useQuery(['group', id], () => fetchGroupById(id));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div>
      <h1>Group Details</h1>
      <p>DistinguishedName: {group.DistinguishedName}</p>
      <p>ObjectSid: {group.ObjectSid}</p>
      {/* Add more group details here */}
    </div>
  );
};

export default GroupDetail;

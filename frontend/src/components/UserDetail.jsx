import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchUserById } from '../api/users';

const UserDetail = () => {
  const { id } = useParams();
  const { data: user, isLoading, error } = useQuery(['user', id], () => fetchUserById(id));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div>
      <h1>User Details</h1>
      <p>Distinguished Name: {user.distinguished_name}</p>
      <p>ObjectSid: {user.ObjectSid}</p>
      {/* Add more user details here */}
    </div>
  );
};

export default UserDetail;

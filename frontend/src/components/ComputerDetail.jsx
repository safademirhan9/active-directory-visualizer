import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchComputerById } from '../api/computers';

const ComputerDetail = () => {
  const { id } = useParams();
  const { data: computer, isLoading, error } = useQuery(['computer', id], () => fetchComputerById(id));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div>
      <h1>Computer Details</h1>
      <p>DistinguishedName: {computer.DistinguishedName}</p>
      <p>ObjectSid: {computer.ObjectSid}</p>
      {/* Add more computer details here */}
    </div>
  );
};

export default ComputerDetail;

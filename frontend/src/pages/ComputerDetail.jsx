import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

const ComputerDetail = () => {
  const { id } = useParams();
  const { data: computer, isLoading, error } = useQuery(['computer', id], () => fetchComputerById(id));

  const fetchComputerById = async (id) => {
    const response = await axios.get(`/computers/${id}`);
    return response.data;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div>
      <h1>Computer Details</h1>
      <p>Distinguished Name: {computer.distinguished_name}</p>
      <p>ObjectSid: {computer.ObjectSid}</p>
      {/* Add more computer details here */}
    </div>
  );
};

export default ComputerDetail;

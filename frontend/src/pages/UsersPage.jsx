import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

const UsersPage = () => {
  const [page, setPage] = useState(1);
  // const [pageSize] = useState(10);

  // Custom API function example
  const getUsers = async () => {
    const response = await axios.get('/users/');
    return response.data;
  };

  const { data, error, isLoading } = useQuery('users', getUsers);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  const { results: users, totalPages } = data;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.distinguished_name}>
            <Link to={`/users/${user.distinguished_name}`}>{user.distinguished_name}</Link>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setPage((old) => Math.max(old - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span> Page {page} </span>
        <button onClick={() => setPage((old) => (data.hasNextPage ? old + 1 : old))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersPage;

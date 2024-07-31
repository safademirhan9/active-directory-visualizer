import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { fetchComputers } from '../api/computers';

const ComputersPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10); // You can change the page size if needed

  const { data, isLoading, error } = useQuery(['computers', page, pageSize], () => fetchComputers(page, pageSize), {
    keepPreviousData: true, // Keeps previous data while fetching new data
  });

  console.log;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  const { results: computers, totalPages } = data;

  return (
    <div>
      <h1>Computers</h1>
      <ul>
        {computers.map((computer) => (
          <li key={computer.distinguished_name}>
            <Link to={`/computers/${computer.distinguished_name}`}>{computer.distinguished_name}</Link>
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

export default ComputersPage;

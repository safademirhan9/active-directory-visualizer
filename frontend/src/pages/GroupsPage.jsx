import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchGroups } from '../api/groups';

const GroupsPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const { data, isLoading, error } = useQuery(['groups', page, pageSize], () => fetchGroups(page, pageSize), {
    keepPreviousData: true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  const { results: groups, totalPages } = data;

  return (
    <div>
      <h1>Groups</h1>
      <ul>
        {groups.map((group) => (
          <li key={group.DistinguishedName}>
            <Link to={`/groups/${group.DistinguishedName}`}>{group.DistinguishedName}</Link>
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

export default GroupsPage;

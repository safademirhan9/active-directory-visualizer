import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ComputersPage from './pages/ComputersPage';
import GroupsPage from './pages/GroupsPage';
import UsersPage from './pages/UsersPage';
import ComputerDetail from './pages/ComputerDetail';
import UserDetail from './pages/UserDetail';
import GroupDetail from './pages/GroupDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/computers" element={<ComputersPage />} />
        <Route path="/computers/:DistinguishedName" element={<ComputerDetail />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:DistinguishedName" element={<UserDetail />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/groups/:DistinguishedName" element={<GroupDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

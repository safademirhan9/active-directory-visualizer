import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ComputersPage from './pages/ComputersPage';
import GroupsPage from './pages/GroupsPage';
import UsersPage from './pages/UsersPage';
import ComputerDetail from './components/ComputerDetail';
import UserDetail from './components/UserDetail';
import GroupDetail from './components/GroupDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/computers" element={<ComputersPage />}>
          <Route path=":DistinguishedName" element={<ComputerDetail />} />
        </Route>
        <Route path="/users" element={<UsersPage />}>
          <Route path="/users/:DistinguishedName" element={<UserDetail />} />
        </Route>
        <Route path="/groups" element={<GroupsPage />}>
          <Route path=":DistinguishedName" element={<GroupDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

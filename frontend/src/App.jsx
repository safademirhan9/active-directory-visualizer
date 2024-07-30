import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComputersPage from './pages/ComputersPage';
import GroupsPage from './pages/GroupsPage';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/computers" component={ComputersPage} />
        <Route path="/groups" component={GroupsPage} />
        <Route path="/users" component={UsersPage} />
      </Routes>
    </Router>
  );
}

export default App;

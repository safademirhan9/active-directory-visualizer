import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
        <Route exact path="/computers" component={ComputersPage} />
        <Route path="/computers/:DistinguishedName" component={ComputerDetail} />
        <Route exact path="/users" component={UsersPage} />
        <Route path="/users/:DistinguishedName" component={UserDetail} />
        <Route exact path="/groups" component={GroupsPage} />
        <Route path="/groups/:DistinguishedName" component={GroupDetail} />
        <Route path="/" component={() => <div>Welcome to the AD Viewer</div>} />
      </Routes>
    </Router>
  );
}

export default App;

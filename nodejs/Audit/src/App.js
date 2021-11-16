import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Sidebar from './Sidebar';
import Login from './components/login';
import SignUp from './components/signUp';
import Pvt from './components/Pvt';

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/" exact component={Login} />
        <Pvt path="/audit-tool" component={Sidebar} />
      </Switch>
    </Router>
  );
}

export default App;

import Signup from  './components/pages/signup';
import Mainscreen from './components/pages/mainscreen'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // Redirect,
} from 'react-router-dom';


export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Signup to="/signup" />
        </Route>
        <Route path="/mainscreen">
          <Mainscreen />
        </Route>
      </Switch>
    </Router>
  );
}


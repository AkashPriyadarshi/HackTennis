import React from 'react';
import './App.css';
import { createBrowserHistory } from 'history';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Landing from './component/Landing'
function App() {
  const history = createBrowserHistory();
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={Landing} />
          </Switch>
        </Router>
      </div>
    );
}

export default App;

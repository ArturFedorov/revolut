import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/root/header/Header';
import HomeView from './components/views/HomeView';

class App extends React.Component {
  render() {
    return (
      <div className={'app'}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <HomeView />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

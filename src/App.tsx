import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/root/header/Header';
import HomeView from './components/views/HomeView';
import ExchangeView from './components/views/ExchangeView/ExchangeView';

class App extends React.Component {
  render() {
    return (
      <div className={'app'}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route path="/exchange/:currency/:exchangeCurrency" component={ExchangeView} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

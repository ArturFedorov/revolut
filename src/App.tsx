import React from 'react';
import './App.scss';
import {AuthService} from './api/AuthService';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';

class App extends React.Component {
  componentDidMount() {
   //  const { location: { search } } = this.props as any;
    // const {code} = useParams();
    // console.log(() => useParams())
    console.log((this.props as any));
   // const { code, state } = useParams();
    // console.log(code, state);
    // if (code && state) {
    //   AuthService.requestToken({ code, state })
    //     .then((result) => console.log(result.data));
    // }
  }

  login () {
    console.log('hekk');
    AuthService.login()
        .then((url) => (window.location.href = url.data));
  }

  render() {
      return (
          <Router>
            <Switch>
              <Route exact path="/">
                <div className="App">
                  hello
                  <button onClick={ this.login }>Login</button>
                </div>
              </Route>
            </Switch>
          </Router>
      );
  }
}

export default App;

import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import index from './components/test/index';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Switch>
            <Route exact path="/" component={index} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;

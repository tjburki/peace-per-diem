import React from 'react';
import './App.css';
import Body from './components/body/body';
import Header from './components/header/header';
import { useAuth0 } from "./react-auth0-spa";
import history from './utils/history';
import { Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/home/home';
import Profile from './components/profile/profile';
import Footer from './components/footer/footer';

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router history={history}>
        <Header />
        <Body>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/profile" component={Profile} />
            </Switch>
        </Body>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

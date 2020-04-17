import React from 'react';
import './App.css';
import Body from './components/body/body';
import Header from './components/header/header';
import { useAuth0 } from "./react-auth0-spa";
import history from './utils/history';
import { Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import Footer from './components/footer/footer';
import Loading from './components/loading/loading';
import { GiganticText } from './components/layout/text/text';

function App() {
  const { loading } = useAuth0();

  return (
    <div className="App">
      <Router history={history}>
        <Header />
        <Body>
            {
              loading
                ? <GiganticText><Loading /></GiganticText>
                : <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/profile" component={Profile} />
                  </Switch>
            }
        </Body>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

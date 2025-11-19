//Packages
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

//Helpers
import { useAuth0 } from "./auth/auth0";
import history from './utils/history';

//Pages
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import Login from './pages/login/login';
import Logout from './pages/logout/logout';

//Components
import Header from './components/header/header';
import Body from './components/body/body';
import Footer from './components/footer/footer';
import Loading from './components/loading/loading';
import { GiganticText } from './components/layout/text/text';

//Styles
import './App.scss';

function App() {
  const { loading } = useAuth0();

  return (
    <div className='App'>
      <Router history={history}>
        <Header />
        <Body>
            {
              loading
                ? <GiganticText><Loading /></GiganticText>
                : <Switch>
                    <Route path='/' component={Home} exact />
                    <Route path='/profile' component={Profile} />
                    <Route path='/login' component={Login} />
                    <Route path='/logout' component={Logout} />
                  </Switch>
            }
        </Body>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
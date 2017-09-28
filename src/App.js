import React from 'react';
import io from 'socket.io-client';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react'
import Landing from './components/Pages/landing';
import Dashboard from './components/Pages/dashboard';
import Explore from './components/Pages/explore';
import Create from './components/Pages/createProject';
import Project from './components/Pages/project';
import Profile from './components/Pages/userProfile';
import CohortLogin from './components/Pages/cohortLogin';
import Footer from './components/Common/footer';
import './App.css';
import axios from 'axios';
// import '../semantic/dist/semantic.min.css';

const socket = io();
socket.on('connect', () => console.log('Socket connected.'));

//function checking github auth
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    true ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

axios.get('../auth/checkLoggedIn').then(res=>  console.log(res.data.login))

const App = () =>
  <Router>
    <div className='Main'>
      <div className='Main-content'>
        <Route exact path='/' component={Landing} />
        <PrivateRoute exact path='/:cohort/explore' component={Explore} />
        <PrivateRoute exact path='/:cohort/create' component={Create} />
        <PrivateRoute path='/:cohort/:username/profile' component={Profile} />
        <PrivateRoute path='/:cohort/:username/dashboard' component={Dashboard} />
        <PrivateRoute path='/:cohort/:username/app/:project' component={Project} />
        <PrivateRoute path='/auth/github' component={CohortLogin} />
      </div>
      <Footer />
    </div>
  </Router>;

export default App;

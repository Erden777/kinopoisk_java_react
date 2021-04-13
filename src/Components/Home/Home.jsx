import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main'
import Login from '../LoginForm/SignIn'
import Register from '../Register/Register'
import Admin from '../AdminPage/Dashboard'

const categories = [
  {
    id: 1,
    name: "Sport"
  },
  {
    id: 3,
    name: "Technology"
  },
  {
    id: 2,
    name: "Political"
  }
];


function Home(props){

    return (
        <>
        <Header />
        <Container style={{minHeight:"85vh"}}>
        <Switch>
            <Route exact path="/">
                <Main/>
              </Route>
          </Switch>
          <Switch>
              <Route exact path="login">
                <Login/>
              </Route>
              </Switch>
              
        </Container>
      <Footer/>
    </>
    );
}

export default Home;
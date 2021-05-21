import './App.css';
import Button from '@material-ui/core/Button';
import Home from './Components/Home/Home'
import Header from './Components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router';
import Admin from './Components/AdminPage/Dashboard';
import Main from './Components/Main/Main';
import Login from './Components/LoginForm/SignIn';
import Register from './Components/Register/Register';
import {createContext, useState} from "react";
import { Container } from "react-bootstrap";
import Footer from './Components/Footer/Footer';
import Profile from './Components/Profile/Profile'
import { useCookies } from "react-cookie";
import MovieDetails from './Components/Main/MovieDetails';
import MovieList from './Components/Main/MovieList';

export const AuthContext = createContext();
export const UserDataContext = createContext();

function App() {
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
  const [userData, setuserData] = useState([]);
  const [search_data, setSearch_data] = useState([])
  return (
    <AuthContext.Provider value={{cookieJWT, setCookieJWT, removeCookieJWT}}>
    <UserDataContext.Provider value={{userData, setuserData}}>
      <Switch>
        <Route exact path="/admin">
            <Admin/>
        </Route>

        <Route exact path="/admin/users">
            <Admin/>
        </Route>
        <Route exact path="/admin/users/userId">
            <Admin/>
        </Route>

        <Route exact path="/admin/movies">
            <Admin/>
        </Route>
        <Route exact path="/admin/movies/:movieId">
            <Admin/>
        </Route>
        
        <Route exact path="/admin/genre">
            <Admin/>
        </Route>

        <Route exact path="/admin/genre/:genreID">
            <Admin/>
        </Route>
        <Route exact path="/admin/actors">
            <Admin/>
        </Route>

        <Route exact path="/admin/actors/:actorId">
            <Admin/>
        </Route>

        <Route exact path="/admin/country">
            <Admin/>
        </Route>

        <Route exact path="/admin/country/:countryID">
            <Admin/>
        </Route>

      </Switch>

        <Switch>
            <Route exact path="/">
            <Header  setSearch_data={setSearch_data}
                      search_data={search_data}/>
               <Container style={{minHeight:"85vh"}}>
                <Main setSearch_data={setSearch_data}
                      search_data={search_data}/>
                </Container>
              </Route>

              <Route exact path="/movie/:MovieId">
            <Header  />
               <Container style={{minHeight:"85vh"}}>
                <MovieDetails />
                </Container>
              </Route>

              <Route exact path="/movie/genre/:GenreId">
            <Header  />
               <Container style={{minHeight:"85vh"}}>
                <MovieList />
                </Container>
              </Route>

              

              <Route exact path="/login">
              <Header />
              <Container style={{minHeight:"85vh"}}>
                <Login/>
                </Container>
              </Route>

              <Route exact path="/register">
              <Header />
              <Container style={{minHeight:"85vh"}}>
                <Register/>
                </Container>
              </Route>

              <Route exact path="/profile">
              <Header />
              <Container style={{minHeight:"85vh"}}>
                <Profile/>
                </Container>
              </Route>
        </Switch>
      <Footer/>
    </UserDataContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;

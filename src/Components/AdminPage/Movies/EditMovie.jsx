import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Card} from 'react-bootstrap'
import Select from '@material-ui/core/Select'
import {useCookies} from 'react-cookie';
import { Link, NavLink, useParams} from "react-router-dom";
import {
    FormControl,
    InputLabel,
    Select as MuiSelect,
    FormHelperText,
  } from "@material-ui/core";
  import Chip from '@material-ui/core/Chip';
  import { useTheme } from '@material-ui/core/styles';
  import Input from '@material-ui/core/Input';
  
  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  // Generate Order Data
  function createData(id, name,date, country, height, amount) {
    return {id, name, date, country, height, amount };
  }
  
  
  function preventDefault(event) {
    event.preventDefault();
  }
  
  
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function getStyles(name, personName, theme) {
          return {
            fontWeight:
              personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
          };
        }

export default function EditMovie() {
  let {movieId} = useParams();
  const[id, setId] = useState(movieId);
  const[countryId, setcountryId] = useState("")
  const[countryName, setcountryName] = useState("")
  const[fullname, setfullname] = useState("")
  const[age, setAge] = useState("")
  const[picture_url, setPicture_url] = useState("")
  const[data, setdata] = useState([]);
  const [ActorId, setActorId] = useState("");
  const [allCountries, setallCountries] = useState([]);
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);
  const[newActor, setNewActor] = useState([])
  const[newmovieId, setnewmovieId] = useState("")

  const PrictureChange = (event) => {
    setPicture_url(event.target.value);
  };  

  const fullnameChange = (event) => {
    setfullname(event.target.value);
  };  

  const AgeChange = (event) => {
    setAge(event.target.value);
  };  
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [actors, setActors] = useState([]);
  const [movielist, setmovielist] = useState([]);
  const [actorlist, setactorlist] = useState([]);
  const [genrelist, setgenrelist] = useState([]);
  const [countrylist, setcountrylist] = useState([]);
  const [newmovie, setnewmovie] = useState("");
  const[name, setname] = useState("")
  const[description, setdescription] = useState("")
  const[income, setincome] = useState("")
  const[producer, setproducer] = useState("")
  const[small_picture, setsmall_picture] = useState("")
  const[picture_3, setpicture_3] = useState("")
  const[large_picture, setlarge_picture] = useState("")
  const[url_video, seturl_video] = useState("")
  const[director, setdirector] = useState("")
  const [date, setdate] = useState("")
  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [movie, setMovie] = useState({});

  const handleChange1 = (event) => {
    setPersonName(event.target.value);
  };

  const DirectorChange = (event) =>{
    setdirector(event.target.value)
  }

  const handleActorChange = (event) => {
    setActors(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };

  const NameChange = (event) => {
    setname(event.target.value);
  };  

  const DescriptionChange = (event) => {
    setdescription(event.target.value);
  };
  
  const incomeChange = (event) => {
    setincome(event.target.value);
  }; 

  const producerChange = (event) => {
    setproducer(event.target.value)
  };

  const url_videoChange = (event) => {
    seturl_video(event.target.value)
  };

  const large_prictureChange = (event) => {
    setlarge_picture(event.target.value)
  };

  const small_pictureChange = (event) => {
    setsmall_picture(event.target.value)
  };

  const picture_Change = (event) => {
    setpicture_3(event.target.value)
  } 


  const handleClickOpen = (row) => {
    setMovie(row);
    setOpen(true);
  };

  const handleClickOpenAdd = (row) => {
    // setActor(row);
    setOpenAdd(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const DateChange = (event) => {
    setdate(event.target.value)
  }
  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const CountryhandleChange = (event) =>{
    setcountryId(event.target.value)
  }

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  const SaveMovieSubmit = event =>{
    
          const movie = {
                    'id': data.id,
                    'name':name, 'description': description,
                    'producer':producer, 'director': director, 
                    'income':income, 'small_picture': small_picture,
                    'large_picture': large_picture, 'picture_3': picture_3,
                    'url_video': url_video, 'country': countryId,
                    'actors': actors, 'genres': personName, 'year':date
                        }
    console.log(movie)
    SaveMovie(movie)
    // loadCards()
  };
  async function getActors(){
          const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
          let response = await fetch("http://localhost:8000/api/actor/allActors", {
              method:'GET',
              headers: {
                "Content-Type": "application/json",
                "Authorization": bearer
              }
          });
          let tabledata = await response.json();
          console.log(tabledata)
          setactorlist(tabledata);
          setActorId("")
      }

  async function getGenres(){
          const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
          let response = await fetch("http://localhost:8000/genre/allgenre", {
              method:'GET',
              headers: {
                "Content-Type": "application/json",
                "Authorization": bearer
              }
          });
          let tabledata = await response.json();
          console.log(tabledata)
          setgenrelist(tabledata);
      }

  async function getCountries(){
          const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
          let response = await fetch("http://localhost:8000/country/allcountries", {
              method:'GET',
              headers: {
                "Content-Type": "application/json",
                "Authorization": bearer
              }
          });
          let tabledata = await response.json();
          console.log(tabledata)
          setcountrylist(tabledata);
          setcountryId("")
      }

  async function getMovie(id){
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    let response = await fetch("http://localhost:8000/movie/getMovie/"+id,
    {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
      });
    if(response.status==200){
        let moviedata = await response.json();
        setdata(moviedata);
        setname(moviedata.name)
        setActors(moviedata.actors)
        setPersonName(moviedata.genres)
        setcountryId(moviedata?.country?.id)
        setproducer(moviedata.producer)
        setdate(moviedata.year)
        setincome(moviedata.income)
        setdirector(moviedata.director)
        setdescription(moviedata.description)
        setlarge_picture(moviedata.large_picture)
        setsmall_picture(moviedata.small_picture)
        setpicture_3(moviedata.picture_3)
        seturl_video(moviedata.url_video)

        if (moviedata.country != undefined && moviedata.country['name'] !=undefined){
            setcountryName(moviedata.country['name']);
            setcountryId(moviedata.country['id']);
        }
    }
    setActorId("")
}useEffect(()=>{
    getMovie(id);
    getCountries();
    getGenres();
    getActors();
    setnewmovieId("")
}, []);

async function SaveMovie(movie){
  const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
  const response = await fetch("http://localhost:8000/movie/saveMovie",{
      method:"POST",
      mode: "cors",
      cache:"no-cache",
      credentials:"same-origin",
      headers:{
          "Content-Type":"application/json",
          Authorization: bearer,
      },
      redirect:"follow",
      referrerPolicy:"no-referrer",
      body: JSON.stringify(movie)
  });
  let moviedata = await response.json();
      if(response.status==200){
        setdata(moviedata);
        setname(moviedata.name)
        setActors(moviedata.actors)
        setPersonName(moviedata.genres)
        setcountryId(moviedata?.country?.id)
        setproducer(moviedata.producer)
        setdate(moviedata.year)
        setincome(moviedata.income)
        setdirector(moviedata.director)
        setdescription(moviedata.description)
        setlarge_picture(moviedata.large_picture)
        setsmall_picture(moviedata.small_picture)
        setpicture_3(moviedata.picture_3)
        seturl_video(moviedata.url_video)
        if (moviedata.country != undefined && moviedata.country['name'] !=undefined){
            setcountryName(moviedata.country['name']);
            setcountryId(moviedata.country['id']);
        }
    }
    setnewmovieId(moviedata.id);
    }useEffect(()=>{
              getMovie(movieId)
  }, [movieId]); 

const handleChange = (event) => {
    setcountryId(event.target.value);
  };

  return (
        <div className="row">
            <div className="col-md-4">
            <CssBaseline />
            <Card style={{ width: '18rem' }}  className={classes.paper}>
                <Card.Img style={{height:200, width:200, marginTop:"20px"}} variant="top" src={data.large_picture} />
                <Card.Body>
                    <Card.Title>{data['name']}</Card.Title>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
            </div>
            <div className="col-md-8">
            <CssBaseline />
            <h3 style={{marginTop:"60px"}}>{data['name']}</h3>
            <div >
                <form className={classes.form} noValidate>
                
                <h4 style={{marginTop:"30px"}}></h4>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Name"
                    id="text"
                    name="name"
                    onChange={NameChange}
                    value={name}
                    autoComplete="text"
                    autoFocus
                />
                 <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Producer"
                    id="text"
                    name="producer"
                    onChange={producerChange}
                    value={producer }
                    autoComplete="text"
                />
                 <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Description"
                    id="text"
                    name="description"
                    onChange={DescriptionChange}
                    value={description }
                    autoComplete="text"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    type="year"
                    fullWidth
                    label="Year"
                    id="date"
                    name="url_video"
                    onChange={DateChange}
                    value={date}
                    autoComplete="text"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Director"
                    id="text"
                    name="director"
                    onChange={DirectorChange}
                    value={director }
                    autoComplete="text"
                />
              <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Income"
                    id="text"
                    name="income"
                    onChange={incomeChange}
                    value={income }
                    autoComplete="text"
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Small picture"
                    id="text"
                    name="small_picture"
                    onChange={small_pictureChange}
                    value={small_picture }
                    autoComplete="text"
                />

              <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Large picture"
                    id="text"
                    name="large picture"
                    onChange={large_prictureChange}
                    value={large_picture }
                    autoComplete="text"
                />

              <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Extra picture"
                    id="text"
                    name="picture"
                    onChange={picture_Change}
                    value={picture_3 }
                    autoComplete="text"
                />

              <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Video url"
                    id="text"
                    name="url_video"
                    onChange={url_videoChange}
                    value={url_video}
                    autoComplete="text"
                  />

                <h4 style={{marginTop:"40px"}}>Country</h4>
                
                
                <FormControl variant="outlined"
              className={classes.formControl}
                  fullWidth
              >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Country
                    </InputLabel>
                    <MuiSelect
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={countryId}
                      onChange={CountryhandleChange}
                      label="country"
                    >
                      {countrylist.map((item) => (
                        <MenuItem key={item.id} value={item}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </MuiSelect>
                  </FormControl>
                  <FormControl variant="outlined"
                               fullWidth 
                               className={classes.formControl, 'mt-4'
                               }>
                    <InputLabel id="demo-mutiple-chip-label">Genre</InputLabel>
                    <Select
                      labelId="demo-mutiple-chip-label"
                      id="demo-mutiple-chip"
                      multiple
                      value={personName}
                      onChange={handleChange1}
                      input={<Input id="select-multiple-chip" />}
                      renderValue={(selected) => (
                        <div className={classes.chips}>
                          {selected.map((value) => (
                            <Chip key={value.id} label={value.name} className={classes.chip} />
                          ))}
                        </div>
                      )}
                      MenuProps={MenuProps}
                    >
                      {genrelist.map((genre) => (
                        <MenuItem key={genre.id} value={genre} style={getStyles(genre.id, genre.name, theme)}>
                          {genre.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl variant="outlined"
                               fullWidth 
                               className={classes.formControl, 'mt-4'}
                               >
                    <InputLabel id="demo-mutiple-chip-label">Actors</InputLabel>
                    <Select
                      labelId="demo-mutiple-chip-label"
                      id="demo-mutiple-chip"
                      multiple
                      fullWidth
                      value={actors}
                      onChange={handleActorChange}
                      input={<Input id="select-multiple-chip" />}
                      renderValue={(selected) => (
                        <div className={classes.chips}>
                          {selected.map((value) => (
                            <Chip key={value.id} label={value.full_name} className={classes.chip} />
                          ))}
                        </div>
                      )}
                      MenuProps={MenuProps}
                    >
                      {actorlist.map((actor) => (
                        <MenuItem key={actor.id} value={actor} style={getStyles(actor.id, actor.full_name, theme)}>
                          {actor.full_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={SaveMovieSubmit}
                    className={'mt-4'}
                >
                    Save
                </Button>
                </form>
            </div>
            </div>
        </div>
  );
}
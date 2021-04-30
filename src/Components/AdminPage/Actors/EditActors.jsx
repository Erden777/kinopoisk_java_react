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

export default function EditActors() {
  let {actorId} = useParams();
  const classes = useStyles();
  const[id, setId] = useState(actorId);
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


  const PrictureChange = (event) => {
    setPicture_url(event.target.value);
  };  

  const fullnameChange = (event) => {
    setfullname(event.target.value);
  };  

  const AgeChange = (event) => {
    setAge(event.target.value);
  };  

  const SaveActorSubmit = event =>{
    
    const actor = {id:data['id'], full_name:fullname,picture_url: picture_url, age:age, country:countryId}
    console.log(actor)
    SaveActor(actor)
    // loadCards()
  };

  async function getActor(id){
    console.log("Get genre")
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    let response = await fetch("http://localhost:8000/api/actor/getActor/"+id,
    {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
      });
    if(response.status==200){
        let actorData = await response.json();
        setdata(actorData);
        setfullname(actorData.full_name)
        setAge(actorData.age)
        setPicture_url(actorData.picture_url)
        if (actorData.country != undefined && actorData.country['name'] !=undefined){
            setcountryName(actorData.country['name']);
            setcountryId(actorData.country['id']);
            console.log(actorData.country['id']);
        }
        if (actorData.all_countries != undefined ){
            setallCountries(actorData.all_countries);
        }
    }
    setActorId("")
}useEffect(()=>{
    getActor(id);
}, []);

async function SaveActor(data){
  console.log(data, 'data')
  const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
  const response = await fetch("http://localhost:8000/api/actor/saveActor",{
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
      body: JSON.stringify(data)
  });
      let actorData = await response.json();
      if(actorData.status==200){
        let actorData = await response.json();
        setdata(actorData);
        setfullname(actorData.full_name)
        setAge(actorData.age)
        setPicture_url(actorData.picture_url)
        if (actorData.country != undefined && actorData.country['name'] !=undefined){
            setcountryName(actorData.country['name']);
            setcountryId(actorData.country['id']);
        }
        if (actorData.all_countries != undefined ){
            setallCountries(actorData.all_countries);
        }
    }
      setActorId(actorData.id);
    }useEffect(()=>{
  }, [actorId]); 

const handleChange = (event) => {
    setcountryId(event.target.value);
  };

  return (
        <div className="row">
            <div className="col-md-4">
            <CssBaseline />
            <Card style={{ width: '18rem' }}  className={classes.paper}>
                <Card.Img style={{height:200, width:200, marginTop:"20px"}} variant="top" src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" />
                <Card.Body>
                    <Card.Title>{data['full_name']}</Card.Title>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
            </div>
            <div className="col-md-8">
            <CssBaseline />
            <h3 style={{marginTop:"60px"}}>{data['full_name']}</h3>
            <div >
                <form className={classes.form} noValidate>
                
                <h4 style={{marginTop:"30px"}}></h4>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="text"
                    name="fullname"
                    onChange={fullnameChange}
                    value={fullname}
                    autoComplete="text"
                    autoFocus
                />
                <TextField
                    id="date"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Age"
                    type="text"
                    value={age}
                    onChange={AgeChange}
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
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
                onChange={handleChange}
                label="country"
              >
                {allCountries.map((item) => (
                  <MenuItem key={item.id} value={item}>
                    {item.name}
                  </MenuItem>
                ))}
              </MuiSelect>
            </FormControl>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={SaveActorSubmit}
                >
                    Save
                </Button>
                </form>
            </div>
            </div>
        </div>
  );
}
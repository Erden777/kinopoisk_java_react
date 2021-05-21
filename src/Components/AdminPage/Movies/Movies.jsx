import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useEffect, useContext, useState } from "react";
import { AuthContext, UserDataContext } from "../../../App";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import {useCookies} from 'react-cookie';
import AddBoxIcon from '@material-ui/icons/AddBox';
import TextField from '@material-ui/core/TextField';
import {Select as MuiSelect} from "@material-ui/core";
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

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Movies() {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [actors, setActors] = useState([]);
  const [movielist, setmovielist] = useState([]);
  const [actorlist, setactorlist] = useState([]);
  const [genrelist, setgenrelist] = useState([]);
  const [countrylist, setcountrylist] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [movie, setMovie] = useState({});
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);
  const [movieId, setmovieId] = useState("");
  const [countryId, setcountryId] = useState("");
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


  const handleChange = (event) => {
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


  const deleteMovie = event =>{
    DeleteMovie(movie)
    setOpen(false);
    // loadCards()
  }

  const SaveMovieSubmit = event =>{
    console.log(personName)
    const data = {
                    'name':name, 'description': description,
                    'producer':producer, 'director': director, 
                    'income':income, 'small_picture': small_picture,
                    'large_picture': large_picture, 'picture_3': picture_3,
                    'url_video': url_video, 'country': countryId,
                    'actors': actors, 'genres': personName, 'year':date
                        }
    console.log(data)
    SaveMovie(data)
    setname("")
    setActors([])
    setdescription("")
    setproducer("")
    setOpenAdd(false);
    setPersonName([]);
    setcountrylist([])
                      
  
    // loadCards()
  }
  
  async function SaveMovie(data){
    console.log(data, 'data')
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    console.log(bearer)
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
        body: JSON.stringify(data)
    });
    
    let res = await response.json();
    setmovieId(res.id);
} useEffect(()=>{
    }, [movieId]);


  async function DeleteMovie(data) {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    const response = await fetch("http://localhost:8000/movie/delete", {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    let delData = await response.json();
    setmovieId(delData.id);
  }


  async function loadCards(){
    const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
    let response = await fetch("http://localhost:8000/movie/allMovies", {
        method:'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": bearer
        }
    });
    let tabledata = await response.json();
    console.log(tabledata)
    if (tabledata.movies){
      setmovielist(tabledata.movies)
    }
    if (tabledata.genres){
      setgenrelist(tabledata.genres)
    }
    if (tabledata.actors){
      console.log(tabledata.actors)
      setactorlist(tabledata.actors)
    }
    if (tabledata.countries){
      setcountrylist(tabledata.countries)
    }
    setmovieId("")
}
  useEffect(()=>{
      loadCards();
  }, [movieId]);


    return (
      <>
      <React.Fragment>
        <Title>Movies</Title>
        
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movielist.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row?.country?.name}</TableCell>
              <TableCell align="right">
              <a href={`/admin/movies/${row.id}`}>
                <Button
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                  >
                    <EditIcon/>

             
                 </Button>
                 </a>
            </TableCell>
              <TableCell onClick={() => {handleClickOpen(row)}}>
              <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                ><DeleteIcon/> 
                </Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </React.Fragment>
    <Button  variant="contained"
                  color="primary"
                  className={classes.submit} style={{"marginTop":"40px"}}
                  onClick={() => {handleClickOpenAdd()}}>
        <AddBoxIcon />
        </Button>
  <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle>
        <DialogContent>
          <DialogContentText>
              {movie.name } delete?
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
        <Button onClick={deleteMovie} color="secondary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>

    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Add Movie</DialogTitle>
        <DialogContent>
          <DialogContentText>
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

                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-chip-label">Genre</InputLabel>
                    <Select
                      labelId="demo-mutiple-chip-label"
                      id="demo-mutiple-chip"
                      multiple
                      fullWidth
                      value={personName}
                      onChange={handleChange}
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

                  <FormControl className={classes.formControl}>
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
                
               </DialogContentText>
          
        </DialogContent>
        <DialogActions>
        <Button onClick={SaveMovieSubmit} color="secondary">
            Save
          </Button>
          <Button onClick={handleCloseAdd} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>

    </>
  );
}
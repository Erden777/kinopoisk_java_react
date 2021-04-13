import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Card} from 'react-bootstrap'
import Select from '@material-ui/core/Select'

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

export default function Profile() {
  const classes = useStyles();

  return (
        <div className="row">
            <div className="col-md-4">
            <CssBaseline />
            <Card style={{ width: '18rem' }}  className={classes.paper}>
                <Card.Img style={{height:200, width:200, marginTop:"20px"}} variant="top" src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
            </div>
            <div className="col-md-8">
            <CssBaseline />
            <h3 style={{marginTop:"60px"}}>Update profile</h3>
            <div >
                <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    name="email"
                    value="erden.aidynuly@gmail.com"
                    autoComplete="email"
                    autoFocus
                    aria-readonly
                />
                <hr></hr>
                <h4 style={{marginTop:"30px"}}></h4>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="text"
                    name="fullname"
                    value="Erden Aidynuly"
                    autoComplete="text"
                    autoFocus
                />
                <TextField
                    id="date"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Birthday"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    
                />
                

                <h4 style={{marginTop:"60px"}}>Update Role</h4>
                    <Select
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="text"
                        name="fullname"
                        value="Erden Aidynuly"
                        autoComplete="text"
                        autoFocus
                        value
                    >
                     <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Save
                </Button>
                
                </form>
            </div>
            </div>
        </div>
      
  );
}
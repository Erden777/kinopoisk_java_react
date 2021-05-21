import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from "react";
import {useCookies} from 'react-cookie';
import { useParams} from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext, UserDataContext } from "../../App";
import ReactPlayer from 'react-player'
import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { Card, Table } from "react-bootstrap";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Slider from "react-slick";

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
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

export default function MovieDetails() {
          let {MovieId} = useParams();
          const classes = useStyles();
          const {cookieJWT} =  useContext(AuthContext);
          const {userData, setuserData} = useContext(UserDataContext)
          const [email, setEmail] = useState("");
          const [password, setPassword] = useState("");
          const [repassword, setRepassword] = useState("");
          const [full_name, setFull_name] = useState("");
          const [cookieJWT1, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
          const [similar_products, setSimilarProducts] = useState([]);
          const [actors, setActors] = useState([]);
          const [data, setData] = useState([]);
          const [movie_ratings, setMovie_rating] = useState([]);
          const [search_result, setSearch_resutl] = useState([]);

          useEffect(() => {
            if (cookieJWT['jwt']!==undefined){
              console.log(cookieJWT)
              test();
              getMovie(MovieId);
            }
        }, []);


          async function test(){   
            console.log(cookieJWT['jwt'])
            const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
            const response = await fetch("http://localhost:8000/api/profile", {
                method:'GET',
                headers: {
                "Content-Type": "application/json",
                "Authorization": bearer
                }
            });
                if(response.status===200){
                    let res = await response.json();
                    console.log(res);
                    setuserData(res);
                }    
            }

            async function getMovie(id){
              console.log(id)
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
                  console.log(moviedata)
                  if(moviedata?.similar_products){
                    console.log(moviedata.rating_movies)
                    setSimilarProducts(moviedata.similar_products);
                  }
                  if(moviedata.actors.length){
                    setActors(moviedata.actors);
                  }
                  if(moviedata.rating_movies.length){
                    console.log(moviedata.rating_movies)
                    setMovie_rating(moviedata.rating_movies);
                  }
                  setData(moviedata);
              }
            }

          const handleEmailChange = event =>{
                    setEmail(event.target.value);
          }

          const handleFullnameChange = event =>{
                    setFull_name(event.target.value);
          }

          const handleRepasswordChange = event =>{
                    setRepassword(event.target.value);
          }
          const handlePasswordChange = event =>{
                    setPassword(event.target.value);
          }

          const handleSubmit = event =>{

          const inputData = {email, password, full_name};
                    if(repassword===password){
                          register(inputData);
                          }else{
                              alert('enter correct repassword')
                          }
              event.preventDefault();
          }

          async function register(data){
                    const response = await fetch("http://localhost:8000/register", {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                              "Content-Type": "application/json",
                    },
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                    body: JSON.stringify(data)
                    });
                    
                    if(response.status === 200){
                              let jwt = await response.json();
                              setCookieJWT('jwt', jwt);
                    }
          }

          const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
            };
  
      return (
      <Container component="main">
        <div className="row">
          <Card.Header className="col-4 card">
            <div className="col mt-5 mb-4">
              <img height="420px" width="100%" src={data.small_picture}/>
              <div className='player-wrapper' style={{height:"180px"}}>
              <ReactPlayer
                      config={{
                        youtube: {
                          playerVars: { showinfo: 1 }
                        },
                        facebook: {
                          appId: '12345'
                        }
                      }}
                        className='react-player video-wrapper mt-4'
                        url={data?.url_video}
                        width='100%'
                        height='100%'
                      />
              </div>
          </div>
          </Card.Header>
          
          <Card.Header className="col-8 card">
            <div className="row mt-5 ml-1">
              <div className="col-8">
                  <h3 style={{fontSize:"34px"}}><strong>{data.name}</strong></h3>
                  <h5 className="mt-5"><strong>О фильме</strong></h5>
                  <div style={{width: '100%' }}>
                  <Table responsive>
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Год производства</td>
                      <td>2021</td>
                    </tr>
                    <tr>
                      <td>Страна</td>
                      <td>{data?.country?.name}</td>
                    </tr>
                    <tr>
                      <td>Жанр</td>
                      <td>{data?.genres?.length > 0  && data?.genres.map((row) => (row?.name+" "))}</td>
                    </tr>
                    <tr>
                      <td>Режиссер</td>
                      <td>{data?.director}</td>
                    </tr>
                    <tr>
                      <td>Продюсер</td>
                      <td>{data?.producer}</td>
                    </tr>
                   
                    <tr>
                      <td>Прибыл</td>
                      <td>{data?.income}</td>
                    </tr>

                  </tbody>
                </Table>
                </div>
                
  
              </div>
              
              <div className="col-3">
                  <h3 style={{fontSize:"30px", marginTop:"30px"}}><strong>6.4</strong></h3>
                  <h6 className="mt-3 mb-3"><strong>В главных ролях</strong></h6>
                  { actors.length>0 && actors.map((row)=>
                  <dl>{row?.full_name}</dl>
                  )
                  }
              </div>
              
              </div>

              <h5 className="mt-5"><strong>Кино по вашим предпочтениям</strong></h5>
                <Slider {...settings}>
                {
                similar_products.length <= 0 && <h3>Пока никто  не добавил объявление <img src="https://freepikpsd.com/wp-content/uploads/2019/10/apple-emoji-png-pack-6-Free-PNG-Images-Transparent.png" width="50px" ></img></h3>
                }
                  { similar_products.length>2 && similar_products.map((row) => (
                    <div className="p-2 moviecard">
                      {row.rating <= 7 && row.rating >4 &&
                      <p className="text-block1" style={{backgroundColor:"orange"}}>{row.rating}</p>
                      }
                      { row.rating > 7 &&
                        <p className="text-block1" style={{backgroundColor:"green"}}>{row.rating}</p>
                      }
                      {
                        row.rating <= 4 &&
                        <p className="text-block1" style={{backgroundColor:"red"}}>{row.rating}</p>
                      }
                        <img height="200px" width="100%" src={row.small_picture} />
                        <a  href={`/movie/${row.id}`}  className="mt-2 moviecardtitle">{row.name}</a>
                        <p className="moviecardundertitle">{row?.genres[0]?.name}</p>
                    </div>
                  ))
                }
                </Slider>

              <div>
          
          </div>

          </Card.Header>

          <Card.Header className="col">
            <h4 className="mt-3 mb-3 ml-4"><strong>Оценки</strong></h4>
            { movie_ratings.length>0 && movie_ratings.map((row) => (
              <Box component="fieldset" mb={3} mt={3} ml={3} borderColor="transparent">
                <Typography component="legend">{row?.rating.name}</Typography>
                <Rating name="customized-10" defaultValue={row.mark} max={10} size="large" />
              </Box>
              ))
            }
          </Card.Header>
        </div>

        
      </Container>
      );
}
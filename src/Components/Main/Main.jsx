import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Player } from 'video-react';
import { Container, Card, Figure, Form ,Modal , ListGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "video-react/dist/video-react.css";
import Home from '../Home/Home';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from '@material-ui/core/Button';
import { AuthContext, UserDataContext } from "../../App";
import {useCookies} from 'react-cookie';
import { useEffect, useContext } from "react";
import ReactPlayer from 'react-player'
import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';


function MovieList(props){
  
  return(
      <>
          <p style={{fontSize:"12px"}}>результаты: {props.search_data.length}</p>
          <p style={{color:"orange", fontSize:"20px"}}>Скорее всего, вы ищете:</p>
          {props.search_data?.map((row)=>
          <Card.Header className="container card">
            <div className="row">
              <div className="col-3">
                <img height="180px" width="100%" src={row.small_picture}/>
               
                <Button
                  type="submit"
                  size="small"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="col mt-3"
                  >
                  <AddIcon size="small"/>
                </Button>
              </div>
              <div className="col-9">

                <div className="row">
                  <div className="col-10">
                    <a href={`/movie/${row.id}`}  ><strong className="moviecardtitle" style={{color:"orange"}}>{row.name}</strong></a>
                    <p style={{marginTop:"10px"}}>2021</p>
                    <p style={{marginTop:"-20px"}}>{row?.country?.name}</p>
                    <p style={{marginTop:"-20px"}}>{row?.rating}</p>
                  </div>
                  <div className="col-2">
                      <p>Genres</p>
                      {
                        row?.genres?.map((genre)=>
                        <dl style={{marginBottom:"-5px"}}>{genre?.name}</dl>
                        )}
                  </div>
                </div>
              </div>
            </div>
            
          </Card.Header>
          )}
          
      </>
  );
}



function Main(props){
  console.log(props.search_data);
  const {cookieJWT} =  useContext(AuthContext);
  const {userData, setuserData} = useContext(UserDataContext)
  const [genrelist, setgenrelist] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [serials, setSerials] = useState([]);
  const [new_movie, setNewMovies] = useState([]);
  const [last_movie, setLastMovie] = useState([]);
  const [search_result, setSearch_resutl] = useState([]);
    useEffect(() => {
      console.log(cookieJWT)
      if (cookieJWT['jwt']!==undefined){
        console.log(cookieJWT)
        test(props);
        loadMovie();
        console.log(last_movie?.actors);    

      }
  }, []);
  
  async function loadMovie(){
    const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
    const response = await fetch("http://localhost:8000/api/", {
        method:'GET',
        headers: {
        "Content-Type": "application/json",
        "Authorization": bearer
        }
    });
        if(response.status===200){
            let res = await response.json();
                if (res.popular_movies.length > 0){
                  setPopularMovies(res.popular_movies);
                }
                if( res.serials.length >0){
                  setSerials(res.serials);
                }
                if(res.new_movie.length>0){
                  setNewMovies(res.new_movie);
                }
                if(res.genres.length>0){
                  setgenrelist(res.genres);
                }
                if(res.last_movie !== undefined){
                  setLastMovie(res.last_movie);
                }
        }
  }

  async function test(props){   
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
    const settingsSerials = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
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
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
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

    const settings1 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
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
        <>
        <div className="row mt-5">
            <div className="col-md-2">
                <Card style={{ width: '10rem' }}>
                    <Card.Header>Genre</Card.Header>
                    <ListGroup variant="flush">
                    { genrelist.length>0 && genrelist.map((row) => (
                      <Link to={`/movie/genre/${row.id}`} style={{textDecoration:"none", color:"black"}}>
                          <ListGroup.Item>{row.name}</ListGroup.Item>
                        </Link>
                    ))}
                    </ListGroup>
                    </Card>
            </div>
            <div className="col-md-10">
            { props.search_data?.length > 0 ?
            <>
              <MovieList search_data={props.search_data}/>
            </>
          :
          <>
              <div className="col">
                  <div className='row player-wrapper1' style={{height:"440px"}}>
                    <div className="col-6 title-wrapper">
                        <div className="playerTitle">
                            <img height="80px" width="80%" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/846a9086-8a40-43e0-aa10-2fc7d6d73730/ddb5lkc-c37d95a6-5bdf-46d7-aeb1-a5b795804734.png/v1/fill/w_1280,h_750,strp/mulan__2020__logo_png_by_mintmovi3_ddb5lkc-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzUwIiwicGF0aCI6IlwvZlwvODQ2YTkwODYtOGE0MC00M2UwLWFhMTAtMmZjN2Q2ZDczNzMwXC9kZGI1bGtjLWMzN2Q5NWE2LTViZGYtNDZkNy1hZWIxLWE1Yjc5NTgwNDczNC5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.d7EUMFR94kqS2N1mAV-zN-VG9l2aT_0qfNx8o785Q_g"></img>
                            <p className="mt-4">{last_movie.name}</p>
                            <p className="underplayerTitle ">В главных ролях:</p>
                            <p className="actorName">{last_movie.actors?.map((row) => (row.full_name+" "))}</p>
                            <p className="underplayerTitle">Режиссер:</p><p className="actorName">{last_movie.producer}</p>
                            <strong className="watchWith">Смотрите по подписке</strong>
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="col-6 offset-3 mt-4"
                            style={{width:"150px", marginRight:"10px"}}
                            >
                            <PlayArrowIcon/>
                            Смотреть
                          </Button>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="#ccff90"
                            className="col-6 offset-3 mt-4"
                            style={{width:"350px"}}
                            >
                            <AddIcon/>
                            Буду смотреть
                          </Button>
                        </div>  
                    </div>
                    
                      <ReactPlayer
                      config={{
                        youtube: {
                          playerVars: { showinfo: 1 }
                        },
                        facebook: {
                          appId: '12345'
                        }
                      }}
                        className='react-player video-wrapper col-6 mt-4'
                        url={last_movie.url_video}
                        width='100%'
                        height='90%'
                      />
                    </div>
                  </div>
                        

                <h2 className="mt-5 ml-2 bold" style={{fontWeight:"bold"}}>Выбор редакции</h2>
                <Slider {...settings}>
                {
                popularMovies.length <= 0 && <h3>Пока никто  не добавил объявление <img src="https://freepikpsd.com/wp-content/uploads/2019/10/apple-emoji-png-pack-6-Free-PNG-Images-Transparent.png" width="50px" ></img></h3>
                }
                  { popularMovies.length>0 && popularMovies.map((row) => (
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
                
                <div className="MainBar mt-5 ml-2">
                  <div className="MainBar2">
                    <h3 className="mainbarTitle text-center">Тысячи фильмов и сериалов на КиноПоиск HD</h3>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="col-6 offset-3"
                    style={{marginLeft:"220px"}}
                    >
                    Subscribe
                  </Button>
                    <Slider className="mt-5" {...settings1}>
                    { new_movie?.map((row) => (
                      <div className="p-2 movieNewcard">
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
                        <img height="180px" width="100%" src={row.small_picture} />
                        <a href={`/movie/${row.id}`} className="mt-2 moviecardtitledark">{row.name}</a>
                        <p className="moviecardundertitle">{row?.genres[0]?.name}</p>
                    </div>
                    
                    ))}
                  </Slider>

                  <h3 style={{color:"white", marginTop:"20px", fontWeight:"bold"}}>Выбираем фильмы и сериалы</h3>
                  <Slider {...settings}>
                  {
                serials.length <= 0 && <h3>Пока никто  не добавил объявление <img src="https://freepikpsd.com/wp-content/uploads/2019/10/apple-emoji-png-pack-6-Free-PNG-Images-Transparent.png" width="50px" ></img></h3>
                }
                  { serials.length>0 && serials.map((row) => (
                    <Link to={`/movie/${row.id}`} style={{textDecoration:"none", color:"black"}}>
                    <div className="p-2 movieNewcard">
                        <img height="200px" width="100%" src={row.small_picture} />
                    </div>
                    </Link>
                  ))
                }
                </Slider>
                </div>
                </div>
                </>
        }
                </div>
            </div>
      
        </>
    

    );
   
}

export default Main;
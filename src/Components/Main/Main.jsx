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

function Main(props){
  const {cookieJWT} =  useContext(AuthContext);
  const {userData, setuserData} = useContext(UserDataContext)

    useEffect(() => {
      console.log(cookieJWT)
      if (cookieJWT['jwt']!==undefined){
        console.log(cookieJWT)
        test(props)
      }
  }, []);
  
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
        if(response.status==200){
            let res = await response.json();
            console.log(res);
            setuserData(res);
        }    
    }
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
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup>
                    </Card>
            </div>
            <div className="col-md-10">
                        <Player
                            playsInline
                            poster="/assets/poster.png"
                            height="10"
                            width="90"
                            src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                            />
                    

                <h2 className="mt-5 ml-2 bold" style={{fontWeight:"bold"}}>Popular movies</h2>
                <Slider {...settings}>
                <div className="p-2">
                    <img height="200px" width="100%" src="https://uzfilm.net/wp-content/uploads/2021/02/71369237.jpg" />
                </div>
                <div className="p-2">
                    <img height="200px" width="100%" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/57e25896-b6e8-47af-966e-feab17041298/300x450" />
                </div>
                <div className="p-2">
                    <img height="200px" width="100%" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/57e25896-b6e8-47af-966e-feab17041298/300x450" />
                </div>
                <div className="p-2">
                  <img height="200px" width="100%" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/57e25896-b6e8-47af-966e-feab17041298/300x450" />
                </div>
                <div className="p-2">
                    <img height="200px" width="100%" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/57e25896-b6e8-47af-966e-feab17041298/300x450" />
                </div>
                <div className="p-2">
                    <img height="200px" width="100%" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/57e25896-b6e8-47af-966e-feab17041298/300x450" />
                </div>
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
                  <div>
                      <img height="180px" width="100%" src="https://uzfilm.net/wp-content/uploads/2021/02/71369237.jpg" />
                      <p className="p">Title</p>
                  </div>
                  <div className="p-2">
                    <img height="180px" width="100%" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/57e25896-b6e8-47af-966e-feab17041298/300x450" />
                    <p className="p">Title</p>
                  </div>
                  <div className="p-2">
                    <img height="180px" width="100%" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/57e25896-b6e8-47af-966e-feab17041298/300x450" />
                    <p className="p">Title</p>
                  </div>
                  <div className="p-2">
                    <img height="180px" width="100%" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/57e25896-b6e8-47af-966e-feab17041298/300x450" />
                    <p className="p">Title</p>
                  </div>
                  <div className="p-2">
                    <img height="180px" width="100%" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/57e25896-b6e8-47af-966e-feab17041298/300x450" />
                    <p className="p">Title</p>
                  </div>
                  <div className="p-2">
                    <img height="180px" width="100%" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/57e25896-b6e8-47af-966e-feab17041298/300x450" />
                    <p className="p">Title</p>
                  </div>
                  <div className="p-2">
                    <img height="180px" width="100%" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/57e25896-b6e8-47af-966e-feab17041298/300x450" />
                    <p className="p">Title</p>
                  </div>
                  <div className="p-2">
                    <img height="180px" width="100%" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/57e25896-b6e8-47af-966e-feab17041298/300x450" />
                    <p className="p">Title</p>
                  </div>
                  <div className="p-2">
                    <img height="180px" width="100%" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/57e25896-b6e8-47af-966e-feab17041298/300x450" />
                    <p className="p">Title</p>
                  </div>
                  <div className="p-2">
                    <img height="180px" width="100%" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/57e25896-b6e8-47af-966e-feab17041298/300x450" />
                    <p className="p">Title</p>
                  </div>
                  </Slider>

                  <h3 style={{color:"white", marginTop:"20px", fontWeight:"bold"}}>Выбираем фильмы и сериалы</h3>
                  <Slider {...settings}>
                <div className="p-2">
                    <img height="200px" width="100%" src="https://uzfilm.net/wp-content/uploads/2021/02/71369237.jpg" />
                </div>
                <div className="p-2">
                    <img height="200px" width="100%" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/57e25896-b6e8-47af-966e-feab17041298/300x450" />
                </div>
                <div className="p-2">
                    <img height="200px" width="100%" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/57e25896-b6e8-47af-966e-feab17041298/300x450" />
                </div>
                <div className="p-2">
                  <img height="200px" width="100%" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/57e25896-b6e8-47af-966e-feab17041298/300x450" />
                </div>
                <div className="p-2">
                    <img height="200px" width="100%" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/57e25896-b6e8-47af-966e-feab17041298/300x450" />
                </div>
                <div className="p-2">
                    <img height="200px" width="100%" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/57e25896-b6e8-47af-966e-feab17041298/300x450" />
                </div>
                </Slider>
                </div>
                </div>
                </div>
            </div>
      
        </>

    );
}

export default Main;
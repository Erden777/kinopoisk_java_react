import { Container, Card, Figure, Form ,Modal , ListGroup } from "react-bootstrap";
import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import {useCookies} from 'react-cookie';
import { useEffect, useContext } from "react";
import ReactPlayer from 'react-player'
import AddIcon from '@material-ui/icons/Add';
import { AuthContext, UserDataContext } from "../../App";
import { useParams} from "react-router-dom";

export default function MovieDetails() {
          let {GenreId} = useParams();
          const {userData, setuserData} = useContext(UserDataContext)
          const {cookieJWT} =  useContext(AuthContext);
          const [genre_movies, setGenre_Movies] = useState([])
          
          useEffect(() => {
                    if (cookieJWT['jwt']!==undefined){
                      console.log(cookieJWT)
                      test();
                      getMovies();
                    }
                }, []);

          async function setData(row) {

          }
          async function getMovies(){
                    const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
                    const response = await fetch("http://localhost:8000/movie/getByGenre"+GenreId, {
                              method:'GET',
                              headers: {
                              "Content-Type": "application/json",
                              "Authorization": bearer
                              }
                    });
                              if(response.status===200){
                                        let res = await response.json();
                                        console.log(res);
                                        if(res.length>0){
                                                  setGenre_Movies(res);
                                        }
                              }      
          }

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
                
          return(
          <>
          {genre_movies?.map((row)=>
          <Card.Header className="col-8 ml-5 card mt-5">
          <div className="row">
                    <div className="col-4">
                    <img height="180px" width="100%" src={row?.small_picture}/>
                    
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
                    <div className="col-6">

                    <div className="row">
                    <div className="col-7">
                    <a href={`/movie/${row.id}`}  ><strong className="moviecardtitle" style={{color:"orange"}}>{row.name}</strong></a>
                    <p style={{marginTop:"10px"}}>2021</p>
                    <p style={{marginTop:"-20px"}}>{row?.country?.name}</p>
                    <p style={{marginTop:"-20px"}}>{row?.rating}</p>
                    </div>
                    <div className="col-4 ml-4">
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
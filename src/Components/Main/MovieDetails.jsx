import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
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
import { Card } from "react-bootstrap";
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

          useEffect(() => {
            if (cookieJWT['jwt']!==undefined){
              console.log(cookieJWT)
              test();
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
  
      return (
      <Container component="main">
        <div className="row">
          <Card.Header className="col-4 card">
            <div className="col mt-5 mb-4">
              <img height="420px" width="100%" src="https://kinopoisk-ru.clstorage.net/1Yp4O3234/01fb72SD/DXV37pRW8_bCn9kiu5SBHcKz5cLLdDNVLdrWUOlPpFhugUIEeWEIsWdNn4t65ZaeSTqtJyrcATzItTbnNARxN3wQo84Qx4cy59usp0qANP23UoQCi4RDQSkvIxQ46yEsD1B3oayT-7PkbwipGRcUnI8uySMrCdTpTLQTd_A00ONtZ4UvMlMAdCO9uAE5oLKvIUVkEEu0E0S5iiSBfv3EamshorQI8RiQdS6pOQkWxi9eT4iQDMv0ucx101UQZIbDT6f2W0OxYMbwbYmwmHNTrVF2BCF6hqMn-_j2I-6txDoLEpB326JokwQN-Fpql9XOfZwbQNzKF9sM9UPmYEQ2Qt6ENIsRkWJnIp64UrpCg3_AhUbBm4bDxYlLdxLeP1Y7GABRtxvRmADFTQlJeSeVrr_dmLJ_mGSavOSTBkCnxYDcpMV7o4LDFWCee2LbktL88WZ28ZsUMccqmyRz34z3SYrDQ9fY0Xpj5u9L2soG5rx9XsqzTulFCb6FwZQANSQgfNTmi2PjgTdDvjvxapCSTCAVpxOo9SNkCxtnQf8ehiuKg7HEuhLrY9buSFrqdtauXU7qcv2pNJvNVjKlIzaVUhwEVstBMYNG0c4JctgAga2wB6VA-rUDhotrRDPc3ETYOhDR1GuAaoPFbkp42JXkL78tyWKPCac4jReCFVN3VjKNlVV6McOQlTLeKkDZIyJeAddEAYiEs2W7GEUSDoxGqgoxMhYJQKlDdLyKWGi09H48nsly3_uEmf5lcyeyZ1SCrRVGmbHQMVTgnkkCygMgntMnRVOJZ9Gma-slkq8_Vlg4gMOEC1GoAIVfqSso9IeNPv05IO2rFpsuNnKmY_RFII5393qQ4GB2Ah4ZIgvDcM_j54aRmSUiZzmLJWLfbRTbW9NQdhrzWjGVD2lrOaSmXg5s-MIcmsbZD8fxF5HmlBBsR1X4cmChxtB--iDKwqEswiXGQmj30ibJuxTCvZ-0qijy8HWKAQpRJrwqCZll9Mw9vTiwHxmma58FQUYTRgYQvRUUSyMCcISCfetQmeEjXWFV5UIJNIHWyhjmEt7eVIu4MTCG21DaoHQveSlIZvfMr54qY3yoRzvNR-NHUCUXQiy2lGpAc2MnMLx6MUhwId1CxoYyCBQiVvkoFJEt_ubbmUOixPuzGRFn3avIqld0Dz7OGkAuyFQInTQwlmF3dwN_Ftf4QSISxLEt22HKYhG8E_SW4ZinYTYpaXWijj5WGYhzsIZ68pvhJ_9paEsE52-N71pwjMt2G4x1cpVSB_SyvraGeQDgUYUDj6oxacNRbAO19oI7BoA2mBj1czyPBIuacrHmCSD4sebPy4va9VZeLW6qAB8ZBsitV_LWARfkMG1FB8viIIF1gd66Y3qTYU1y5BVC6Wfjh_hrNlO9zxZpiWFwJQoyexMWz_oJ-JVEn57euOLuqyd7jydxx6Pk9nF-ZEf5grFgxYO9uDLaYnOu4AaU4as1EXQqu7SQzC_lC0vDkcZKkEjA9s_YG5iExs1vfeoBD0uUag1nsiWSRcWT33aUSVJjUObgXgtw66Ain_PmV1HZ1LBGmqpGU3yfBRsIQ0GU6BBbURSfiRpLR2ZefU1YwCxppQlshFAk8TYE0s7HFKmC8GBksR5YM4gSM00BdHUj60fgh9hq1LKujUbLCHBSJtuDi9Dl7Hs5GVeXnK-dKSA9KPdIvLWB9TAUBCD8VJSZ49DARpBeC2FIgVO8owSEAKrEkoYLmJYwPW13aCnTIYQLQCrC5O_Li5gXpm49D_jzDIgnKS8l4ufCRuTRbqd2unPgcGQyfrnxOTAir1LUNrJ7N0H2exr1Mq1thCk6sZIWWWMpUWaNCcn5NNX9T93qwG9KV1oOV2EUUfYFMP03NVuigRMnUN5JcLrTwy2ztybSSMajR8oq9nDMzvVpSULy9iiASwNG3AkZiqfn7C3sqEIsSjU6rsXAJaEXR2CuJVX7wJJg9sItiCF7kPDc80XFY0v2glS4eFRg7a9EuHvw0-Rp4vkTlU9pq0h0J5xd_osAbPnGKg_EchbzdpQy3tTUu0DTQxUgbMmBGOPhDbE1pvAKxeAmyCq04N3tFonb8eOFydM70uXdiNuYVBWvT6978u-rJesMNYFng3T1QP2XZlqQwlFFwg_psBnQs70CldVCu1RTxZgLJrDOv6ULORJwtPkBacBlL_nIeKdn7O3cOSI8uHZYrXSwx8AVVzPfdzaZkdAiliHtOeE4QELfQhY08eqnY0bb20ZBPK21a1sx4EXawKpQx1xYypoGpP097XgzTcsU-U8mEgeBxxTCP1Umq7Jwg5Vg3LsB6uADPXCkl1KbFjGk6cjnII0NNul40TOXqaBrUsfdO3tKhTefv3yY8c-qJemf5UEF8WbGQg8Hd_hR8FLFMG37wYrA8m4hNkVCyrYgNIl4hTI93PcKO9Nx5KtRWjNkHQgq66b3vE7Ni1HPmSa77tfSt5I3VJEetlRrEJDypOL82rKag1MMIWSF8eoFY9WZ2LZj7q02WWgS4GcYgOpwlvxY-2qX1p1s_PqQDsvFaCy0IyQDNKYSbQUl-QCCY9dyD6ogO8MibqDH5HPJ51OGmHhlMN9c1vgLQFHmKfEK0MSOifjbFUe-jVz6k_27dXk-xpD1oKXHUz62JImys2JFAR3IItiAQ0yDppcASLSAdYgJdmD_jfQaewNT9rrTmXHUngkZyyaWngyPm3Md-CRZTyQwFnAGNXHMlIeL4GKD1zOfulE4ExH80OXUQkjFQiSZynYxfw12qmkTEwRpQtnQ5L5L-7sXB52NL5iibplE2N7Vg7VARTawvucUGZCCQTUQnipwC5Pg_AEX1sHp9SJXiap1oP3cxzmLUqOmWQDIoScMCPsJdSVsfE_IwT9pFNjfBJFm88SUUlxlNftTgzKG8Jx6McrQwU7BV_ST61ZBtQtLFMDffLT76BCi1gjAqHLEvnvbi1bl7M0-iBFd2UdLnMVSs"/>
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
                        url='https://youtu.be/rVn2NCgCVLU'
                        width='100%'
                        height='100%'
                      />
              </div>
          </div>
          </Card.Header>
          <Card.Header className="col-8">This is</Card.Header>
        </div>
      </Container>
      );
}
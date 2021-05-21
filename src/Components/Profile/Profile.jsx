import React, { useState, useEffect, useContext } from "react";
import { AuthContext, UserDataContext } from "../../App";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {useCookies} from 'react-cookie';

import { Container, Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Profile(props){
    const {cookieJWT} =  useContext(AuthContext);
    const {userData, setuserData} = useContext(UserDataContext)
    const [full_name, setfull_name] = useState("");
    const [email , setemail] = useState("");
    const [password, setpassword] = useState("");
    const [repassword, setrepassword] = useState("");
    const [oldpassword, setoldpassword] = useState("");
    useEffect(() => {
        test()
    }, []);

    const handlepasswordChange = event =>{
        setpassword(event.target.value);
    }
    const handlerepasswordChange = event =>{
        setrepassword(event.target.value);
    }
    const handleoldpasswordChange = event =>{
        setoldpassword(event.target.value);
    }

    const handlefullnameChange = event =>{
        setfull_name(event.target.value);
    }

    const handleSubmit = event =>{

        const inputData = {email, full_name};
            update_fullname(inputData);
       
        event.preventDefault();
    }

    const handlePasswordSubmit =event =>{
        const inputData = {email, full_name, password, oldpassword};
        if (password===repassword){
            update_password(inputData);
        }else{
            alert("repassword error");
        }
        event.preventDefault();
    }

    async function update_password(inputData){

        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;

        const response = await fetch("http://localhost:8000/api/updatepassword", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              "Authorization": bearer
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(inputData)
        });
        if(response.status==200){
            let res = await response.json();
            console.log(res);
            setuserData(res);
            setpassword("");
            setoldpassword("");
            setrepassword("");
        } 
    }


    async function update_fullname(inputData){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;

        const response = await fetch("http://localhost:8000/api/updatefullname", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              "Authorization": bearer
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(inputData)
        });
        if(response.status==200){
            let res = await response.json();
            setuserData(res);
            setfull_name(res['full_name']);
        } 
    }

    async function test(){   
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
            setfull_name(res['full_name']);
            setemail(res['email']);
        }    
    }

    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-3">
                    <h4 className="my-4">Update Profile Data</h4>
                  <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control type="email" placeholder="Enter email" value={userData['email']} readOnly />
                          <Form.Text className="text-muted">
                          Enter your correct email address
                          </Form.Text>
                      </Form.Group>

                      <Form.Group controlId="formBasicEmail">
                          <Form.Label>Full name</Form.Label>
                          <Form.Control type="text" onChange={handlefullnameChange} name="full_name" placeholder="Full name" value={full_name} />
                      </Form.Group>
                      
                      <Button variant="success" className="btn btn-md success float-right" type="submit">
                          Update profile
                      </Button>
                      </Form>
                  </div>

                  <div className="col-md-6 offset-3">
                    <h4 className="my-4">Update password</h4>
                  <Form onSubmit={handlePasswordSubmit}>
                        <Form.Group controlId="formBasicPassword">
                          <Form.Label>Old Password</Form.Label>
                          <Form.Control name="oldpassword" value={oldpassword} onChange={handleoldpasswordChange} type="password" placeholder="Old Password" />
                        </Form.Group>
                      <Form.Group controlId="formBasicPassword">
                          <Form.Label>New Password</Form.Label>
                          <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={handlepasswordChange} />
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword">
                          <Form.Label>Repeat Password</Form.Label>
                          <Form.Control type="password" placeholder="Repeat Password" name="repassword" value={repassword} onChange={handlerepasswordChange} />
                      </Form.Group>

                      <Button variant="success" className="btn btn-md success float-right" type="submit">
                          Update password
                      </Button>
                      </Form>
                  </div>
              </div>
        </div>
      </>
      );
}

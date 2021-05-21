import React from "react";
import {FormControl, Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { AuthContext, UserDataContext } from "../../App";
import {useCookies} from 'react-cookie';
import { useState, useEffect, useContext } from "react";


function Header(props){

    const {cookieJWT, removeCookieJWT} =  useContext(AuthContext);
    const {userData, setuserData} = useContext(UserDataContext)

    const handleLogoutClick = event =>{
        removeCookieJWT('jwt');
        window.location.replace("/login");
    }

    const [text, settext] = useState("");

    const handleSearchchange = event =>{
        settext(event.target.value)
    }

    const handlesubmit = event =>{
        console.log(text);
        SearchMovie()
    }

    async function SearchMovie(){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        let response;
        if(text.length>0){
            response = await fetch("http://localhost:8000/movie/search/"+text, {
        method:'GET',
        headers: {
        "Content-Type": "application/json",
        "Authorization": bearer
        }
    });
        }else{
            response = await fetch("http://localhost:8000/movie/allMovies", {
            method:'GET',
            headers: {
            "Content-Type": "application/json",
            "Authorization": bearer
            }
    });
    }
    if(response.status===200){
        let search_data = await response.json();
        console.log(search_data)
        props.setSearch_data(search_data);
    }
    }
    

    return (
        <div className="header">
            <div className="container fluid headerButtons">
                <div className="row">
                    <div className="col-1 mr-4">
                        <DropdownButton  id="dropdown-basic-button" variant="danger" title="Categories">
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <div className="col-6">
                        <Form onSubmit={handlesubmit}>
                            <div className="row">
                            <FormControl type="text" onChange={handleSearchchange} value={text} placeholder="Search" className="mr-sm-2 ml-3 col-8" />
                            <Button variant="outline-info" onClick={handlesubmit}>Search</Button>
                            </div>
                        </Form>
                    </div>
                    <div className="col-4">
                        <div className="navtext">
                            { userData['full_name'] !== undefined ?
                                <>
                                <a href="#" className="ml-2"  onClick={handleLogoutClick}>Logout</a>
                                    <a href="/profile" className="ml-2">{userData.full_name}</a>
                                    
                                </>
                            :
                                <>
                                    <a href="/login" className="ml-2">Login</a>
                                    <a href="/register" className="mr-auto">Registration</a>
                                </>
                            }
                        </div>
                    </div>
            </div>
            </div>
        </div>
       
    )
}

export default Header;
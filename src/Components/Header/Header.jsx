import React from "react";
import {FormControl, Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
// import { Link, NavLink } from "react-router-dom";

function Header(props)
{
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
                        <Form>
                            <div className="row">
                            <FormControl type="text" placeholder="Search" className="mr-sm-2 ml-3 col-8" />
                            <Button variant="outline-info">Search</Button>
                            </div>
                        </Form>
                    </div>
                    <div className="col-4">
                        <div className="navtext">
                            <a href="#" className="ml-2">Login</a>
                            <a href="#" className="mr-auto">Registration</a>
                        </div>
                    </div>
            </div>
            </div>
        </div>
       
    )
}


export default Header;
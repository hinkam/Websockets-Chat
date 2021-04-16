import React, { Component } from "react";
import { Button, Col, Container, Form, Nav } from "react-bootstrap";
import { Redirect } from "react-router-dom";


interface SignupPageState {
    username: string
    password: string
    rpassword: string
    warningVisibility: 'hidden' | 'visible'
}

interface SignupPageProps {
    isLogged: boolean
}


export class SignupPage extends Component<SignupPageProps, SignupPageState> {

    constructor(props: SignupPageProps){
        super(props);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleRPassword = this.handleRPassword.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.state = {
            username: '',
            password: '',
            rpassword: '',
            warningVisibility: 'hidden'
        };
    }

    handleUsername(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ username: event.target.value });
    }

    handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ password: event.target.value });
    }

    handleRPassword(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ rpassword: event.target.value });
    }


    async onButtonClick() {
        if (this.state.password.length > 0 && (this.state.password == this.state.rpassword)){
            const result = await fetch('/api/auth/signup', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            });
            if (!result.ok){
                alert('Signup failure');
            } else {
                return;
            }
        } else {
            this.setState({ warningVisibility: 'visible' })
        }
    }


    render(): JSX.Element {
        if (this.props.isLogged){
            return(
                <Redirect to='/'/>
            );
        } else {
            return(
                <>
                    <Nav variant="tabs" style={{ paddingLeft: 30}} className="border-bottom border-primary">
                        <h2>
                            Just a basic little chat
                        </h2>
                    </Nav>
                    <Container style={{ maxWidth: 600, marginTop: 120, padding: 20  }} className="border border-primary">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" value={this.state.username} onChange={this.handleUsername}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handlePassword}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Repeat password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={this.state.rpassword} onChange={this.handleRPassword}/>
                            </Form.Group>
                            <Form.Row>
                                <Col style={{ maxWidth: 100 }}>
                                    <Button variant="primary" onClick={this.onButtonClick}>
                                        Sign Up
                                    </Button>
                                </Col>
                                <Col style={{textAlign: "right", color: "red", visibility: this.state.warningVisibility}}>
                                    Passwords don't match
                                </Col>
                            </Form.Row>
                        </Form>
                    </Container>
                </>
            );
    }
}
}
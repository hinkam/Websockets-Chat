import React, { Component } from "react";
import { Button, Col, Container, Form, Nav } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";


interface LoginPageState {
    username: string
    password: string
}

interface LoginPageProps {
    isLogged: boolean;
    onLogin: () => void
}

export class LoginPage extends Component<LoginPageProps, LoginPageState> {

    constructor(props: LoginPageProps, state: LoginPageState){
        super(props);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleUsername(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ username: event.target.value });
    }

    handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ password: event.target.value });
    }

    async onButtonClick() {
        if (this.state.password.length > 0){
            const result = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            });
            if (!result.ok){
                alert('Login failure');
            } else {
                this.props.onLogin();
            }
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
                    <Nav variant="tabs" style={{ paddingLeft: 30}} className="border-bottom border-primary flex">
                        <h2>
                            Just a basic little chat
                        </h2>
                    </Nav>
                    <Container style={{ maxWidth: 600, marginTop: 120, padding: 20 }} className="border border-primary">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" value={this.state.username} onChange={this.handleUsername}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handlePassword}/>
                            </Form.Group>
                            <Form.Row>
                                <Col style={{ maxWidth: 100 }}>
                                    <Button variant="primary" onClick={this.onButtonClick}>
                                        Sign In
                                    </Button>
                                </Col>
                                <Col style={{textAlign: "right"}}>
                                    Don't have account yet? You little retard, what are you waiting for!
                                </Col>
                                <Col style={{ maxWidth: 100 }}>
                                    <Link to="/signup">
                                        <Button variant="secondary">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Container>
                </>
            );
    }
}
}
import React, { Component } from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";
import { LoginPage } from "../login-page/login-page";
import { MainPage } from "../main-page/main-page";
import { SignupPage } from "../signup-page/signup-page";

import './index.css';

interface IndexPageState {
    isLogged: boolean
    username: string
}

// interface IndexPageProps {
// }

export class IndexPage extends Component<unknown, IndexPageState> {

    constructor(props: unknown){
        super(props);
        this.onLogout = this.onLogout.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.state = {
            isLogged: false,
            username: ''
        };
    }

    async componentDidMount(): Promise<void> {
        const response = await fetch('/api/user');
        if (response.status != 401) {
            const result = await response.json() as { username: string };
            this.setState({
                isLogged: true,
                username: result.username
            });
        }
    }

    async onLogout(){
        this.setState({ isLogged: false });
    }

    async onLogin(){
        this.setState({ isLogged: true });
    }

    render(): JSX.Element {
        return(
            <>
                <Switch>
                    <Route exact path="/"><MainPage isLogged = { this.state.isLogged } username = { this.state.username } onLogout = { this.onLogout }/></Route>
                    <Route path="/login"><LoginPage isLogged = { this.state.isLogged } onLogin = {this.onLogin }/></Route>
                    <Route path="/signup"><SignupPage isLogged = { this.state.isLogged }/></Route>
                </Switch>
            </>
        );
    }
}
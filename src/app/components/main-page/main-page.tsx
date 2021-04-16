import React, { Component } from "react";
import { Button, Col, Container, Form, Nav, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { MessageCard } from "./message-card";


interface MainPageState {
    messageBox: string
    messages: Array<MessageCard>
}

interface MainPageProps {
    isLogged: boolean
    username: string
    onLogout: () => void
}


export class MainPage extends Component<MainPageProps, MainPageState> {
    private client = new WebSocket('ws://localhost:3000');

    constructor(props: MainPageProps){
        super(props);
        this.handleMessageBox = this.handleMessageBox.bind(this);
        this.onLogoutButtonClick = this.onLogoutButtonClick.bind(this);
        this.onSendButtonClick = this.onSendButtonClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.state = {
            messageBox: '',
            messages: []
        }
    }

    componentDidMount(){
        this.client.onopen = (() => {
            console.log('Opened WS connection');
        });

        this.client.onmessage = ((response) => {
            const message = JSON.parse(response.data);
            const messageCard = new MessageCard({username: message.username, message: message.messageBox});
            
            this.setState((prevState) => ({messages: prevState.messages.concat(messageCard)}));
        });

        this.client.onclose = (() => {
            console.log('Closed WS connection');
        });
    }


    handleMessageBox(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ messageBox: event.target.value });
    }

    async onLogoutButtonClick(){
        const result = await fetch("/api/auth/logout", {
            method: 'DELETE'
        })
        if (!result.ok){
            alert('Logout failure');
        } else {
            this.props.onLogout();
        }
    }

    sendMessage(){
        this.client.send(JSON.stringify({ username: this.props.username, messageBox: this.state.messageBox }))
        this.setState({
            messageBox: ''
        })
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        this.sendMessage();
    }

    onSendButtonClick(){
        this.sendMessage();
    }

    render(): JSX.Element {
        if (!this.props.isLogged){
            return(
                <Redirect to='/login'/>
            );
        }
        return(
            <>
                <Container fluid="xl" className="container-fluid h-100 d-flex flex-column" style={{maxWidth: "100%", padding: 0, margin: 0}}>
                    <Nav variant="tabs" style={{ justifyContent: "space-between", alignItems: "center" }}
                        className="border-bottom border-primary">
                        <Container>
                        <Row className="justify-content-between" style={{padding: 6}}>
                            <h3>Just a basic little chat</h3>
                            <Button className="d-flex align-items-center" style={{ height: 35 }} onClick={this.onLogoutButtonClick}>Logout</Button>
                        </Row>
                        </Container>
                    </Nav>
                    <Container className="container-fluid border flex-fill d-flex flex-column" style={{ padding: 0, marginTop: 10, marginBottom: 30 }}>
                        <Container className="flex-fill" style={{ padding: 0, height: "80vh", overflowY: "auto" }}>
                            {this.state.messages.map((message, i) => {
                                return (<MessageCard key={`${i}`} username={message.props.username} message={message.props.message}/>)
                            })}
                        </Container>
                        <Container style={{ padding: 8, minHeight: 40 }} className="border-top">
                            <Form className="container-fluid" onSubmit={this.onSubmit}>
                                <Form.Row className="align-items-center justify-content-center">
                                    <Col className="col-9">
                                    <Form.Control placeholder="Напишите сообщение..." value={this.state.messageBox} onChange={this.handleMessageBox}/>
                                    </Col>
                                    <Col className="col-2">
                                    <Button variant="primary" onClick={this.onSendButtonClick}>Отправить</Button>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Container>
                    </Container>
                </Container>
            </>
        );
        }
}
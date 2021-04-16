import React, { Component } from "react";
import { Card } from "react-bootstrap";


interface MessageCardProps{
    username: string
    message: string
}

export class MessageCard extends Component<MessageCardProps>{
    constructor(props: MessageCardProps){
        super(props);
    }


    render(): JSX.Element {
        return(
            <Card style={{margin: 5}}>
                <Card.Header>{this.props.username}</Card.Header>
                <Card.Text style={{padding: 10}}>{this.props.message}</Card.Text>
            </Card>
        );
    }
}
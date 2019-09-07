import React, {Component} from 'react';
import {VERIFY_USER} from '../Events';
import {Button, Form} from "react-bootstrap";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            error:""
        };
    }

    setUser = ({user, isUser}) => {
        console.log(user, isUser);
        if(isUser) {
            this.setError("User name is taken")
        }
        else {
            this.props.setUser(user)
            this.setError("")
        }
    };

    setError = (error) => {
        this.setState({error})
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {socket} = this.props;
        const {username} = this.state;
        socket.emit(VERIFY_USER, username, this.setUser)
    };

    handleChange = (e) => {
        this.setState({username: e.target.value})
    };


    render() {
        const { username, error} = this.state;
        return (
            <div className="login">
                <h1>Sezzle Calculator Demo</h1>
                <br/>
                <br/>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <h2>Enter Your Username</h2>
                        <Form.Control
                            ref={(input) =>{this.textInput = input}}
                            type="text"
                            value={username}
                            onChange={this.handleChange}
                            placeholder={'Enter Username'} />
                    </Form.Group>
                    <Button variant="success"
                            onClick={this.handleSubmit}
                            name='join'
                    >Join Room</Button>
                </Form>
            </div>
        );
    }
}
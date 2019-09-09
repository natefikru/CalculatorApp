import React, {Component} from 'react'
import io from 'socket.io-client'
import {USER_CONNECTED, LOGOUT, CALCULATOR_START, CALCULATION_RECEIVED} from '../Events'
import Login from './Login'
import CalcContainer from '../calculator/CalcContainer'

const socketUrl = "54.14.162.51:3231";

export default class Layout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            socket:null,
            user: null,
            calculations: []
        };
    }

    componentWillMount() {
        this.initSocket()
    }


    initSocket = () => {
      const socket = io(socketUrl);
      socket.on('connect', () => {
          console.log("connected");
          this.setState({socket});
          socket.emit(CALCULATOR_START);
          socket.on(CALCULATION_RECEIVED, (calculations) => {
              this.setState({calculations})
          })
      });
    };

    setUser = (user) => {
        const {socket} = this.state;
        socket.emit(USER_CONNECTED, user);
        this.setState({user})
    };

    logout = () => {
        const {socket} = this.state;
        socket.emit(LOGOUT);
        this.setState({user:null})
    };

    render() {
        const {title} = this.props;
        const {socket, user, calculations} = this.state;
        return (
            <div id="app-container">
                {
                    !user ?
                    <Login socket={socket} setUser={this.setUser} />
                    :
                    <CalcContainer socket={socket} user={user} calculations={calculations} logout = {this.logout}/>
                }
            </div>
        )
    }
}
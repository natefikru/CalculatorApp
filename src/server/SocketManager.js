
const io = require('./index.js').io;
const {VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, CALCULATION_SENT, CALCULATION_RECEIVED, LOGOUT, CALCULATOR_START} = require('../Events');
const {createUser} = require('../helpers');

let connectedUsers = { };
let calculationsList = [];

module.exports = function(socket) {
    console.log("socket id" + socket.id);

    socket.on(VERIFY_USER, (username, callback) => {
        if (isUser(connectedUsers, username)) {
            callback({isUser:true, user:null})
        } else {
            callback({isUser: false, user:createUser({name:username})})
        }
    });

    socket.on(CALCULATOR_START, () => {
        io.emit(CALCULATION_RECEIVED, calculationsList);
    });

    socket.on(CALCULATION_SENT, (calculation, user) => {
        console.log('calculation sent', user);
        calculationsList = addCalculation(calculationsList, calculation, user);
        socket.calculation = calculation;
        io.emit(CALCULATION_RECEIVED, calculationsList);
        console.log(calculationsList)
    });

    socket.on(USER_CONNECTED, (user) => {
        connectedUsers = addUser(connectedUsers, user);
        socket.user = user;
        io.emit(USER_CONNECTED, connectedUsers);
        console.log(connectedUsers);

    });

    socket.on('disconnect', () => {
        if("user" in socket) {
            connectedUsers = removeUser(connectedUsers, socket.user.name)

            io.emit(USER_DISCONNECTED, connectedUsers)
            console.log(connectedUsers)
        }
    })


};

function addUser (userList, user) {
    let newList = Object.assign({}, userList)
    newList[user.name] = user;
    return newList
}

function addCalculation(calculationsList, calculation, user) {
    let newList = [{
        value : calculation,
        name : user.name
    }].concat(calculationsList)
    if (newList.length === 11) {
        newList.length = 10
        return newList
    }
    else {
        return newList
    }

}

function removeUser(userList, username) {
    let newList = Object.assign({}, userList);
    delete newList[username];
    return newList
}

function isUser(connectedUsersList, username) {
    return username in connectedUsersList
}
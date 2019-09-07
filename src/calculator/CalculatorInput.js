import React, {Component} from 'react';
import { Button, Form, Col, Dropdown, Alert, Modal} from 'react-bootstrap';
let happycalculator = require('happycalculator');


export default class CalculatorInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            operator : 'Operator',
            input1: '',
            input2: '',
            value: '',
            show: false
        }
    }
     onChange = (e) => {
         if (e) {
             if(e.target.type === 'operator'){
                 this.setState({
                     operator : e.target.name
                 })
             }
         }
    };

    onType = (e) => {
        if(e) {
            if (e.target.name === 'input1') {
                this.setState({
                    input1 : e.target.value,
                })
            }
            else if (e.target.name === 'input2') {
                this.setState({
                    input2 : e.target.value
                })
            }
        }
    };

    onSubmit = (e) => {
        if (!isNaN(Number(this.state.input1)) && !isNaN(Number(this.state.input2)) && this.state.operator !== 'Operator') {
            let formula = `${this.state.input1} ${this.state.operator} ${this.state.input2}`;
            let output = happycalculator.calculate(formula);
            let calculationString = `${formula} = ${output}`;
            this.props.sendCalculation(calculationString)
        }
        else {
            this.setShow(true);
            console.log('error in computation')
        }
    };

    setShow = (show) => {
        this.setState({show: show})
    };



    render() {
        const {show} = this.state;
        return (

            <div>
                <Alert show={this.state.show} variant="danger" onClose={() => this.setShow(false)} dismissible>
                    <Alert.Heading>You got an error!</Alert.Heading>
                    <p>
                        Make sure you are using numbers to calculate
                    </p>
                </Alert>
                <Form>
                    <Form.Row>
                        <Col>
                            <Form.Control placeholder="Input 1"
                                          name='input1'
                                          onChange={this.onType}
                            />
                        </Col>
                        <Dropdown>
                            <Dropdown.Toggle variant="info" id="dropdown-basic">
                                {this.state.operator}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={this.onChange}
                                               name='+'
                                               type='operator'
                                >+</Dropdown.Item>
                                <Dropdown.Item onClick={this.onChange}
                                               name='-'
                                               type='operator'
                                >-</Dropdown.Item>
                                <Dropdown.Item onClick={this.onChange}
                                               name='*'
                                               type='operator'
                                >*</Dropdown.Item>
                                <Dropdown.Item onClick={this.onChange}
                                               name='/'
                                               type='operator'
                                >/</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Col>
                            <Form.Control placeholder="Input 2"
                                          name='input2'
                                          onChange={this.onType}
                            />
                        </Col>
                        <Button variant="success"
                            onClick={this.onSubmit}
                            name='calculate'
                        >Submit</Button>
                    </Form.Row>
                </Form>
            </div>
        )
    }

}
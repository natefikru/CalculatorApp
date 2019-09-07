import React, {Component} from 'react';
import CalculationList from './CalculationList'
import CalculatorInput from "./CalculatorInput";
import {CALCULATION_SENT, CALCULATOR, CALCULATION_RECEIVED, CALCULATOR_START} from '../Events';


export default class CalcContainer extends Component {
    constructor(props) {
        super(props);
        this.state= {
            calculations: this.props.calculations,
            user: this.props.user
        };
    }

    componentDidMount() {
        const { socket } = this.props;
        socket.emit(CALCULATOR_START, (calculations) => {
            console.log('init', calculations);
        });

        socket.on(CALCULATION_RECEIVED, (calculations) => {
            this.setState({calculations})
        })
    }


    sendCalculation = (calculation) => {
        const { socket } = this.props;
        // const {calculations} = this.state;

        socket.emit(CALCULATION_SENT, {calculation}, this.state.user);
        socket.on(CALCULATION_RECEIVED, (calculations) => {
            this.setState({calculations})
        })
    };

    setActiveCalculator = (activeCalculator) => {
        this.setState({activeCalculator})
    };




    render() {
        const {user, logout} = this.props;
        return (
            <div>
                <h2>Enter Calculation</h2>
                <CalculatorInput
                    sendCalculation={
                        (calculation) => {
                            this.sendCalculation(calculation)
                        }
                    }
                />
                <br/>
                <br/>
                <CalculationList
                    calculations={this.state.calculations}
                    user={user}
                />
            </div>

        )
    }
}
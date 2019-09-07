import React, {Component} from 'react';
import { Table, Button } from 'react-bootstrap';


export default class CalculationList extends Component {
    constructor(props) {
        super(props);
        this.state= {
            calculations:[]
        };
    }

    componentDidMount() {
        const {socket} = this.props;

    }

    render() {
        const {calculations, user} = this.props
        return (
            <div ref='container'>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Calculation</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        calculations.map((calc, i) => {
                            console.log(calc)
                            return (
                                <tr key={i}>
                                    <td>{calc.name}</td>
                                    <td>{calc.value.calculation}</td>
                                </tr>

                            )
                        })
                    }
                    </tbody>
                </Table>
            </div>
        );
    }
}
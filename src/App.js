import React, {Component} from 'react'
import Layout from './components/Layout'
import './App.css';

class App extends Component {
  render(){
    return (

        <div className="container">
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                crossOrigin="anonymous"
            />

            <Layout title="Calc App" />
        </div>
    )
  }
}

export default App;

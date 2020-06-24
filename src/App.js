import React, { Component } from 'react'
import './App.css';
import Timer from "./components/Timer";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import Navbar from 'react-bootstrap/Navbar'
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  }

  async componentDidMount() {
    try {
      // Get token from url /?jwt=<JWT_TOKEN>
      const token = this.props.location.search.split("=")[1]
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const url = process.env.REACT_APP_SERVER_URL

      const response = await axios.get(url, config)
      this.setState({
        username: response.data.payload.name
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Update total time
  updateTotalTimer = (time, timer) => {
    if (timer === 1) {
      this.setState({
        minutes: time
      })
    } else if (timer === 2) {
      this.setState({
        seconds: time
      })
    } else if (timer === 3) {
      this.setState({
        miliseconds: time
      })
    }
  }

  // Reset total time
  resetTimer = (timer) => {
    if (timer === 1) {
      this.setState({
        minutes: 0
      })
    } else if (timer === 2) {
      this.setState({
        seconds: 0
      })
    } else if (timer === 3) {
      this.setState({
        miliseconds: 0
      })
    }
  }

  render() {
    const { username, minutes, seconds, miliseconds } = this.state;

    return (
      <div className="App">
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Timer App</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {username}
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <Container>
          <Card className="mx-auto my-5" style={{ width: '18rem' }}>
            <Card.Body>
              <h1>Total Timer</h1>
              <h2>{minutes}:{seconds}.{miliseconds}</h2>
            </Card.Body>
          </Card>
          <hr />
          <Row>
            <Col xs={12} md={4}>
              <Timer onResetTimer={this.resetTimer} timer={1} onUpdateTimer={this.updateTotalTimer} title="Timer 1" incrementSize={10000} />
            </Col>
            <Col xs={12} md={4}>
              <Timer onResetTimer={this.resetTimer} timer={2} onUpdateTimer={this.updateTotalTimer} title="Timer 2" incrementSize={1000} />
            </Col>
            <Col xs={12} md={4}>
              <Timer onResetTimer={this.resetTimer} timer={3} onUpdateTimer={this.updateTotalTimer} title="Timer 3" incrementSize={100} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;

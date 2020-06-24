import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0,
      startBtnText: 'Start'
    };
  }

  // Start/Pause the timer
  start = () => {
    const btnText = this.state.startBtnText;

    if (btnText === 'Start') {
      this.setState({ startBtnText: 'Pause' })

      this.myInterval = setInterval(() => {
        if (this.props.timer === 1) {
          this.setState(({ minutes }) => ({
            minutes: minutes + 1
          }))
          this.props.onUpdateTimer(this.state.minutes, 1);
        } else if (this.props.timer === 2) {
          this.setState(({ seconds }) => ({
            seconds: seconds + 1
          }))
          this.props.onUpdateTimer(this.state.seconds, 2);
        } else if (this.props.timer === 3) {
          this.setState(({ miliseconds }) => ({
            miliseconds: miliseconds + 1
          }))
          this.props.onUpdateTimer(this.state.miliseconds, 3);
        }
      }, this.props.incrementSize)
    } else if (btnText === 'Pause') {
      this.setState({ startBtnText: 'Start' })
      clearInterval(this.myInterval)
    }
  }

  // Reset the timer
  reset = () => {
    this.setState({
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    })
    if (this.props.timer === 1) {
      this.props.onResetTimer(1);
    } else if (this.props.timer === 2) {
      this.props.onResetTimer(2);
    } else if (this.props.timer === 3) {
      this.props.onResetTimer(3);
    }
  }

  render() {
    const { minutes, seconds, miliseconds, startBtnText } = this.state

    return (
      <Container>
        <Card className="mx-auto my-2" style={{ maxWidth: '18rem' }}>
          <Card.Body>
            <h2>{this.props.title}</h2>
            <h3 className="mb-4">{minutes}:{seconds}.{miliseconds}</h3>
            <Row>
              <Col xs={6}>
                <Button onClick={this.start} variant="primary">{startBtnText}</Button>
              </Col>
              <Col xs={6}>
                <Button onClick={this.reset} variant="danger">Reset</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    )
  }
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  incrementSize: PropTypes.number.isRequired,
};

export default Timer

import React from 'react'
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

interface IProps {
  visible?: boolean,
  crew_points: number,
  total_points: number
}

const Crewpoints = styled.div`
  font-size: 3rem;
  margin-right: auto;
  color: #000;
  @media only screen and (max-width: 640px) {
    text-align: center;
  }
`

const Totalpoints = styled.div`
  font-size: 3rem;
  margin-left: auto;
  color: #000;
  @media only screen and (max-width: 640px) {
    text-align: center;
  }
`

const Result = (props: IProps) => {

  return props.visible ? (
  <Row>
    <Col lg='6' className="text-left">
      <Crewpoints>Crew points: {props.crew_points}</Crewpoints>
    </Col>
    <Col lg='6' className="text-right">
      <Totalpoints>Total points: {props.total_points}</Totalpoints>
    </Col>
  </Row>
  ) : null;
}

export default Result;
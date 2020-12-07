import React from 'react'
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

interface IProps {
  visible?: boolean,
  crew_hours: number,
  total_hours: number
}

const CrewHours = styled.div`
  font-size: 3rem;
  margin-right: auto;
  color: #000;
  @media only screen and (max-width: 640px) {
    text-align: center;
  }
`

const TotalHours = styled.div`
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
      <CrewHours>Crew Hours: {props.crew_hours}</CrewHours>
    </Col>
    <Col lg='6' className="text-right">
      <TotalHours>Total Hours: {props.total_hours}</TotalHours>
    </Col>
  </Row>
  ) : null;
}

export default Result;
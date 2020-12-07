import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Result from './Result'
import { Spinner } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

declare var gapi: any;

interface IProps {
}

interface IState {
  searching?: boolean;
  loaded?: boolean;
  crew_points?: number;
  total_points?: number,
  error?: boolean;
  showErrorModal?: boolean;
}

class AppMain extends React.Component<IProps, IState> {
  private input = React.createRef<HTMLInputElement>();

  constructor(props) {
    super(props);

    this.state = { searching: false, loaded: false, crew_points: 0, total_points: 0};
    this.loadData = this.loadData.bind(this);
  }

  findpoints = (range, id): {'crew': number, 'total': number} | null => {
    //console.log(range)
    for (var i = 0; i < range.length; i++) {
      var donations = range[i]
      if(donations[4] && (donations[4].toLowerCase() === id.toLowerCase())) {
        console.log(donations)
        return {"crew": donations[1] as unknown as number, "total": donations[3] as unknown as number };
      }
    }
    return null
  }

  loadData = async (e) => {
    var found = false;
    const val = this.input.current
    if(val) {
      this.setState({searching: true, loaded: true})
      const email = val.value;
      gapi.client.sheets.spreadsheets.values.batchGet({
        spreadsheetId: '1_l0zbas3IaxCepaFD4I3m302Cco376D-sDLxMnJ8JZc',
        ranges: ['Non-thespians!F2:J', 'Thespians!F2:J'],
      }).then(response => {
        this.setState({searching: false})
        console.log(response.result.valueRanges[0].values)
        var ranges = response.result.valueRanges;
        for(var i = 0; i < ranges.length; i++) {
          var points = this.findpoints(ranges[i].values, email);
          if(points) {
            found = true;
            this.setState({crew_points: points['crew'], total_points: points['total']})
          }
        }
        if(!found) {
          this.setState({
            error: true,
            showErrorModal: true,
            loaded: false,
          })
        }
      })
    }
    console.log(gapi);
    e.preventDefault()
  }


  render() {
    return (
      <Container>
      <Row>
        <Col lg="12" className="text-center">
          <h1 className="mt-5">Check your Thespian Points!</h1>
          <p className="lead">Enter your student email below.</p>
        </Col>
      </Row>
      <Form onSubmit={this.loadData} >
        <InputGroup className="mb3">
          <Form.Control as="input" name="id" type="email" placeholder="Enter your student email here" autoComplete="off" ref={this.input as React.RefObject<any>}></Form.Control>
          <InputGroup.Append>
            <Button variant="outline-primary" type="submit" >
              {this.state.searching ?
              <Spinner animation="border" role="status" variant="light"><span className="sr-only">Loading...</span></Spinner> :
              "Search"}
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      <Result visible={this.state.loaded} crew_points={this.state.crew_points} total_points={this.state.total_points} />
      <br />
      <Row>
        <Col lg="12" className="">
        <p>At Niles North, to be inducted you must earn 10 points, 2 of which must come from crew and other backstage work. One point is roughly equivalent to 10 hours of work.</p>
        <p>To maintain thespian membership after being inducted, you must also earn additional 2 points per year in any area.</p>
        </Col>
      </Row>


      <Modal show={this.state.showErrorModal} onHide={() => this.setState({showErrorModal: false})}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Cannot find user in the Theatre database with the given email. Please note the database may not be updated for two weeks after show closing.

            <br /> <br />Please contact <a href="mailto:madbur2@nilesk12.org">Maddie Burroughs</a> for any questions.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.setState({showErrorModal: false})}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
  }
}

export default AppMain

import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { IoSearchOutline } from 'react-icons/io5'
function App() {
  return (
    <Container>
      <Row as={'header'} className='border-bottom border-primary'>
        <Col className='d-flex justify-content-center p-5'>
          <h1 className='text-primary font-monospace'>Feeds Gallery</h1>
        </Col>
      </Row>
      <Form className='d-flex justify-content-center'>
        <InputGroup className="my-5 w-50">
          <InputGroup.Text id="basic-addon1"><IoSearchOutline /></InputGroup.Text>
          <Form.Control
            placeholder="Search Tag"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <Button variant="primary" type="submit">
            OK
          </Button>
        </InputGroup>
      </Form>
      <Row>
        <Col className='d-flex justify-content-center'>
          <Card className='w-75 p-3 d-flex justify-content-center flex-column shadow'>
            <h4 className='text-center'>title</h4>
            <span className='text-center'>@author</span>
            <div className='w-100'>
              <figure>
                <img src='' alt='content-pic' />
                <figcaption className='text-center'>blah</figcaption>
              </figure>
            </div>
            <div className='d-flex justify-content-center'>
              <Button>Show more</Button>
            </div>
          </Card>
        </Col>
        {/* <Col className='bg-primary'>
          a
        </Col>
        <Col className='bg-warning'>
          a
        </Col> */}
      </Row>
      <Row className='py-5'>
        <Col className='d-flex justify-content-center w-full gap-4 align-items-center'>
          <Button>Prev</Button>
          <span>1</span>
          <Button>Next</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default App

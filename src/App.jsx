import { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { IoSearchOutline } from 'react-icons/io5'
function App() {
  const [feeds, setFeeds] = useState([])
  const [feed, setFeed] = useState({})
  const [errors, setErrors] = useState('')
  const [page, setPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchAPI = async () => {
    const res = await fetch('http://localhost:3333/feeds')
    const resBody = await res.json()
    if (resBody?.success) {
      setErrors('')
      setFeeds(resBody?.data)
      setFeed(resBody?.data[0])
    } else {
      setErrors('Error. There something wrong!!!')
    }
  }

  const onPrevPage = () => {
    if (page > 0) {
      setPage(page - 1)
      setFeed(feeds[page])
      setCurrentPage(currentPage - 1)
    }
  }
  const onNextPage = () => {
    if (page <= feeds.length - 2) {
      setPage(page + 1)
      setFeed(feeds[page])
      setCurrentPage(currentPage + 1)
    }
  }

  useEffect(() => {
    fetchAPI()
  }, [])

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
          {!errors ? (
            <Card className='w-75 p-3 shadow'>
              <div className='w-100'>
                <div className='d-flex flex-column justify-content-center'>
                  <div className='d-flex justify-content-center py-4'>
                    <img src={feed?.media?.m} alt='content-pic' />
                  </div>
                  <div className='d-flex flex-column justify-content-center py-4'>
                    {feed?.title ? <h4 className='text-center'>{feed?.title}</h4> : null}
                    <span className='text-center'>{feed?.author?.split('"')[1]}</span>
                  </div>
                  <div className='d-flex flex-column justify-content-center py-4'>
                    <span className='text-center'>Tag:</span>
                    <p className='text-center'>{feed?.tags ? feed?.tags : '-'}</p>
                  </div>
                </div>
              </div>
              {/* <div dangerouslySetInnerHTML={{ __html: feed?.description }}></div> */}
              <div className='d-flex justify-content-center'>
                <Button>Show more</Button>
              </div>
            </Card>
          ) : (
            <span className='my-4 fs-2 fw-bold text-danger'>{errors}</span>
          )}
        </Col>
      </Row>
      <Row className='py-5'>
        <Col className='d-flex justify-content-center w-full gap-4 align-items-center'>
          <Button onClick={onPrevPage}>Prev</Button>
          <span>{currentPage}</span>
          <Button onClick={onNextPage}>Next</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default App

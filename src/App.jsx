import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { IoSearchOutline } from 'react-icons/io5'
import CardPicture from './components/CardPicture'
function App() {
  const [feeds, setFeeds] = useState([])
  const [feed, setFeed] = useState({})
  const [errors, setErrors] = useState('')
  const [page, setPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchResult, setSearchResult] = useState([])

  const fetchAPI = async () => {
    const res = await fetch('https://aia-test-backend-ten.vercel.app/feeds')
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
    if (page >= 1) {
      setPage(page - 1)
      setFeed(feeds[page])
      setCurrentPage(currentPage - 1)
    }
  }
  const onNextPage = async () => {
    if (page <= feeds.length - 1 && page > 0) {
      await setPage(page + 1)
      setFeed(feeds[page])
      setCurrentPage(currentPage + 1)
    }
  }

  const handleSubmitSearch = (e) => {
    e.preventDefault()
    if (e.target[0].value.length) {
      const keywords = e.target[0].value
      const picSearch = feeds?.filter(e => e.tags.includes(keywords))
      setSearchResult(picSearch)
    } else {
      setSearchResult([])
    }
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  console.log((searchResult))

  return (
    <Container>
      <Row as={'header'} className='border-bottom border-primary'>
        <Col className='d-flex justify-content-center p-5'>
          <h1 className='text-primary font-monospace'>Feeds Gallery</h1>
        </Col>
      </Row>
      <Form className='d-flex justify-content-center' onSubmit={handleSubmitSearch}>
        <InputGroup className="my-5 w-50 d-flex flex-column">
          <div className='d-flex gap-3'>
            <div className='d-flex border rounded w-100'>
              <InputGroup.Text id="basic-addon1" className='border-0 rounded-0'><IoSearchOutline /></InputGroup.Text>
              <Form.Control
                name='tag'
                placeholder="Search Tag"
                aria-label="tag"
                className='shadow-none border-0'
              />
            </div>
            <button type="submit" className='border-0 rounded-right rounded-2 px-3 bg-primary text-white'>
              OK
            </button>
          </div>
        </InputGroup>
      </Form>
      <Row>
        <Col className={`d-flex justify-content-center ${searchResult.length ? 'flex-column align-items-center gap-5' : ''}`}>
          {!errors ? (
            <>
              {searchResult.length ? (
                searchResult.map(e => (
                  <CardPicture feed={e} key={e.author_id} type='search' />
                ))
              ) : <CardPicture feed={feed} />}
            </>
          ) : (
            <span className='my-4 fs-2 fw-bold text-danger'>{errors}</span>
          )}
        </Col>
      </Row>
      <Row className='py-5'>
        <Col className='d-flex justify-content-center w-full gap-4 align-items-center'>
          <Button disabled={currentPage === 1 || searchResult.length ? true : false} onClick={onPrevPage}>Prev</Button>
          <span>{searchResult.length ? '1' : currentPage}</span>
          <Button disabled={currentPage === feeds.length || searchResult.length ? true : false} onClick={onNextPage}>Next</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default App

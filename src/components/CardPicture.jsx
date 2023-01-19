import { Button, Card } from "react-bootstrap"

const CardPicture = ({ feed }) => {
  return (
    <Card className='w-75 p-3 shadow'>
      <div className='w-100'>
        <div className='d-flex flex-column justify-content-center'>
          <div className='d-flex justify-content-center py-4'>
            <img src={feed?.media?.m} alt='content-pic' data-testid='media_pic' />
          </div>
          <div className='d-flex flex-column justify-content-center py-4'>
            {feed?.title ? <h4 className='text-center' data-testid='title_feed'>{feed?.title}</h4> : null}
            <span className='text-center' data-testid="author_feed">{feed?.author?.split('"')[1]}</span>
          </div>
          <div className='d-flex flex-column justify-content-center py-4'>
            <span className='text-center'>Tag:</span>
            <p className='text-center' data-testid="tag_feed">{feed?.tags ? feed?.tags : '-'}</p>
          </div>
        </div>
      </div>
      {/* <div dangerouslySetInnerHTML={{ __html: feed?.description }}></div> */}
    </Card>
  )
}

export default CardPicture
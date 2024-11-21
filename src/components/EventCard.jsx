import React from 'react'
import { Card } from 'react-bootstrap'


const EventCard = () => {
  return (
    <div>
      <Card style={{ width: '18rem', padding:'0.2rem' }} className='rounded-4'>
      <Card.Img style={{objectFit:'cover'}} height={'200px'} className='rounded-4' vari="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm1mB4YzQ1sIQXFPdW6NLcIf8__IMYB84uokYSImV82vtEvU5q4GJ-7GQTQbnDG1iULvk&usqp=CAU" />
      <Card.Body>
        <Card.Title>Event Name</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Event owner</Card.Subtitle>
        <Card.Text className='text-wrap'>
          Some quick example text to build on the card title.
        </Card.Text>
        <div className='d-flex justify-content-between'>
          <Card.Link className='btn text-warning link-offset-2 link-underline-warning link-underline-opacity-0 link-underline-opacity-75-hover btn-link' >See more Details...</Card.Link>
          <Card.Link className='btn'><i className="fa-regular fa-bookmark text-warning"></i></Card.Link>
        </div>
      </Card.Body>
    </Card>
    </div>
  )
}

export default EventCard
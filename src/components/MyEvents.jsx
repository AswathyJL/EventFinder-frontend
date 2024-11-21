import React, { useContext, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import EventCard from './EventCard'
import AddEvent from './AddEvent'

const MyEvents = () => {
  return (
    <div style={{position:'relative'}}>
      <Row className='mt-3'>
          <Col className='mb-3' sm={12} md={6} lg={4}>
              <EventCard/>
          </Col>
          {/* <div className='text-danger fw-bolder'>Event not found!!!</div> */}
      </Row>
      
    </div>
  )
}

export default MyEvents
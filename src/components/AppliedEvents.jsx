import React from 'react'
import { Col, Row } from 'react-bootstrap'
import EventCard from './EventCard'


const AppliedEvents = () => {
  return (
    <Row className='mt-3'>
        <Col className='mb-3' sm={12} md={6} lg={4}>
            <EventCard/>
        </Col>
        {/* <div className='text-danger fw-bolder'>Event not found!!!</div> */}
    </Row>
  )
}

export default AppliedEvents
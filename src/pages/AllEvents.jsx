
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import EventCard from '../components/EventCard'
import Filter from '../components/Filter'


const AllEvents = () => {
  const [allEvents,setAllEvents]= useState([])
  console.log(allEvents);
  return (
    <>
      <div style={{paddingTop:'100px'}} className='px-2 px-md-5'>
        <div className="d-flex justify-content-between">
          <h1 className='text-primary'>All Events</h1>
          <Filter/>
        </div>
        <Row className='mt-3'>
            <Col className='mb-3' sm={12} md={6} lg={4}>
              <EventCard/>
            </Col>
            {/* <div className='text-danger fw-bolder'>Event not found!!!</div> */}
        </Row>
      </div>
    </>
  )
}

export default AllEvents
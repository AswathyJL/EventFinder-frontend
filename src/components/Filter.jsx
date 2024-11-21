import React, { useState } from 'react'
import { Form, Offcanvas, OverlayTrigger, Tooltip } from 'react-bootstrap'



const Filter = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <OverlayTrigger
        key="bottom"
        placement="bottom"
        overlay={
          <Tooltip>Filter
          </Tooltip>
        }
      >
        <button onClick={handleShow} style={{position:'relative'}} className='btn btn-primary rounded-circle p-3'><i className="fa-solid fa-sort"></i></button>
    </OverlayTrigger>

    <Offcanvas show={show} onHide={handleClose} placement="end" name="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='text-primary fw-semibold'>Event Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            {/* Show events by type */}
            <Form.Group controlId="filterByType" style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', marginTop:'0.25rem' }}>
              <Form.Label className='fw-semibold text-primary'>Event Type</Form.Label>
              <Form.Select>
                <option value="">All Types</option>
                <option value="workshop">Workshop</option>
                <option value="conference">Conference</option>
                <option value="webinar">Webinar</option>
                <option value="meetup">Meetup</option>
              </Form.Select>
            </Form.Group>
            {/* show events by location */}
            <Form.Group controlId="filterByLocation" style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', marginTop:'0.25rem' }}>
              <Form.Label className='fw-semibold text-primary'>Location</Form.Label>
              <Form.Control type="text" placeholder="Enter city or state" />
            </Form.Group>
            {/* show events by date */}
            <Form.Group controlId="filterByDate" style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', marginTop:'0.25rem' }}>
              <Form.Label className='fw-semibold text-primary'>Date</Form.Label>
              <Form.Control type="date"  />
              <Form.Control type="date"  className="mt-2" />
            </Form.Group>
            {/* show events by price range */}
            <Form.Group controlId="filterByPrice" style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', marginTop:'0.25rem' }}>
              <Form.Label className='fw-semibold text-primary'>Price Range</Form.Label>
              <Form.Check type="checkbox" label="Free"  />
              <Form.Control type="number" placeholder="Min Price"  />
              <Form.Control type="number" placeholder="Max Price"  className="mt-2" />
            </Form.Group>
            {/* popularity */}
            <Form.Group controlId="filterByPopularity" style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', marginTop:'0.25rem' }}>
              <Form.Label className='fw-semibold text-primary'>Popularity</Form.Label>
              {/* trending events based on high registration */}
              <Form.Select > 
                <option value="trending">Trending</option>
                <option value="new">Newly Added</option>
              </Form.Select>
            </Form.Group>
            {/* based on audience */}
            <Form.Group controlId="filterByAudience" style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', marginTop:'0.25rem' }}>
              <Form.Label className='fw-semibold text-primary'>Audience</Form.Label>
              <Form.Select >
                <option value="">All Audiences</option>
                <option value="students">Students</option>
                <option value="professionals">Professionals</option>
                <option value="kids">Kids</option>
                <option value="families">Families</option>
              </Form.Select>
            </Form.Group>
            {/* mode of event */}
            <Form.Group controlId="filterByEventType" style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', marginTop:'0.25rem' }}>
              <Form.Check type="radio" label="In-Person" name="eventType"  />
              <Form.Check type="radio" label="Virtual" name="eventType"  />
              <Form.Check type="radio" label="Hybrid" name="eventType"  />
            </Form.Group>
            {/* custom tags */}
            <Form.Group controlId="filterByTags" style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', marginTop:'0.25rem' }}>
              <Form.Label className='fw-semibold text-primary'>Tags</Form.Label>
              <Form.Control type="text" placeholder="Enter tags (e.g., Tech, Sports)"  />
            </Form.Group>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>

    <div style={{position:'absolute'}}>
      

    </div>
    </>
  )
}

export default Filter

import React from 'react'
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import EventCard from '../components/EventCard'
import Register from '../components/Register'
import ApplicantManagement from '../components/ApplicantManagement'



const EventDetail = () => {
  return (
    <>
        <div style={{paddingTop:'100px'}} className='px-2 px-md-5'>
            <h1 className='text-primary'>Event Name</h1>
            <Row className='mt-3'>
                <Col className='mb-3' sm={12} lg={6}>
                    <img style={{width:"100%",objectFit:'cover'}} className='img-fluid' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCthRyJ1Sh4X8HyhnyiqJLBxsULXwuz3TaRg&s" alt="" />
                </Col>
                <Col className='mb-3' sm={12} lg={6}>
                    <div className='d-flex flex-column flex-md-row justify-content-between align-items-start mt-3'>
                        {/* Event owner section */}
                        <div className='d-flex align-items-center'>
                            <img style={{width:'1.5rem', objectFit:'cover '}} className='rounded-circle' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe3oPvKsA05otgZYGFZmxk5WHLYTFKWOFaNA&s" alt="" />
                            <div  className='ms-1 '>
                                <h6 style={{fontSize:"0.8rem"}} className='text-body-tertiary'>Event posted by</h6>
                                <h5  style={{lineHeight:"0.1rem", fontSize:'1rem'}} className='text-body-secondary text-nowrap'>Event owner name</h5>
                            </div>
                        </div>
                        {/* location of event */}
                        <div className='d-flex align-items-center'>
                            <i style={{fontSize:'1.5rem'}} className="fa-solid fa-location-pin text-warning"></i>
                            <div  className='ms-1 '>
                                <h6 style={{fontSize:"0.8rem"}} className='text-body-tertiary'>Venue</h6>
                                <h5  style={{lineHeight:"0.1rem", fontSize:'1rem'}} className='text-body-secondary text-nowrap'>location, India</h5>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className='text-primary mt-5'>About Event</h3>
                        <p style={{textAlign:'justify'}} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, excepturi. Laudantium corporis, sint magni hic voluptatem enim laboriosam velit, ut porro cumque, molestiae illo vel. Ducimus molestias voluptas esse ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque mollitia consequuntur numquam dolores sunt ratione voluptatibus amet pariatur, qui ullam ipsam et aspernatur hic accusamus est voluptates voluptas! Nisi, recusandae!
                        Maiores deleniti recusandae quis numquam autem delectus necessitatibus architecto, blanditiis molestiae? Quas id alias odit nostrum assumenda labore recusandae, vero magnam numquam eius aut ipsum similique, et ullam vel maiores......</p>
                        <div className='d-flex justify-content-between mt-5 flex-column flex-md-row'>
                            {/* Date */}
                            <div className='d-flex align-items-start'>
                                <i style={{fontSize:'1.5rem'}} className="fa-regular fa-calendar text-warning"></i>
                                <div  className='ms-1 '>
                                    <h6 style={{fontSize:"0.8rem"}} className='text-body-tertiary'>Timing</h6>
                                    <h5  style={{lineHeight:"0.1rem", fontSize:'1rem'}} className='text-body-secondary text-nowrap'>From <span className='text-warning fw-medium'>dd-mm-yyy</span> to <span className='text-warning fw-medium'>dd-mm-yyy</span></h5>
                                </div>
                            </div>
                            {/* Time*/}
                            <div className='d-flex align-items-start flex-column flex-md-row'>
                                <i style={{fontSize:'1.5rem'}} className="fa-solid fa-clock text-warning"></i>
                                <div  className='ms-1 '>
                                    <h6 style={{fontSize:"0.8rem"}} className='text-body-tertiary'>Timing</h6>
                                    <h5  style={{lineHeight:"0.1rem", fontSize:'1rem'}} className='text-body-secondary text-nowrap'>00:00 am to 00:00 am</h5>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center mt-5'>
                            <Register/>
                            
                            <OverlayTrigger
                                key="bottom"
                                placement="bottom"
                                overlay={
                                  <Tooltip>Save Event
                                  </Tooltip>
                                }
                              >
                                <button className='btn '><i className="fa-regular fa-bookmark text-warning"></i></button>
                            </OverlayTrigger>
                        </div>
                    </div>

                </Col>
                {/* <div className='text-danger fw-bolder'>Event not found!!!</div> */}
            </Row>
            <div>
                <ApplicantManagement/>
            </div>
        </div>
        <div className='mt-5 px-2 px-md-5'>
          <h1 className='mb-5 text-primary'>Similar Events</h1>
          <marquee behavior="" direction="">
              <div className="d-flex">
                  <div className="me-5">
                      <EventCard />
                  </div>
              </div>
          </marquee>
          <button className='btn btn-link mt-5'>CLICK HERE TO VIEW MORE EVENTS...</button>
      </div>
    </>
  )
}

export default EventDetail

import React, { useContext, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import EventCard from '../components/EventCard'
import { Link } from 'react-router-dom'
import main from '../assets/main.png'
import { tokenAuthContext } from '../contexts/AuthContextAPI'


const Home = () => {
    const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
    useEffect(()=>{
        const token = sessionStorage.getItem("token");
        setIsAuthorised(!!token);
        },[])
        console.log(isAuthorised);
        
  return (
    <>
      <div style={{minHeight:'100vh', paddingTop:'100px'}} className="d-flex justify-content-center align-items-center rounded shadow w-100">
              <div className='container'>
                  <div className="row align-items-center">
                      <div className="col-lg-6">
                          <h1 className='text-primary' style={{fontSize:'5rem'}}><i className="fa-solid fa-map-location-dot"></i>{' '}
                          EventFinder</h1>
                          <p style={{textAlign:'justify'}} className='text-primary-emphasis mt-4 mb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et delectus asperiores magni dignissimos. Pariatur harum natus, veniam enim at ab totam nihil nam maiores similique, incidunt vitae maxime nulla nisi!</p>
                          {
                            isAuthorised ?
                            <Link to={'/dashboard'} className='btn btn-warning rounded-4'>CONTINUE TO EXPLORE</Link>
                            :
                            <Link to={'/login'} className='btn btn-warning rounded-4'>START TO EXPLORE</Link>
                          }
                      </div>
                      <div className='col-lg-1'></div>
                      <div className="col-lg-5">
                          <img style={{objectFit:'cover', width:'100%'}} className='img-fluid' src={main} alt="" />
                      </div>
                  </div>
              </div>
      </div>
      <div className='mt-5 text-center'>
          <h1 className='mb-5'>Explore Events Projects</h1>
          <marquee behavior="" direction="">
              <div className="d-flex">
                  <div className="me-5">
                      <EventCard />
                  </div>
              </div>
          </marquee>
          <button className='btn btn-link mt-5'>CLICK HERE TO VIEW MORE EVENTS...</button>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-5 flex-column">
          <h1>Our Testimonials</h1>
          <div className='d-flex align-items-center justify-content-evenly mt-3 w-100'>
          <Card style={{ width: '18rem' }}>
              <Card.Body>
                  <Card.Title className='d-flex justify-content-center align-items-center flex-column'><img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://cdn-icons-png.flaticon.com/512/219/219988.png" alt="" />
                  <span className='mt-1'>Max Miller</span></Card.Title>
                  <Card.Text>
                      <div className='d-flex justify-content-center mb-1'>
                          <i className='fa-solid fa-star text-warning'></i>
                          <i className='fa-solid fa-star text-warning'></i>
                          <i className='fa-solid fa-star text-warning'></i>
                          <i className='fa-solid fa-star text-warning'></i>
                      </div>
                      <div style={{textAlign:'justify'}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti nam enim, vero consequuntur vitae fugiat excepturi est praesentium iure ullam quis nihil neque aperiam quia suscipit quasi eius atque tenetur.</div>
                  </Card.Text>
              </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
              <Card.Body>
                  <Card.Title className='d-flex justify-content-center align-items-center flex-column'><img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://cdn4.vectorstock.com/i/1000x1000/36/98/male-user-circle-icon-black-avatar-vector-22753698.jpg" alt="" />
                  <span className='mt-1'>Thomas John</span></Card.Title>
                  <Card.Text>
                      <div className='d-flex justify-content-center mb-1'>
                          <i className='fa-solid fa-star text-warning'></i>
                          <i className='fa-solid fa-star text-warning'></i>
                          <i className='fa-solid fa-star text-warning'></i>
                          <i className='fa-solid fa-star text-warning'></i>
                      </div>
                      <div style={{textAlign:'justify'}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti nam enim, vero consequuntur vitae fugiat excepturi est praesentium iure ullam quis nihil neque aperiam quia suscipit quasi eius atque tenetur.</div>
                  </Card.Text>
              </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
              <Card.Body>
                  <Card.Title className='d-flex justify-content-center align-items-center flex-column'><img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvhRtMu2kfXZoCWKicfbHPozOzmtCiPZI0kg&s" alt="" />
                  <span className='mt-1'>Maya Yusef</span></Card.Title>
                  <Card.Text>
                      <div className='d-flex justify-content-center mb-1'>
                          <i className='fa-solid fa-star text-warning'></i>
                          <i className='fa-solid fa-star text-warning'></i>
                          <i className='fa-solid fa-star text-warning'></i>
                          <i className='fa-solid fa-star text-warning'></i>
                      </div>
                      <div style={{textAlign:'justify'}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti nam enim, vero consequuntur vitae fugiat excepturi est praesentium iure ullam quis nihil neque aperiam quia suscipit quasi eius atque tenetur.</div>
                  </Card.Text>
              </Card.Body>
          </Card>
          </div>
      </div>
    </>
  )
}

export default Home
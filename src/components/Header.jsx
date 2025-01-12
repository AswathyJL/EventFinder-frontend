
import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'



const Header = ({isAllEventsPage, isDashboardPage, isEventDetailPage}) => {
  return (
    <Navbar style={{zIndex:3}} className="border position-fixed w-100 rounded shadow-lg bg-primary">
        <Container>
          <Link to={'/'} style={{textDecoration:'none'}}>
            <Navbar.Brand style={{color:'white', fontSize:'2rem'}}>
            <i className="fa-solid fa-map-location-dot"></i>{' '}
            EventFinder
            </Navbar.Brand>
          </Link>
            {
              (isAllEventsPage || isDashboardPage || isEventDetailPage) &&
              <div className="ms-auto">
              <button className='btn text-white'>Logout   <i className="fa-solid fa-right-from-bracket"></i></button>
            </div>
            }
        </Container>
      </Navbar>
  )
}

export default Header
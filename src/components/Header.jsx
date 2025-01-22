
import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../contexts/AuthContextAPI'



const Header = ({isAllEventsPage, isDashboardPage, isEventDetailPage,isHomePage}) => {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
  const navigate = useNavigate()

  const shouldShowLogout = isAllEventsPage || isDashboardPage || isEventDetailPage ||(isHomePage && isAuthorised);

  const logout = ()=>{
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate("/")
  }
  return (
    <Navbar style={{zIndex:3}} className="border position-fixed w-100 rounded shadow-lg bg-primary">
        <Container>
          <Link to={'/'} style={{textDecoration:'none'}}>
            <Navbar.Brand style={{color:'white', fontSize:'2rem'}}>
            <i className="fa-solid fa-map-location-dot"></i>{' '}
            EventFinder
            </Navbar.Brand>
          </Link>
          <Link to={'/all-events'}></Link>
          {
            isAuthorised &&
            <div className='d-flex justify-content-center w-100'>
              <Link to={'/'} className='text-light text-decoration-none me-5 fs-5'>Home</Link>
              <Link to={'/all-events'} className='text-light text-decoration-none me-5 fs-5'>All Events</Link>
              <Link to={'/dashboard'} className='text-light text-decoration-none fs-5'>Dashboard</Link>
            </div>
          }
            { 
              shouldShowLogout &&
              <div className="ms-auto">
              <button onClick={logout} className='btn text-white text-nowrap'>Logout  <i className="fa-solid fa-right-from-bracket"></i></button>
            </div>
            }
        </Container>
      </Navbar>
  )
}

export default Header
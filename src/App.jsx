
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import EventDetail from './pages/EventDetail'
import AllEvents from './pages/AllEvents'
import Footer from './components/Footer'
import Header from './components/Header'


function App() {
  const location = useLocation();  // to get the current location

  // Determine if the current page is 'AllEvents' or 'Dashboard'
  const isAllEventsPage = location.pathname === '/all-events';
  const isDashboardPage = location.pathname === '/dashboard';
  const isEventDetailPage = location.pathname.includes('/event');

  return (
    <>
      <Header isAllEventsPage={isAllEventsPage} isDashboardPage={isDashboardPage} isEventDetailPage={isEventDetailPage}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth insideRegister = {true}/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/all-events' element={<AllEvents/>}/>
        <Route path='/:id/event' element={<EventDetail/>}/>
        {/* Optional catch-all route for unknown paths */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App

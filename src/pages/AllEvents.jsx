
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import EventCard from '../components/EventCard'
import Filter from '../components/Filter'
import { getAllEventsAPI } from '../services/allAPI'


const AllEvents = () => {
  const [searchKey,setSearchKey] = useState("")
  const [allEvents,setAllEvents]= useState([])
  console.log(allEvents);

  useEffect(()=>{
    getAllEvents()
  },[searchKey])
  const getAllEvents = async ()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getAllEventsAPI(searchKey,reqHeader)
        if(result.status == 200){
          setAllEvents(result.data)
        }
      } catch (err) {
        console.log(err);
        
      }
    }
  }

  
  return (
    <>
      <div style={{paddingTop:'100px'}} className='px-2 px-md-5'>
        <div className="d-flex justify-content-between">
          <h1 className='text-primary'>All Events</h1>
          <Filter/>
        </div>
        <Row className='mt-3'>
            {
              allEvents?.length>0 ?
                allEvents?.map(event=>(
                  <Col key={event?._id} className='mb-3' sm={12}  lg={4}>
                <EventCard displayData={event}/>
              </Col>
                ))
              
              :
              <div className='text-danger fw-bolder'>Event not found!!!</div>
            }
        </Row>
      </div>
    </>
  )
}

export default AllEvents
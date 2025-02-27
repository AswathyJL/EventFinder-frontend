
import React, { useContext, useEffect, useState } from 'react'
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import EventCard from '../components/EventCard'
import Register from '../components/Register'
import ApplicantManagement from '../components/ApplicantManagement'
import { useNavigate, useParams } from 'react-router-dom'
import { getEventDetailsAPI, getProfileAPI, getUserDetailsByIdAPI, removeEventAPI, saveEventAPI } from '../services/allAPI'
import AddEvent from '../components/AddEvent'
import { isApplicantDetailsUpdatedContext, isDeleteEventContext, isModifyEventContext } from '../contexts/ContextAPI'



const EventDetail = () => {
    const {isApplicantUpdated, setIsApplicantUpdated} = useContext(isApplicantDetailsUpdatedContext)
    const [isSaved, setIsSaved] = useState(false);
    const navigate = useNavigate()
    const {isDeleteEvent, setIsDeleteEvent} = useContext(isDeleteEventContext)
    const {isModifyEvent} = useContext(isModifyEventContext)
    const {id} = useParams()
    const [eventDetails, setEventDetails] = useState("")
    const [isOwner,setIsOwner] = useState(false)
    const [eventOwner, setEventOwner] = useState("")

  //   console.log("Event Owner ID:", eventOwner?._id);
  //   console.log("Event Details User ID:", eventDetails?.userId);
  //   console.log("Is Owner?", isOwner);
  //   console.log(eventOwner);
  //   console.log(eventDetails);
    

    useEffect(() => {
        // Fetch event details
        fetchEventDetails();
    }, [isModifyEvent]);

    
    
    useEffect(() => {
        // Fetch user details once eventDetails is available
        if (eventDetails?.userId) {
            getUserDetails(eventDetails.userId);
        }
    }, [eventDetails]); // Dependency ensures this runs when eventDetails changes
    
      
    useEffect(() => {
      if (eventDetails?.userId && eventOwner?._id) {
          // console.log("Comparing:", eventDetails.userId, eventOwner._id);
          setIsOwner(eventDetails.userId === eventOwner._id);
      }
  }, [eventDetails, eventOwner]); 
  // console.log(isOwner);
  

    const fetchEventDetails = async ()=>{
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader={
                "Authorization":`Bearer ${token}`
            }
            try {
                const result = await getEventDetailsAPI(id,reqHeader)
                // console.log(result);
                if(result.status == 200)
                {
                    setEventDetails(result.data)
                }
                
            } catch (err) {
                console.log(err);
                
            }
        }
    }

    const getUserDetails = async (id)=>{
        const token = sessionStorage.getItem("token")
        if(token){
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }
          try {
            const result = await getProfileAPI(reqHeader)
            // console.log(result);
            
            if(result.status == 200){
              setEventOwner(result.data[0])
              // setIsOwner(result.data._id === eventDetails?.userId)
            }
          } catch (err) {
            console.log(err);
            
          }
        }
      }

      const handleDeleteEvent = async (id) => {
        const token = sessionStorage.getItem("token");
      
        if (token) {
          console.log("Token:", token); // Debugging: check token
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          };
          try {
            const result = await removeEventAPI(id, reqHeader);
            console.log(result); // Debugging: check the response from the API
            if (result.status === 200) {
              setIsDeleteEvent(result.data);
              alert(`${eventDetails?.eventName} is deleted successfully!!`);
              navigate('/dashboard');
            }
          } catch (err) {
            console.log("Error occurred:", err);
          }
        } else {
          console.log("No token found");
        }
      };
      
    const saveEvent = async (eventId) => {
          if (isSaved) return; // Avoid duplicate saves
    
          const reqbody = { savedEvents:eventId };
          const token = sessionStorage.getItem("token");
          if (token) {
              const reqHeader = {
                  Authorization: `Bearer ${token}`,
              };
              try {
                  const result = await saveEventAPI(reqbody, reqHeader);
                  if (result.status === 200) {
                      setIsSaved(true); // Mark as saved
                      alert("Event is saved to your saved collections.");
                  }else if(result.status === 406){
                    // console.log(result);
                    alert(result.response.data);
                  }
              } catch (err) {
                  console.log(err);
              }
          }
      };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0'); // Ensures two digits
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

  return (
    <>
        <div style={{paddingTop:'100px'}} className='px-2 px-md-5'>
            <div className='d-flex justify-content-between'>
                <h1 className='text-primary'>{eventDetails?.eventName}</h1>
                { isOwner && <AddEvent displayData={eventDetails}/>}
            </div>
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
                                <h5  style={{lineHeight:"0.1rem", fontSize:'1rem'}} className='text-body-secondary text-nowrap'>{eventOwner?.username}</h5>
                            </div>
                        </div>
                        {/* location of event */}
                        <div className='d-flex align-items-center'>
                            <i style={{fontSize:'1.5rem'}} className="fa-solid fa-location-pin text-warning"></i>
                            <div  className='ms-1 '>
                                <h6 style={{fontSize:"0.8rem"}} className='text-body-tertiary'>Venue</h6>
                                <h5  style={{ fontSize:'1rem', textWrap:'wrap', maxWidth:'18rem'}} className='text-body-secondary'>{eventDetails?.location_city}, {eventDetails?.location_state}, India</h5>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className='text-primary mt-5'>About Event</h3>
                        <p style={{textAlign:'justify'}} >{eventDetails?.eventDescription}</p>
                        <div className='d-flex justify-content-between mt-5 flex-column flex-md-row'>
                            {/* Date */}
                            <div className='d-flex align-items-start'>
                                <i style={{fontSize:'1.5rem'}} className="fa-regular fa-calendar text-warning"></i>
                                <div  className='ms-1 '>
                                    <h6 style={{fontSize:"0.8rem"}} className='text-body-tertiary'>Calendar</h6>
                                    <h5  style={{lineHeight:"0.1rem", fontSize:'1rem'}} className='text-body-secondary text-nowrap'>From <span className='text-warning fw-medium'>{formatDate(eventDetails?.startDate)}</span> to <span className='text-warning fw-medium'>{formatDate(eventDetails?.endDate)}</span></h5>
                                </div>
                            </div>
                            {/* Time*/}
                            <div className='d-flex align-items-start flex-column flex-md-row'>
                                <i style={{fontSize:'1.5rem'}} className="fa-solid fa-clock text-warning"></i>
                                <div  className='ms-1 '>
                                    <h6 style={{fontSize:"0.8rem"}} className='text-body-tertiary'>Timing</h6>
                                    <h5  style={{lineHeight:"0.1rem", fontSize:'1rem'}} className='text-body-secondary text-nowrap'>{eventDetails?.startTime} to {eventDetails?.endTime}</h5>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center mt-5'>
                            <Register/>
                            
                            <div>
                                <OverlayTrigger
                                    key="save-event-bottom"
                                    placement="bottom"
                                    overlay={
                                      <Tooltip>Save Event
                                      </Tooltip>
                                    }
                                  >
                                    <button onClick={()=>saveEvent(eventDetails?._id)} className='btn '><i className="fa-regular fa-bookmark text-warning"></i></button>
                                </OverlayTrigger>
                                {
                                    isOwner && 
                                    <OverlayTrigger
                                    key="delete-event-bottom"
                                    placement="bottom"
                                    overlay={
                                      <Tooltip>Delete Event
                                      </Tooltip>
                                    }
                                  >
                                    <button onClick={() => handleDeleteEvent(id)} className='btn '><i className="fa-solid fa-trash text-danger"></i></button>
                                </OverlayTrigger>
                                }

                            </div>
                        </div>
                    </div>

                </Col>
                {/* <div className='text-danger fw-bolder'>Event not found!!!</div> */}
            </Row>
            {
                isOwner && 
                <ApplicantManagement/>
                
            }
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
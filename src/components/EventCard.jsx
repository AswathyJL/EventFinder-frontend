import React, { useContext, useEffect, useState } from 'react'
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { deleteSavedEventByIdAPI, getUserDetailsByIdAPI, saveEventAPI } from '../services/allAPI'
import { Link } from 'react-router-dom'
import { isSavedEventDeletedContext } from '../contexts/ContextAPI'


const EventCard = ({displayData, insideMyEvents, insideSavedEvents}) => {

  const {isSavedEventDeleted, setIsSavedEventDeleted} = useContext(isSavedEventDeletedContext)
  const [isSaved, setIsSaved] = useState(false);
  const [eventOwner,setEventOwner] = useState("")
  // console.log(displayData);
  useEffect(() => {
    if (displayData?.userId) {
        getUserDetails(displayData.userId);
    }
}, [displayData?.userId]);


  const getUserDetails = async (id)=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getUserDetailsByIdAPI(id,reqHeader)
        if(result.status == 200){
          setEventOwner(result.data)
        }
      } catch (err) {
        console.log(err);
        
      }
    }
  }

  
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

  const deleteSavedEvent = async (eventId) =>{
    const reqbody = {eventId}
    const token = sessionStorage.getItem("token");
      if (token) {
          const reqHeader = {
              Authorization: `Bearer ${token}`,
          };
          try {
              const result = await deleteSavedEventByIdAPI(reqbody, reqHeader);
              if (result.status === 200) {
                setIsSavedEventDeleted(result)
                  alert("Event is removed from saved collections.");
              }else if(result.status === 404){
                alert(result.response.data);
              }
          } catch (err) {
              console.log(err);
          }
      }
  }
  

  return (
    <div>
      <Card style={{ width: '18rem', padding:'0.2rem' }} className='rounded-4'>
      <Link to={`/${displayData?._id}/event`} style={{textDecoration: 'none'}}>
      <Card.Img style={{objectFit:'cover'}} height={'200px'} className='rounded-4' vari="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm1mB4YzQ1sIQXFPdW6NLcIf8__IMYB84uokYSImV82vtEvU5q4GJ-7GQTQbnDG1iULvk&usqp=CAU" />
      </Link>
      <Card.Body>
        <Card.Title>{displayData?.eventName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{eventOwner?.username}</Card.Subtitle>
        <Card.Text className='text-wrap'>
          {displayData?.eventDescription}
        </Card.Text>
        <div className='d-flex justify-content-between'>
          <Card.Link className='btn text-warning link-offset-2 link-underline-warning link-underline-opacity-0 link-underline-opacity-75-hover btn-link' >See more Details...</Card.Link>
          {
            insideMyEvents ? 
            <Card.Link className='btn'><i className="fa-solid fa-star text-warning"></i></Card.Link>
            : insideSavedEvents ?
            <OverlayTrigger key="bottom" placement="bottom"
             overlay={
              <Tooltip>Remove from Saved Events
              </Tooltip>
            }>        
            <button onClick={()=>deleteSavedEvent(displayData?._id)} className='btn'><i className="fa-solid fa-trash text-warning"></i></button></OverlayTrigger>
            :
            <button onClick={()=>saveEvent(displayData?._id)} className='btn'><i className="fa-regular fa-bookmark text-warning"></i></button>

          }
        </div>
      </Card.Body>
    </Card>
    </div>
  )
}

export default EventCard
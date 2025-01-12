import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { getUserDetailsByIdAPI } from '../services/allAPI'
import { Link } from 'react-router-dom'


const EventCard = ({displayData, insideMyEvents}) => {

  const [eventOwner,setEventOwner] = useState("")
  // console.log(displayData);
  useEffect(()=>{
    getUserDetails(displayData?.userId)
    
    
  })

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
  return (
    <div>
      <Link to={`/${displayData?._id}/event`} style={{textDecoration: 'none'}}>
      <Card style={{ width: '18rem', padding:'0.2rem' }} className='rounded-4'>
      <Card.Img style={{objectFit:'cover'}} height={'200px'} className='rounded-4' vari="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm1mB4YzQ1sIQXFPdW6NLcIf8__IMYB84uokYSImV82vtEvU5q4GJ-7GQTQbnDG1iULvk&usqp=CAU" />
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
            :
            <Card.Link className='btn'><i className="fa-regular fa-bookmark text-warning"></i></Card.Link>
          }
        </div>
      </Card.Body>
    </Card>
    </Link>
    </div>
  )
}

export default EventCard
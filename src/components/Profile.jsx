import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import personImg from '../assets/personImg.png'
import { getProfileAPI } from '../services/allAPI'


const Profile = () => {
  const [currentUser,setCurrentUser] = useState("")


  // function to get User Details
      const getUserDetails = async ()=>{
        const token = sessionStorage.getItem("token")
        if(token){
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }
          try {
            const result = await getProfileAPI(reqHeader)
            // console.log(result);
            
            if(result.status == 200){
              setCurrentUser(result.data[0])
              // setInputData({
              //   username: result.data.username || "",
              //   email: result.data.email || "",
              //   phoneNo: result.data.phoneNo || "", 
              //   ticketCount:""
              // });
            }
          } catch (err) {
            console.log(err);
            
          }
        }
      }
  return (
    <div className='row '>
        <Form.Group controlId="formFile" className="mb-3 col-6 d-flex justify-content-end align-items-center">
          {/* <Form.Label style={{width:'10rem'}} className='d-flex flex-column '>
            <img  src={personImg} alt="" />
            <span className='text-warning fw-semibold text-wrap text-center'>*upload images with jpg, jpeg or png formats only</span>
          </Form.Label> */}
          <Form.Control className='d-none' type="file" />
      </Form.Group>
      <div className='col-6 d-flex flex-column align-items-start justify-content-center'>
        <h5><span className='fw-semibold text-primary'>Username : </span>Username</h5>
        <h5><span className='fw-semibold text-primary mt-5'>Email : </span>xxxx@gmail.com</h5>
      </div>
    </div>
  )
}

export default Profile
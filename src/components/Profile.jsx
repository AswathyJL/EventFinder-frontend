import React from 'react'
import { Form } from 'react-bootstrap'
import personImg from '../assets/personImg.png'


const Profile = () => {
  return (
    <div className='row '>
        <Form.Group controlId="formFile" className="mb-3 col-6 d-flex justify-content-end align-items-center">
          <Form.Label style={{width:'10rem'}} className='d-flex flex-column '>
            <img  src={personImg} alt="" />
            <span className='text-warning fw-semibold text-wrap text-center'>*upload images with jpg, jpeg or png formats only</span>
          </Form.Label>
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
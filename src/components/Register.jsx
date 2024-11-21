import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';


const Register = () => {
    const [inputData, setInputData] = useState({
        userName : '', email: "", phoneNumber : ""
    })
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    const validatePhoneNumber = (phoneNumber) =>  /^\d{10}$/.test(phoneNumber);

    const handleRegister = (e) => {
    e.preventDefault();
    const { email, phoneNumber } = inputData;

    if (!validateEmail(email)) {
        alert('Invalid email address!');
        return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
        alert('Invalid phone number!');
        return;
    }

    // make api call 
    alert('Registration successful!');

    // reset and closing modal
    setInputData({ userName: '', email: '', phoneNumber: '' })
    handleClose()
    };
  return (
    <>
        <button onClick={handleShow} className='btn btn-primary rounded-pill px-4 border-2 fw-bold'>Register</button>

        {/* register modal */}
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className='text-primary fw-semibold'>Register for Event Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="formGroupName">
                <Form.Label>Username</Form.Label>
                <Form.Control onChange={e=>setInputData({...inputData,userName:e.target.value})}  placeholder="Enter your name to be used on the ticket" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={e=>setInputData({...inputData,email:e.target.value})}  type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPhone">
                <Form.Label>Phone number</Form.Label>
                <Form.Control onChange={e=>setInputData({...inputData,phoneNumber:e.target.value})}   placeholder="Phone number" />
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-warning" 
          className='px-3 rounded-pill' onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleRegister} variant="primary" className='px-3 rounded-pill'>Register</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Register
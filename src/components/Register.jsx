import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row} from 'react-bootstrap';
import { applyEventAPI, cancelRegAPI, getApplyEventStatusAPI, getProfileAPI} from '../services/allAPI';
import { useParams } from 'react-router-dom';
import GetTicket from './GetTicket';


const Register = () => {

  const {id:eventId} = useParams()
  const [isSelfBook, setIsSelfBook] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [currentUser, setCurrentUser] = useState("")
    const [inputData, setInputData] = useState({
        username : '', email: "", phoneNo : "", ticketCount:1
    })
    const [show, setShow] = useState(false);
    // console.log("Event ID:", eventId);
    // console.log(currentUser);
    // console.log(inputData);
    
    useEffect(()=>{
        getUserDetails()
    },[isSelfBook])
    
    useEffect(()=>{
      if(!isSelfBook){
        setInputData({ username: "", email: "", phoneNo: "", ticketCount: "" });
      }
    },[isSelfBook])
    useEffect(() => {
      if (isSelfBook && currentUser) {
        setInputData({
          username: currentUser.username || "",
          email: currentUser.email || "",
          phoneNo: currentUser.phoneNo || "",
          ticketCount: ""
        });
      }
    }, [isSelfBook, currentUser]); 
    useEffect(() => {
      console.log("is current user updated : ",currentUser);
      
      if (eventId) {
        getApplyStatus();
      }
    }, [eventId]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    const validatePhoneNumber = (phoneNumber) =>  /^\d{10}$/.test(phoneNumber);

    // function to handle registration
    const handleRegister = async(e) => {
    e.preventDefault();
    const userId = currentUser?._id 
    let { username, email, phoneNo, ticketCount } = inputData;
    if(!username)
    {
      alert("Please enter valid username")
      return
    }
    if (!validateEmail(email)) {
        alert('Invalid email address!');
        return;
    }

    if (!validatePhoneNumber(phoneNo) && !isSelfBook) {
        alert('Invalid phone number!');
        return;
    }

    phoneNo = phoneNo || "Not Provided"; 
    ticketCount = ticketCount || 1; 

    
    const reqbody = { 
      eventId,  // Ensure it is a string
      registeredUser: { userId, username, email, phoneNo, ticketCount } 
  };
    const token = sessionStorage.getItem("token");
    if (token) {
        const reqHeader = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const result = await applyEventAPI(reqbody, reqHeader);
            if (result.status === 200) {
                setIsRegistered(true); // Mark as saved
                alert("Registration Successful.");
                console.log(inputData);
                // reset and closing modal
                setInputData({ username: "", email: "", phoneNo: "", ticketCount: "" })
                setIsSelfBook(false)
                handleClose()
            }else if(result.status === 406){
              // console.log(result);
              alert(result.response.data);
            }
        } catch (err) {
            console.log(err);
        }
    }
    };

    // function to handle cancel registration
    const handleCancelReg = async()=>{
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }
        try {
          const result = await cancelRegAPI(eventId,reqHeader)
          console.log(result);
          
          if(result.status == 200){
            setIsRegistered(false)
          }
          else if(result.status == 404){
            setTimeout(() => {
            alert(result)
            handleClose()
            }, 1000);
          }
        } catch (err) {
          console.log(err);
          
        }
      }
    }

    // function to get event registration status for current user
    const getApplyStatus = async ()=>{
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }
        try {
          const result = await getApplyEventStatusAPI(eventId,reqHeader)
          console.log(result);
          
          if(result.status == 200){
            setIsRegistered(true)
            console.log("is applied");
            
          }
        } catch (err) {
          console.log(err);
          
        }
      }
    }

    // function to get User Details
    const getUserDetails = async ()=>{
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }
        try {
          const result = await getProfileAPI(reqHeader)
          console.log(result);
          
          if(result.status == 200){
            setCurrentUser(result.data[0])
            setInputData({
              username: result.data.username || "",
              email: result.data.email || "",
              phoneNo: result.data.phoneNo || "", 
              ticketCount:""
            });
          }
        } catch (err) {
          console.log(err);
          
        }
      }
    }
    // function to set the booking check box
    const handleSelfBook = (e)=>{
      setIsSelfBook(e.target.checked)
    }
    // function to handle inputs
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setInputData((prev) => ({ ...prev, [name]: value }));
    };
  return (
    <>
        {
          isRegistered ?
          <div>
            <button onClick={handleShow} className='btn btn-primary rounded-pill px-4 border-2 fw-bold me-5'>Cancel Registration</button>
            <GetTicket currentUser={currentUser} eventId = {eventId} />
          </div>
          
          :
          <button onClick={handleShow} className='btn btn-primary rounded-pill px-4 border-2 fw-bold'>Register</button>
        }

        {/* register modal */}
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        {
          isRegistered ?
          <>
            <Modal.Header closeButton>
            <Modal.Title className='text-primary fw-semibold'>Are you sure you want to cancel your registration?</Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-wrap justify-content-around'>
              <Button variant="outline-warning" 
              className='px-3 rounded-4 px-5' onClick={handleClose}>
                No
              </Button>
              <Button onClick={handleCancelReg} variant="primary" className='px-3 rounded-4 px-5'>Yes</Button>
            </Modal.Body>
          </>
          :
          <>
            <Modal.Header closeButton>
            <Modal.Title className='text-primary fw-semibold'>Register for Event Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Check
                  type="switch"
                  label="Book for me"
                  checked={isSelfBook}
                  onChange={handleSelfBook}
                />
                <Form.Group className="mb-3" controlId="formGroupName" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={e=>setInputData({...inputData,username:e.target.value})} disabled={isSelfBook}  placeholder={ inputData?.username || "Enter your name to be used on the ticket"} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={e=>setInputData({...inputData,email:e.target.value})} disabled={isSelfBook}  type="email" placeholder={inputData?.email || "Enter Email"} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPhone" >
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control onChange={e=>setInputData({...inputData,phoneNo:e.target.value})} disabled={isSelfBook}   placeholder={currentUser?.phoneNo || "Phone Number"} />
                </Form.Group>
                <Form.Group as={Row} >
                  <Form.Label column sm={6} >Ticket Count</Form.Label>
                    <Col sm={6}>
                      <Form.Control
                        type="number"
                        disabled={isSelfBook} // Disable input if checkbox is checked
                        name="ticketCount" value={inputData.ticketCount} onChange={handleInputChange} placeholder='1'
                      />
                    </Col>
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
          </>
        }
      </Modal>
    </>
  )
}

export default Register
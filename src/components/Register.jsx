import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row} from 'react-bootstrap';
import { getProfileAPI} from '../services/allAPI';


const Register = () => {

  const [isSelfBook, setIsSelfBook] = useState(false)
  const [currentUser, setCurrentUser] = useState("")
    const [inputData, setInputData] = useState({
        username : '', email: "", phoneNo : "", ticketCount:""
    })
    const [show, setShow] = useState(false);
    // console.log(id);
    // console.log(currentUser);
    // console.log(inputData);
    
    useEffect(()=>{
      if(isSelfBook){
        getUserDetails()
      }
    },[isSelfBook])
    
    useEffect(()=>{
      if(!isSelfBook){
        setInputData({ userName: "", email: "", phoneNumber: "" });
      }
    },[isSelfBook])
    useEffect(() => {
      if (isSelfBook && currentUser) {
        setInputData({
          username: currentUser.username || "",
          email: currentUser.email || "",
          phoneNo: currentUser.phoneNo || ""
        });
      }
    }, [isSelfBook, currentUser]); 
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
              userName: result.data.username || "",
              email: result.data.email || "",
              phoneNumber: result.data.phoneNo || "", 
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
      setEventData((prev) => ({ ...prev, [name]: value }));
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
            <Form.Check
              type="switch"
              label="Book for me"
              checked={isSelfBook}
              onChange={handleSelfBook}
            />
            <Form.Group className="mb-3" controlId="formGroupName" >
                <Form.Label>Username</Form.Label>
                <Form.Control onChange={e=>setInputData({...inputData,username:e.target.value})} disabled={isSelfBook}  placeholder={ currentUser.username || "Enter your name to be used on the ticket"} />
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
                    name="maxRegistrations" value={inputData.ticketCount} onChange={handleInputChange}
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
      </Modal>
    </>
  )
}

export default Register
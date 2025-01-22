
import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { addEventsAPI, editEventAPI } from '../services/allAPI';
import { useLocation, useParams } from 'react-router-dom';
import { isModifyEventContext } from '../contexts/ContextAPI';


const AddEvent = ({displayData}) => {

  const {setIsModifyEvent} = useContext(isModifyEventContext)
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation()
  const {id} = useParams()
  // console.log(displayData);
  // console.log(displayData.maxRegistrations===undefined);
  

  const isEventDetailPage = location.pathname.includes('/event');

    const handleClose = () =>{
      setShow(false)
      setCurrentPage(1);
    }

    useEffect(() => {
      if (isEventDetailPage && displayData) {
        // Prepopulate form fields with the data of the existing event for modification
        setEventData({
          eventName: displayData.eventName || "",
          eventDescription: displayData.eventDescription || "",
          eventWebsite: displayData.eventWebsite || "",
          startDate: displayData.startDate || "",
          endDate: displayData.endDate || "",
          startTime: displayData.startTime || "",
          endTime: displayData.endTime || "",
          location_city: displayData.location_city || "",
          location_state: displayData.location_state || "",
          location_link: displayData.location_link || "",
          maxRegistrations: displayData.maxRegistrations == "Unlimited" ? setIsNoMaxCount(true) : displayData.maxRegistrations,
          isFree: displayData.isFree !== undefined ? displayData.isFree : true, // Default to true if not provided
          entryFee: displayData.entryFee || "",
          paymentMode: displayData.paymentMode || "",
          audienceType: displayData.audienceType || "",
          eventType: displayData.eventType || "",
          tags: displayData.tags || "",
        });
    
        // Set checkbox states based on existing data
        setIsNoMaxCount(displayData.maxRegistrations === undefined);
        setIsOneDayEvent(displayData.startDate === displayData.endDate);
      } else {
        // Initialize empty values for new event creation
        setEventData({
          eventName: "",
          eventDescription: "",
          eventWebsite: "",
          startDate: "",
          endDate: "",
          startTime: "",
          endTime: "",
          location_city: "",
          location_state: "",
          location_link: "",
          maxRegistrations: "",
          isFree: true, // Default value
          entryFee: "",
          paymentMode: "",
          audienceType: "",
          eventType: "",
          tags: "",
        });
    
        setIsNoMaxCount(false);
        setIsOneDayEvent(false);
      }
    }, [show, isEventDetailPage, displayData]);
    const handleShow = () => {
      
      setShow(true);
      
    }

    const [isNoMaxCount, setIsNoMaxCount] = useState(false);
    const [isOneDayEvent, setIsOneDayEvent] = useState(false);

    const handleCheckboxRegistrationCount = (e) => {
      setIsNoMaxCount(e.target.checked);
      
    };
    const handleOneDayEventChange = (e) => {
      setIsOneDayEvent(e.target.checked);
    };

    const handleNextPage = () => setCurrentPage((prev) => prev + 1);
    const handlePreviousPage = () => setCurrentPage((prev) => prev - 1);

    const [eventData, setEventData] = useState({
      eventName: "",
      eventDescription: "",
      eventWebsite:"",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      location_city: "",
      location_state: "",
      location_link:"",
      maxRegistrations: "",
      isFree:true,
      entryFee:"",
      paymentMode: "",
      audienceType: "",
      eventType: "",
      tags: ""
    });
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEventData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegister =async () => {
    
      const { eventName, eventDescription,eventWebsite, startDate, endDate, startTime, endTime, location_city, location_state, location_link, maxRegistrations, isFree, audienceType, eventType, tags } = eventData;

      // Check if start date is on or after the current date
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'yyyy-mm-dd' format
      if (new Date(startDate) < new Date(currentDate)) {
        alert("Start date must be today or a future date.");
        return;
      }
    
      // Check if end date is after start date (if not one-day event)
      if (!isOneDayEvent && new Date(endDate) <= new Date(startDate)) {
        alert("End date must be after the start date.");
        return;
      }
    
      // Optional: Validate max registrations if not unlimited
      if (!isNoMaxCount && (!maxRegistrations || maxRegistrations <= 0)) {
        alert("Please enter a valid maximum registration count.");
        return;
      }

      // Check for required fields
      if (!eventName || !eventDescription || !startDate || !startTime || !endTime || !location_city || !location_state || !location_link || !audienceType || !eventType || !tags) {
        alert("Please fill in all required fields.");
        return;
      }else{
        const token = sessionStorage.getItem("token")
        if(token)
        {
          const reqHeaders = {
            "Authorization":`Bearer ${token}`
        }
          try {
            console.log(eventData);
            // console.log("FormData Content:");
            // for (let [key, value] of reqBody.entries()) {
            //   console.log(`${key}: ${value}`);}
            const result = await addEventsAPI(eventData,reqHeaders)
            if(result.status==200){
              alert("Event registered successfully!");
            setShow(false); // Close the modal
            } else{
              alert(result.response?.data)
              console.log(result);
              
              console.log(result.response.data);
              
            }
            
            
          } catch (err) {
            console.log(err);
            
          }
        }
      }
    };

    const handleUpdate = async ()=>{
      
      const { eventName, eventDescription,eventWebsite, startDate, endDate, startTime, endTime, location_city, location_state, location_link, maxRegistrations, isFree, audienceType, eventType, tags } = eventData;

    
      // Check if end date is after start date (if not one-day event)
      if (!isOneDayEvent && new Date(endDate) <= new Date(startDate)) {
        alert("End date must be after the start date.");
        return;
      }
    
      // Optional: Validate max registrations if not unlimited
      if (!isNoMaxCount && (!maxRegistrations || maxRegistrations <= 0)) {
        alert("Please enter a valid maximum registration count.");
        return;
      }

      // Check for required fields
      if (!eventName || !eventDescription || !startDate || !startTime || !endTime || !location_city || !location_state || !location_link || !audienceType || !eventType || !tags) {
        alert("Please fill in all required fields.");
        return;
      }else{
        const token = sessionStorage.getItem("token")
        if(token)
        {
          const reqHeaders = {
            "Authorization":`Bearer ${token}`
        }
          try {
            console.log(eventData);
            // console.log("FormData Content:");
            // for (let [key, value] of reqBody.entries()) {
            //   console.log(`${key}: ${value}`);}
            const result = await editEventAPI(id,eventData,reqHeaders)
            if(result.status==200){
              alert("Event updated successfully!");
              setIsModifyEvent(result.data)
            setShow(false); // Close the modal
            } else{
              alert(result.response?.data)
              console.log(result);
              
              console.log(result.response.data);
              
            }
            
            
          } catch (err) {
            console.log(err);
            
          }
        }
      }
    }

    function formatDateForDisplay(inputDate) {
      const date = new Date(inputDate);
      const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if necessary
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year
      return `${day}/${month}/${year}`;
  }
  return (
    <>
        {
          isEventDetailPage ?
          <button onClick={handleShow} style={{position:'absolute',  right:'1rem', zIndex:'10'}} className='btn btn-warning rounded-pill px-4 border-2 fw-bold me-5'>Modify Event</button>
          :
          <button onClick={handleShow} style={{position:'absolute',  right:'1rem', zIndex:'10'}} className='btn btn-warning rounded-pill px-4 border-2 fw-bold'>Add New Event</button>
        }

        {/* register modal */}
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title className='text-primary fw-semibold'>
          {currentPage === 1 ? isEventDetailPage? "Update Event Details":"Add Event Details" : "Additional Information"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          {
          currentPage === 1 && 
          (<>
            {/* Event Name */}
              <Form.Group className="mb-3" controlId="formEventName"
              style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                  <Form.Label className='text-primary fs-5' >Event Name</Form.Label>
                  <Form.Control  placeholder="Enter event name here!" name="eventName" value={eventData.eventName} onChange={handleInputChange}/>
              </Form.Group>
  
              {/* Event description */}
              <Form.Group className="mb-3" controlId="formEventDescription"
              style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                  <Form.Label className='text-primary fs-5'>Event Description</Form.Label>
                  <Form.Control as="textarea" aria-label="With textarea"   placeholder="Enter Detailed Description About Event here" name="eventDescription" value={eventData.eventDescription} onChange={handleInputChange}/>
              </Form.Group>
  
              {/* Event Website */}
              {/* Event description */}
              <Form.Group className="mb-3" controlId="formEventDescription"
              style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                  <Form.Label className='text-primary fs-5'>Event Website (optional)</Form.Label>
                  <Form.Control  placeholder="Enter Website" name="eventWebsite" value={eventData.eventWebsite} onChange={handleInputChange}/>
              </Form.Group>
  
              <div className='row '>
                {/* Date checkbox*/}
                {/* Start date */}
                <Form.Group className="mb-3 col-md-6" controlId="formEventStartDate"
                style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                    <Form.Check
                      type="switch"
                      label="Is this a one-day event?"
                      checked={isOneDayEvent}
                      onChange={handleOneDayEventChange}
                    />
                    <Form.Label className='text-primary fs-5'>Event Starting Date {
                     isEventDetailPage ? ": "+formatDateForDisplay(eventData.startDate) : ""}</Form.Label>
                    <Form.Control type='date'   placeholder="dd-mm-yyyy" name="startDate" value={eventData.startDate} onChange={handleInputChange} />
                {/* End Date */}
                    <Form.Label className='text-primary fs-5'>Event Ending Date{
                      isEventDetailPage ? 
                      eventData.endDate != eventData.startDate && ": "+formatDateForDisplay(eventData?.endDate) : ""}</Form.Label>
                    <Form.Control type='date'   placeholder="dd-mm-yyyy" disabled={isOneDayEvent} name="endDate" value={eventData.endDate} onChange={handleInputChange}/>
                </Form.Group>
  
                {/* Time */}
                {/* Starting Time */}
                <Form.Group className="mb-3 col-md-6 d-flex flex-column" controlId="formEventStartTime"
                style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                  <Form.Label className="text-primary fs-5">Event Starting Time</Form.Label>
                  <Form.Control type="time" name="startTime" value={eventData.startTime} onChange={handleInputChange}/>
                  <Form.Text muted>Select time in 24-hour format</Form.Text>
                {/* Ending Time */}
                  <Form.Label className="text-primary fs-5">Event Ending Time</Form.Label>
                  <Form.Control type="time" name="endTime" value={eventData.endTime} onChange={handleInputChange}/>
                  <Form.Text muted>Select time in 24-hour format</Form.Text>
                </Form.Group>
              </div>
  
              <div className='row'>
                {/* Location */}
                <Form.Group className="mb-3 col-md-6" controlId="formLocation"
                style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                    <Form.Label className='text-primary fs-5'>Location</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control aria-label="First name" placeholder='city' name="location_city" value={eventData.location_city} onChange={handleInputChange}/>
                      <Form.Control aria-label="Last name"  placeholder='state' name="location_state" value={eventData.location_state} onChange={handleInputChange}/>
                    </InputGroup>
                    <Form.Control   placeholder="Enter google map location link here..." name="location_link" value={eventData.location_link} onChange={handleInputChange}/>
                </Form.Group>
    
                {/* Registration count */}
                <Form.Group className="mb-3 col-md-6" controlId="formEventEndDate"
                style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Unlimited Registrations"
                    checked={isNoMaxCount}
                    onChange={handleCheckboxRegistrationCount}
                    
                  />
                  <Form.Label className='text-primary fs-5'>Maximum Registrations Allowed</Form.Label>
                  <Form.Control
                    type="number"
                    disabled={isNoMaxCount} // Disable input if checkbox is checked
                    name="maxRegistrations" value={eventData.maxRegistrations} onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
          </>)
            
            }
        {currentPage === 2 && (
              <>
                {/* Page 2 Content */}
                <Form.Group className="mb-3" controlId="formIsFree" style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                  <Form.Check
                    type="switch"
                    label="Free Registration"
                    name="isFree"
                    checked={eventData.isFree}
                    onChange={(e) =>
                      setEventData((prev) => ({
                        ...prev,
                        isFree: e.target.checked,
                        entryFee: "",
                      }))
                    }
                  />
                </Form.Group>
                {!eventData.isFree && (
                  <>
                    <Form.Group className="mb-3" controlId="formentryFee" style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                      <Form.Label className="text-primary fs-5">Entry Fees</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Entry Fees"
                        name="entryFee"
                        value={eventData.entryFee}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="formPaymentMode" style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                    <Form.Label className="text-primary fs-5">Payment Mode</Form.Label>
                    <Form.Control
                      as="select"
                      name="paymentMode"
                      value={eventData.paymentMode}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Payment Mode</option>
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                    </Form.Control>
                  </Form.Group>
                  </>)}
                <Form.Group className="mb-3" controlId="formAudienceType" style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                  <Form.Label className="text-primary fs-5">Audience Type</Form.Label>
                  <Form.Control
                    placeholder="E.g., Students, Professionals"
                    name="audienceType"
                    value={eventData.audienceType}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEventType" style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                  <Form.Label className="text-primary fs-5">Event Type</Form.Label>
                  <Form.Control
                    placeholder="E.g., Workshop, Conference"
                    name="eventType"
                    value={eventData.eventType}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTags" style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                  <Form.Label className="text-primary fs-5">Tags</Form.Label>
                  <Form.Control
                    placeholder="E.g., Tech, Education"
                    name="tags"
                    value={eventData.tags}
                    onChange={handleInputChange}
                  />
                  <Form-text>
                    Enter tags separated by space
                  </Form-text>
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {currentPage > 1 && (
            <Button variant="secondary" onClick={handlePreviousPage}>
              Previous
            </Button>
          )}
          {currentPage < 2 ? (
            <Button variant="primary" onClick={handleNextPage}>
              Next
            </Button>
          ) : (
            isEventDetailPage ?
            <Button variant="success" onClick={handleUpdate}>
              Update Event
            </Button>
            :
            <Button variant="success" onClick={handleRegister}>
              Add Event
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddEvent

import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';


const AddEvent = () => {
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

    const handleClose = () =>{
      setShow(false)
      setCurrentPage(1);
    }

    useEffect(() => {
      if (!show) {
        setEventData({
          eventName: "",
          eventDescription: "",
          startDate: "",
          endDate: "",
          startTime: "",
          endTime: "",
          locationCity: "",
          locationState: "",
          locationLink: "",
          maxRegistrations: "",
          isFree: true, // New field for free registration
          price: "",
          paymentMode: "",
          audienceType: "",
          eventType: "",
          tags: "",
        });
        setIsNoMaxCount(false);
        setIsOneDayEvent(false);
      }
    }, [show]); 
    const handleShow = () => setShow(true);

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
      locationCity: "",
      locationState: "",
      locationLink:"",
      maxRegistrations: "",
    });
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEventData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegister = () => {
    
      const { eventName, eventDescription,eventWebsite, startDate, endDate, startTime, endTime, locationCity, locationState, locationLink, maxRegistrations } = eventData;

      // Check for required fields
      if (!eventName || !eventDescription || !startDate || !startTime || !endTime || !locationCity || !locationState || !locationLink) {
        alert("Please fill in all required fields.");
        return;
      }

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
    
      alert("Event registered successfully!");
      setShow(false); // Close the modal
    };
  return (
    <>
        <button onClick={handleShow} style={{position:'absolute',  right:'1rem', zIndex:'10'}} className='btn btn-warning rounded-pill px-4 border-2 fw-bold'>Add New Event</button>

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
          {currentPage === 1 ? "Add Event Details" : "Additional Information"}
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
                  <Form.Label className='text-primary fs-5'>Event Name</Form.Label>
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
                  <Form.Label className='text-primary fs-5'>Event Website (optio)</Form.Label>
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
                    <Form.Label className='text-primary fs-5'>Event Starting Date</Form.Label>
                    <Form.Control type='date'   placeholder="dd-mm-yyyy" name="startDate" value={eventData.startDate} onChange={handleInputChange} />
                {/* End Date */}
                    <Form.Label className='text-primary fs-5'>Event Ending Date</Form.Label>
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
                      <Form.Control aria-label="First name" placeholder='city' name="locationCity" value={eventData.locationCity} onChange={handleInputChange}/>
                      <Form.Control aria-label="Last name"  placeholder='state' name="locationState" value={eventData.locationState} onChange={handleInputChange}/>
                    </InputGroup>
                    <Form.Control   placeholder="Enter google map location link here..." name="locationLink" value={eventData.locationLink} onChange={handleInputChange}/>
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
                        price: "",
                      }))
                    }
                  />
                </Form.Group>
                {!eventData.isFree && (
                  <>
                    <Form.Group className="mb-3" controlId="formPrice" style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                      <Form.Label className="text-primary fs-5">Price</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter price"
                        name="price"
                        value={eventData.price}
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
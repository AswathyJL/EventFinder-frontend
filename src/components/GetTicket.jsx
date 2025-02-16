// import React from 'react'

// const GetTicket = ({currentUser,eventId}) => {

//     // console.log(currentUser);
//     // console.log(eventId);
    
    
//     // function to handle download of ticket
//     const handleGetTicket = async()=>{

//     }
//   return (
//     <button onClick={handleGetTicket} className='btn btn-warning rounded-pill px-4 border-2 fw-bold'>Get Ticket<i class="fa-solid fa-print ms-2"></i></button>
//   )
// }

// export default GetTicket

import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { getEventDetailsAPI } from '../services/allAPI';

// Define styles
const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 12 },
});

// PDF Document component
const TicketDocument = ({ currentUser, eventDetails }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Event Ticket</Text>
        <Text style={styles.text}>Event Name: {eventDetails.eventName}</Text>
        <Text style={styles.text}>Date:  From{ eventDetails.startDate} to {eventDetails.endDate}</Text>
        <Text style={styles.text}>Location: {eventDetails.location_city}, {eventDetails.location_state}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>User Details</Text>
        <Text style={styles.text}>Name: {currentUser.username}</Text>
        <Text style={styles.text}>Email: {currentUser.email}</Text>
      </View>
    </Page>
  </Document>
);

// Main component for downloading PDF
const GetTicket = ({ eventId, currentUser }) => {

    const [eventDetails, setEventDetails] = useState("")
    console.log(eventDetails);
    
    useEffect(() => {
            // Fetch event details
            fetchEventDetails();
        }, []);
    const fetchEventDetails = async ()=>{
            const token = sessionStorage.getItem("token")
            if(token){
                const reqHeader={
                    "Authorization":`Bearer ${token}`
                }
                try {
                    const result = await getEventDetailsAPI(eventId,reqHeader)
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
  return (
    <>
      <PDFDownloadLink className='btn btn-warning rounded-pill px-4 border-2 fw-bold'
        document={<TicketDocument eventDetails={eventDetails} currentUser={currentUser} />}
        fileName="Event_Ticket.pdf"
      >
        {({ loading }) => (
            <>
            {loading ? 'Generating Ticket...' : 'Get Ticket'}
            <i className="fa-solid fa-print ms-2"></i>
            </>
        )}
      </PDFDownloadLink>
    </>
  );
};

export default GetTicket;

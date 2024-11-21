import React, { useContext, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import SavedEvents from './SavedEvents';
import AppliedEvents from './AppliedEvents';
import MyEvents from './MyEvents';
import PastEvents from './PastEvents';
import Profile from './Profile';
import AddEvent from './AddEvent';



const View = () => {
  // const {insideMyEvent, setInsideMyEvent}=useContext(insideMyEventsContext)
  const [activeKey, setActiveKey] = useState('applied'); 

  const handleSelect = (key) => {
    setActiveKey(key); 
  };

  const getTabStyle = (key) => {
    return activeKey === key ? 'text-warning' : 'text-primary'; 
  };
  return (
    // display the saved events , applied events, past events and my events on the dashboard
    <>
       <Tabs
      activeKey={activeKey}
      onSelect={handleSelect}
      id="justify-tab-example"
      className="mb-3 mt-5 px-5 shadow-sm"
      justify
    >
      <Tab eventKey="applied" title={<span className={getTabStyle('applied')}>Applied Events</span>}>
        <AppliedEvents/>
      </Tab>
      <Tab eventKey="saved" title={<span className={getTabStyle('saved')}>Saved Events</span>} >
        <SavedEvents/>
      </Tab>
      <Tab eventKey="myEvents" title={<span className={getTabStyle('myEvents')}>My Events</span>}>
        <MyEvents/>
        <AddEvent/>
      </Tab>
      <Tab eventKey="past" title={<span className={getTabStyle('past')}>Past Events</span>}>
        <PastEvents/>
      </Tab>
      <Tab eventKey="profile" title={<span className={getTabStyle('profile')}>Profile</span>}>
        <Profile/>
      </Tab>
    </Tabs>
    </>
  )
}

export default View
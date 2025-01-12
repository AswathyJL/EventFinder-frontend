import commonAPI from "./commonAPI"
import SERVER_URL from "./serverUrl"

// registerAPI - /register
export const registerAPI = async(reqbody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqbody)
}
// loginAPI - /login
export const loginAPI = async(reqbody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqbody)
}
// addEventsAPI - /add-event
export const addEventsAPI = async(reqbody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-events`,reqbody,reqHeader)
}
// EditEventsAPI - /events/:id/edit
export const editEventAPI = async(id,reqbody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/events/${id}/edit`,reqbody,reqHeader)
}
// getAllEventsAPI - /event
export const getAllEventsAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-events?search=${searchKey}`,{},reqHeader)
}

// getUserEventsAPI
export const getUserEventsAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-events`,{},reqHeader)
}

// getEventsByIdAPI - /:id/event
export const getEventDetailsAPI = async(id,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/${id}/event`,{},reqHeader)
}
// getEventsWithFilterAPI - /event?search=${query}
// applyEventAPI - /apply-event-
// getAppliedEvents - /applied-events
// getSavedEvents - /saved-events
// deleteSavedEvents - /saved-events/:id
// deleteAllSavedEvents - /saved-events
// getMyEvents - /my-events
// deleteMyEventsAPI - /my-events/:id
// getPastEvents - /past-events
// deletePastEvents - /past-events/:id
// deleteAllPastEvents - /past-events
// getUser - /user-profile
export const getProfileAPI = async(reqbody,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/profile`,reqbody,reqHeader)
}
// getUser by Id - /eventcard
export const getUserDetailsByIdAPI = async(id,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-details/${id}`,{},reqHeader)
}
// editUser - /user/edit
// addProfilePic - /user/:id/profile-update

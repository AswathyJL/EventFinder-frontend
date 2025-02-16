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
// getHomeEventsAPI
export const getHomeEventsAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/home-events`,{},reqHeader)
}
// getEventsWithFilterAPI - /event?search=${query}
// applyEventAPI - /apply-event
export const applyEventAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/apply-event`,reqBody,reqHeader)
}
// getAppliedEvents - event/:id/status
export const getApplyEventStatusAPI = async(eventId,reqHeader)=>{
    console.log("getApplyEventStatusAPI");
    
    return await commonAPI("GET",`${SERVER_URL}/event/${eventId}/status`,{},reqHeader)
}
// saveEvent - /save-event
export const saveEventAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/save-event`,reqBody,reqHeader)
}
// getSavedEvents - /saved-events
export const getSavedEventAPI = async(reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/save-event/view`,{},reqHeader)
}
// deleteSavedEvents - /saved-events/:id
export const deleteSavedEventByIdAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/remove-saved-event`,reqBody,reqHeader)
}
// deleteAllSavedEvents - /saved-events
export const deleteAllSavedEventsAPI = async(reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/remove-all-saved-events`,{},reqHeader)
}
// getMyEvents - /my-events
// deleteMyEventsAPI - /my-events/:id
export const removeEventAPI = async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/${id}/remove`,{},reqHeader)
}
// getPastEvents - /past-events
// deletePastEvents - /past-events/:id
// deleteAllPastEvents - /past-events
// getUser - /user-profile
export const getProfileAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/profile`,{},reqHeader)
}
// getUser by Id - /eventcard
export const getUserDetailsByIdAPI = async(id,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-details/${id}`,{},reqHeader)
}
// editUser - /user/edit
// addProfilePic - /user/:id/profile-update

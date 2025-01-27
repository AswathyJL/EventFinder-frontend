import React, { createContext, useState } from 'react'
export const isModifyEventContext = createContext()
export const isDeleteEventContext = createContext()
export const isSavedEventDeletedContext = createContext()

const ContextApi = ({children}) => {
  const [isModifyEvent, setIsModifyEvent] = useState("")
  const [isDeleteEvent, setIsDeleteEvent] = useState("")
  const [isSavedEventDeleted, setIsSavedEventDeleted] = useState("")
  return (
    <isModifyEventContext.Provider value={{isModifyEvent, setIsModifyEvent}}>
      <isSavedEventDeletedContext.Provider value={{isSavedEventDeleted, setIsSavedEventDeleted}}>
        <isDeleteEventContext.Provider value={{isDeleteEvent, setIsDeleteEvent}}>
              {children}
        </isDeleteEventContext.Provider>
      </isSavedEventDeletedContext.Provider>
    </isModifyEventContext.Provider>
  )
}

export default ContextApi
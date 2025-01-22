import React, { createContext, useState } from 'react'
export const isModifyEventContext = createContext()
export const isDeleteEventContext = createContext()

const ContextApi = ({children}) => {
  const [isModifyEvent, setIsModifyEvent] = useState("")
  const [isDeleteEvent, setIsDeleteEvent] = useState("")
  return (
    <isModifyEventContext.Provider value={{isModifyEvent, setIsModifyEvent}}>
      <isDeleteEventContext.Provider value={{isDeleteEvent, setIsDeleteEvent}}>
            {children}
      </isDeleteEventContext.Provider>
    </isModifyEventContext.Provider>
  )
}

export default ContextApi
import React, { createContext, useState } from "react"

const MyContext = createContext({
  isSubscribeOpen: false,
  updateSubscribeOpen: () => {},
  context: "",
  updateContext: () => {},
})

export const MyContextProvider = ({ children }) => {
  const [isSubscribeOpen, setSubscribeOpen] = useState(false)
  const [context, setContext] = useState("")


  const updateSubscribeOpen = newValue => {
    setSubscribeOpen(newValue)
  }

  const updateContext = newValue => {
    setContext(newValue)
  }

  return (
    <MyContext.Provider
      value={{
        isSubscribeOpen,
        updateSubscribeOpen,
        context,
        updateContext,
      }}
    >
      {children}
    </MyContext.Provider>
  )
}

export default MyContext

import React, { useState } from "react"
import sublinks from "../constants/links"

// This will be used often with useContext hook
const GatsbyContext = React.createContext()

// From the GatsbyContext instance, we get the Provider and Consumer

// This component will be called once
const GatsbyProvider = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [links, setLinks] = useState(sublinks)

  return (
    <GatsbyContext.Provider value={{ isSidebarOpen, links }}>
      {children}
    </GatsbyContext.Provider>
  )
}

export { GatsbyContext, GatsbyProvider }

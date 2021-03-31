import React, { useState } from "react"
import sublinks from "../constants/links"

// This will be used often with useContext hook
const GatsbyContext = React.createContext()

// From the GatsbyContext instance, we get the Provider and Consumer

// This component will be called once
const GatsbyProvider = ({ children }) => {
  return (
    <GatsbyContext.Provider value="hello">{children}</GatsbyContext.Provider>
  )
}

export { GatsbyContext, GatsbyProvider }

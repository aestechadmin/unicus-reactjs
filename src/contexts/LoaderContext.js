import React, { createContext, useState } from "react";

// Create the context
export const LoaderContext = createContext();

// Provider component
export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};
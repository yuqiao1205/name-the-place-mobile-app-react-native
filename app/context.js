import React, { createContext, useState } from "react";

// Create the context
export const AppContext = createContext();

// Create the provider component
// export const AppProvider = ({ children }) => {
//   const [sharedState, setSharedState] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);

//   return (
//     <AppContext.Provider value={{ sharedState, setSharedState }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// Create the provider component
export const AppProvider = ({ children }) => {
  const [sharedState, setSharedState] = useState({
    places: [],
    sharedImage: null, // Initialize sharedImage with null or a default value
  });

  return (
    <AppContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </AppContext.Provider>
  );
};

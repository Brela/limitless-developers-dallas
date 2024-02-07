import React, { ReactNode, createContext, useEffect, useState, useContext } from 'react';

// Define a TypeScript interface for the context state
interface MeetupContextTypes {
  accessToken: string | null;
  fetchAccessToken: () => Promise<void>;
}

// Create a context with a default value
export const MeetupContext = createContext<MeetupContextTypes>({
  accessToken: null,
  fetchAccessToken: async () => {},
});

// Component Props type
interface MeetupProviderProps {
  children: ReactNode;
}

export const MeetupDataProvider = ({ children }: MeetupProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Define the function to fetch the access token
  const fetchAccessToken = async () => {
    try {
      // Assuming getMeetupAccessToken() returns the access token directly
      const token = await getMeetupAccessToken();
      console.log(token);
      setAccessToken(token);
      // Use the access token for further API requests here or pass it down through context
    } catch (error) {
      console.error('Error obtaining access token:', error);
    }
  };

  // Provide the fetchAccessToken function and the accessToken state through context
  return (
    <MeetupContext.Provider value={{ accessToken, fetchAccessToken }}>
      {children}
    </MeetupContext.Provider>
  );
};

// Custom hook to use the context
export const useMeetupContext = () => useContext(MeetupContext);

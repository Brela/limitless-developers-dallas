import React, { ReactNode, createContext, useEffect, useState, useContext } from 'react';
import { getMeetupAccessToken } from '../_api/getMeetupAccessToken';

interface MeetupContextTypes {
  accessToken: string | null;
  fetchAccessToken: () => Promise<void>;
  error: Error | null; // Add an error state to your context
}

export const MeetupContext = createContext<MeetupContextTypes>({
  accessToken: null,
  fetchAccessToken: async () => {},
  error: null, // Initialize error as null
});

interface MeetupProviderProps {
  children: ReactNode;
}

const MAX_RETRIES = 3;
const RETRY_INTERVAL = 3000; // 3 seconds

export const MeetupDataProvider = ({ children }: MeetupProviderProps) => {
  const [accessToken, setAccessToken] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchAccessToken = async () => {
    // If max retries have been reached, log the error and stop retrying
    if (retryCount >= MAX_RETRIES) {
      console.error('Max retries reached.');
      return;
    }

    try {
      const token = await getMeetupAccessToken();
      setAccessToken(token);
    } catch (err) {
      console.error('Error obtaining access token:', err);
      // Increment retry count and set a timer to retry
      setTimeout(() => {
        setRetryCount((count) => count + 1);
      }, RETRY_INTERVAL);
    }
  };

  useEffect(() => {
    fetchAccessToken();
    // Include retryCount in the dependency array to trigger a retry
  }, [retryCount]);

  // Provide the fetchAccessToken function, accessToken, and error state through context
  return (
    <MeetupContext.Provider value={{ accessToken, fetchAccessToken, error }}>
      {children}
    </MeetupContext.Provider>
  );
};

export const useMeetupContext = () => useContext(MeetupContext);

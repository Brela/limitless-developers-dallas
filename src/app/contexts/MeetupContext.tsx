'use client';

import React, { ReactNode, createContext, useState, useContext } from 'react';

interface MeetupContextTypes {
  data: string | null;
}

export const MeetupContext = createContext<MeetupContextTypes>({
  data: null,
});

interface MeetupProviderProps {
  children: ReactNode;
}

export const MeetupDataProvider = ({ children }: MeetupProviderProps) => {
  const [data, setData] = useState<any>(null);

  return <MeetupContext.Provider value={{ data }}>{children}</MeetupContext.Provider>;
};

export const useMeetupContext = () => useContext(MeetupContext);

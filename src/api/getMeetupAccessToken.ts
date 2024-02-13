'use server';

import { cookies } from 'next/headers';
import { generateJWT } from './generateJWT';
// Adjust the return type to include possible error states
export const getMeetupAccessToken = async (): Promise<any> => {
  const existingAccessToken = cookies().get('accessToken');
  if (existingAccessToken) {
    return 'meetup access token verified from cookie';
  }

  try {
    const jwtToken = await generateJWT();

    const response = await fetch('https://secure.meetup.com/oauth2/access', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwtToken,
      }).toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error in getMeetupAccessToken! status: ${response.status}`);
    }

    const jsonResponse = await response.json();
    console.log('Access Token:', jsonResponse);

    cookies().set({
      name: 'accessToken',
      value: jsonResponse.access_token,
      httpOnly: true,
      maxAge: 3550, // duration is almost one hour, same as meetup token
      path: '/',
    });

    return 'cookie set from server to client';
  } catch (error) {
    console.error('Error obtaining access token:', error);
    // Return an object indicating the error
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

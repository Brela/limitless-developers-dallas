import { generateJWT } from './generateJWT';
// Adjust the return type to include possible error states
export const getMeetupAccessToken = async (): Promise<{ accessToken?: string; error?: string }> => {
  try {
    const jwtToken = generateJWT();
    console.log('JWT Token:', jwtToken);
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();
    console.log('Access Token:', jsonResponse);
    // Assuming the access token is directly in the jsonResponse
    return { accessToken: jsonResponse.access_token };
  } catch (error) {
    console.error('Error obtaining access token:', error);
    // Return an object indicating the error
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

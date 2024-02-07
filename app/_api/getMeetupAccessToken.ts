const getMeetupAccessToken = async () => {
  const url = 'https://secure.meetup.com/oauth2/access';
  const data = {
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: '{SIGNED_JWT}', // Replace {SIGNED_JWT} with your actual JWT
  };

  // Convert the data object to URL-encoded string
  const formData = new URLSearchParams(data).toString();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      // Explicitly throw an error if the response is not ok
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();
    console.log('Access Token:', jsonResponse);
    return jsonResponse; // Returns the JSON response on success
  } catch (error: any) {
    console.error('Error obtaining access token:', error);
    // Return undefined or a specific error object/message if needed
    return { error: error.message }; // Adjust this based on how you want to handle errors
  }
};

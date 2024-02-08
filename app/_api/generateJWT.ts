'use server';

import jwt from 'jsonwebtoken';

/*
This uses the jsonwebtoken library to sign a JWT with your RSA private key.
The JWT includes several claims about the identity of the requestor and the intended audience.
Output: A signed JWT string.
 */

export const generateJWT = (): string => {
  const privateKey = process.env.PRIVATE_RSA_KEY;

  if (!privateKey) {
    throw new Error('The PRIVATE_RSA_KEY env variable is not set.');
  }

  const token = jwt.sign(
    {
      iss: process.env.OAUTH_CLIENT_KEY, // Your Meetup OAuth client key
      // sub: 'YourMeetupMemberID', // Your Meetup member ID
      aud: 'https://api.meetup.com', // The audience for the JWT
      // ... other claims ...
    },
    privateKey,
    {
      algorithm: 'RS256',
      expiresIn: '2m',
    }
  );

  return token;
};

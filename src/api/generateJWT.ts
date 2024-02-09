'use server';

import jwt from 'jsonwebtoken';

export const generateJWT = (): string => {
  const privateRsaKey = process.env.PRIVATE_RSA_KEY; // generated locally with openSSL, then stored in env
  const signingKeyId = process.env.SIGNING_KEY_ID; // got from meetup OATH client settings
  const clientKey = process.env.OAUTH_CLIENT_KEY; // got from meetup OATH client dashboard
  const memberId = process.env.MEETUP_MEMBER_ID; // got from meetup account url

  if (!privateRsaKey) {
    throw new Error('The PRIVATE_RSA_KEY env variable is not set.');
  }

  if (!signingKeyId) {
    throw new Error('The SIGNING_KEY_ID env variable is not set.');
  }

  const token = jwt.sign(
    {
      // Payload
      iss: clientKey,
      sub: memberId,
      aud: 'https://api.meetup.com',
    },
    privateRsaKey,
    {
      // Sign options
      algorithm: 'RS256',
      expiresIn: '2m',
      keyid: signingKeyId,
    }
  );

  return token;
};

import jwt from 'jsonwebtoken';

// note that all of these thing for jwt in env came from the Meetup Oatch Client dashboarrd except
// the RSA key, which was generated locally and placed in env

export const generateJWT = (): string => {
  const privateKey = process.env.PRIVATE_RSA_KEY;
  const signingKeyId = process.env.SIGNING_KEY_ID;

  if (!privateKey) {
    throw new Error('The PRIVATE_RSA_KEY env variable is not set.');
  }

  if (!signingKeyId) {
    throw new Error('The SIGNING_KEY_ID env variable is not set.');
  }

  const token = jwt.sign(
    {
      // Payload
      iss: process.env.OAUTH_CLIENT_KEY,
      sub: process.env.MEETUP_MEMBER_ID,
      aud: 'https://api.meetup.com',
    },
    privateKey,
    {
      // Sign options
      algorithm: 'RS256',
      expiresIn: '2m',
      keyid: signingKeyId, // Note that it's keyid, not kid here.
    }
  );

  return token;
};

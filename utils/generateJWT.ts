// utils/generateJWT.ts
import jwt from 'jsonwebtoken';
import fs from 'fs';

/*  The purpose of the signed JWT is to securely authenticate a
server-to-server communication without user interaction by proving the
identity of the requestor to the authentication server. */

export const generateJWT = (): string => {
  const privateKey = fs.readFileSync('path/to/your/private.key', 'utf8');
  return jwt.sign({}, privateKey, {
    algorithm: 'RS256',
    issuer: 'YOUR_CLIENT_KEY',
    subject: 'AUTHORIZED_MEMBER_ID',
    audience: 'api.meetup.com',
    keyid: 'SIGNING_KEY_ID',
    expiresIn: 120, // Token expiration time in seconds
  });
};

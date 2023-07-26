// import { verifyToken, validateUser } from '../../../auth/auth';

// // api/hello.js

// // Replace 'your-secret-token' with your own secret token
// const SECRET_TOKEN = 'your-secret-token';

// export default function handler(req, res) {
//   // Get the token from the request header
//   const token = req.headers.authorization?.replace('Bearer ', '');

//   if (!token || token !== SECRET_TOKEN) {
//     // Token is missing or invalid, return unauthorized status
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   // Token is valid, respond with the desired data
//   res.status(200).json({ name: 'John Doe' });
// }

import { verifyToken } from '../../../auth/auth';

// Replace 'your-secret-key' with your own secret key for JWT token verification
const SECRET_KEY = 'your-secret-key';

export default function handler(req, res) {
  // Get the token from the request header
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    // Token is missing, return unauthorized status
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Verify the token
  const decodedToken = verifyToken(token, SECRET_KEY);
  if (!decodedToken) {
    // Invalid token, return unauthorized status
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Token is valid, respond with the desired data
  res.status(200).json({ name: 'John Doe' });
}

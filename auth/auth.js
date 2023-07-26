import jwt from 'jsonwebtoken';

// Replace 'your-secret-key' with your own secret key for JWT token verification
const SECRET_KEY = 'your-secret-key';

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}

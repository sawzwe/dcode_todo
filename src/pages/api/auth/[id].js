import { verifyToken } from '../../../auth/auth';
import User from '../../../models/User'; // Assuming the User model is exported from the specified path
import connectMongoDB from '../../../../libs/mongodb';


export default async function handler(req, res) {
  await connectMongoDB();
  const { method } = req;
  const { id } = req.query;

  // Verify token or any other authentication logic you want to use
  // For this example, I'll just check for a valid token in the request header
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Handle GET request
  if (method === 'GET') {
    try {
      const user = await User.findById(id).populate('tasks'); // Assuming 'tasks' field is an array of task references

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  }

  // Handle POST request
  if (method === 'POST') {
    // Get the user data from the request body
    const { username, password, tasks } = req.body;

    try {
      // Create a new user in the database
      const user = await User.create({ username, password, tasks });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  }

  // Handle other HTTP methods
  return res.status(405).json({ error: 'Method not allowed' });
}

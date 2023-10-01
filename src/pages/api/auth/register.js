import User from '../../../../models/User'; // Replace with the actual path to the User schema file
import connectMongoDB from '../../../../libs/mongodb';

// Connect to MongoDB
connectMongoDB();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Fetch all users from the database
      const users = await User.find();

      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      // Check if a user with the same username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      // Create a new User document with the provided username and password
      const newUser = new User({
        username,
        password,
        tasks: null, // Initially, the tasks array will be set to null
      });

      // Save the new user to the database
      await newUser.save();

      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}


// pages/api/auth/login.js

// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import connectMongoDB from '../../../../libs/mongodb';
// import User from '../../../../models/User';

// connectMongoDB();

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }

//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Create a session token (JWT)
//     const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

//     return res.status(200).json({ token });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

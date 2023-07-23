import connectMongoDB from "../../../libs/mongodb";
import Todo from "../../../models/Todo";


export default async function handler(req, res) {
  await connectMongoDB(); // Make sure to wait for the MongoDB connection to be established

  if (req.method === 'GET') {

    try {
      // Fetch todos from MongoDB and sort by createdAt field in ascending order
      const sortedTodos = await Todo.find().sort({ createdAt: 1 });

      res.status(200).json(sortedTodos);
    } catch (error) {
      console.error('Error fetching todos:', error);
      res.status(500).json({ message: 'Error fetching todos' });
    }

  } else if (req.method === 'POST') {

    try {
      const { title, completed } = await req.body;
      const newTodo = new Todo({ title, completed });
      const savedTodo = await newTodo.save();
      res.status(201).json(savedTodo);

    } catch (error) {
      console.error('Error creating todo:', error);
      res.status(500).json({ message: 'Error creating todo' });
    }

  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      console.log(id)
      const deletedTodo = await Todo.findByIdAndDelete(id);

      if (!deletedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      res.status(200).json({ message: "Todo deleted successfully", deletedTodo });
    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).json({ message: 'Error deleting todo' });
    }
  } else if (req.method === "PUT") {
    try {
      const { id, title, completed } = req.body; // Extract id, title, and completed from the request body

      // Find the task by id and update the title and completed status
      const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { title, completed },
        { new: true } // Set new: true to return the updated task
      );

      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      res.status(200).json({ message: "Todo updated successfully", updatedTodo });
    } catch (error) {
      console.error("Error updating todo:", error);
      res.status(500).json({ message: "Error updating todo" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed for other HTTP methods
  }
}


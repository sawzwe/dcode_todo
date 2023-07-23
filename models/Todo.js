import mongoose, {Schema} from "mongoose";

const todoListsSchema = new Schema (
    {
        title: String,
        completed: Boolean,
    },
    {
        timestamps: true,
    }
)

const Todo = mongoose.models.Todo || mongoose.model('Todo', todoListsSchema);

export default Todo;
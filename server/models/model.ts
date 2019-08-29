import { mongoose } from "../config/database";
import { Document, Model, Schema } from "mongoose";

export interface ITodo extends Document {
  content: string;
  date: string;
}

export interface ITodoModel extends Model<ITodo> {
  updateTodo(id: string, content: string): Promise<{ nModified: number }>
}

const schema = new Schema({
  content: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

schema.static("updateTodo", (id:string, content: string) => {

  return Todo
    .update({
      "_id": id
    }, {
      "$set": {
        "content": content
      }
    })
    .exec();
});



export const Todo = mongoose.model<ITodo>("Todo", schema) as ITodoModel;

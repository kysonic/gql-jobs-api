import { Schema, model } from 'mongoose';

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
      maxlength: [40, 'Cannot be more than 40 symbols'],
    },
    author: {
      type: String,
      required: false,
      maxlength: [40, 'Cannot be more than 40 symbols'],
    },
  },
  {
    timestamps: true,
  },
);

export default model('Book', BookSchema);

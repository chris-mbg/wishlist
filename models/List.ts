import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    owner_username: {
      type: String,
    },
    items: [
      new mongoose.Schema({
        title: String,
        description: String,
        link: String,
      }),
    ],
  },
  { timestamps: true }
);

export default mongoose.models?.List || mongoose.model('List', ListSchema);

import mongoose from "mongoose";

const BookSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  authors: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }
  ],
  genres: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }  
  ]
}, {
	timestamps: true,
})

export default mongoose.model("Book", BookSchema);
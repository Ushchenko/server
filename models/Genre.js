import mongoose from "mongoose";

const GenreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
}, {
	timestamps: true,
})

export default mongoose.model("Genre", GenreSchema);
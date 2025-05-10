import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  scanHistory: [{ type: Schema.Types.ObjectId, ref: "Plant" }],
});

export default mongoose.model("User", userSchema);

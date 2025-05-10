import mongoose from "mongoose";
const { Schema } = mongoose;

const scanSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plantName: { type: String, required: true },
  scientificName: { type: String, required: true },
  careTips: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Scan = mongoose.model("Scan", scanSchema);
export default Scan;

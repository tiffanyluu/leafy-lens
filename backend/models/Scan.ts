import mongoose from "mongoose";
const { Schema } = mongoose;

const scanSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  plantName: { type: String, required: true },
  scientificName: { type: String, required: true },
  family: { type: String, required: true },
  imageUrl: { type: String }, // base 64 string
  confidence: { type: Number },
  careTips: {
    watering: { type: String },
    sunlight: { type: String },
    soil: { type: String },
    temperature: { type: String },
  },
  sourceUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Scan = mongoose.model("Scan", scanSchema);
export default Scan;

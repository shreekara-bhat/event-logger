import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventType: { type: String, required: true },
  timestamp: { type: Date, required: true },
  sourceAppId: { type: String, required: true },
  dataPayload: { type: Object, required: true },
  previousHash: { type: String, default: null },
  hash: { type: String, required: true },
});

export default mongoose.model("Event", eventSchema);

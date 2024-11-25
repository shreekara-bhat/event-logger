import Event from "../models/Event.js";
import { computeHash } from "../utils/hash.js";
import { verifyChain } from "../utils/consensus.js";

export const logEvent = async (req, res) => {
  try {
    const { eventType, timestamp, sourceAppId, dataPayload } = req.body;

    const lastEvent = await Event.findOne().sort({ timestamp: -1 });
    const previousHash = lastEvent ? lastEvent.hash : null;

    const hash = computeHash({
      eventType,
      timestamp,
      sourceAppId,
      dataPayload,
      previousHash,
    });

    const newEvent = new Event({
      eventType,
      timestamp,
      sourceAppId,
      dataPayload,
      previousHash,
      hash,
    });
    await newEvent.save();

    const broadcast = req.app.get("broadcast");
    broadcast(newEvent);

    res.status(201).json({ message: "Event logged successfully", newEvent });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to log event", details: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const {
      eventType,
      sourceAppId,
      start,
      end,
      page = 1,
      limit = 10,
    } = req.query;
    const query = {};

    if (eventType) query.eventType = eventType;
    if (sourceAppId) query.sourceAppId = sourceAppId;
    if (start && end)
      query.timestamp = { $gte: new Date(start), $lte: new Date(end) };

    const events = await Event.find(query)
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ events, page, limit });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch events", details: error.message });
  }
};

export const validateChain = async (req, res) => {
  try {
    const events = await Event.find().sort({ timestamp: 1 });
    const isValid = verifyChain(events);

    res.json({ valid: isValid, events });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to validate chain", details: error.message });
  }
};

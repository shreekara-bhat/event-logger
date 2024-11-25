import express from "express";
import mongoose from "mongoose";
import http from "http";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import eventRoutes from "./routes/eventRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
dotenv.config();

// Middleware
app.use(express.json());
app.use("/api/events", eventRoutes);
app.use(errorHandler);

// WebSocket setup
wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});

// Broadcast helper
const broadcastEvent = (event) => {
  const message = JSON.stringify(event);
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  });
};

// Attach broadcast function to app
app.set("broadcast", broadcastEvent);

// Start Server and Database
const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

import crypto from "crypto";

export const computeHash = (event) => {
  const dataString = `${event.eventType}${event.timestamp}${
    event.sourceAppId
  }${JSON.stringify(event.dataPayload)}${event.previousHash || ""}`;
  return crypto.createHash("sha256").update(dataString).digest("hex");
};

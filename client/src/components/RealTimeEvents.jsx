import React, { useState, useEffect } from "react";

const RealTimeEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000");
    socket.onmessage = (message) => {
      const event = JSON.parse(message.data);
      setEvents((prevEvents) => [event, ...prevEvents]);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Real-Time Events
      </h2>
      <ul className="space-y-4">
        {events.map((event, index) => (
          <li
            key={index}
            className="bg-white p-4 rounded shadow-lg hover:shadow-2xl transition duration-300"
          >
            <div className="text-lg font-semibold text-gray-800">
              Type: {event.eventType}
            </div>
            <div className="text-sm text-gray-500">
              Source: {event.sourceAppId}
            </div>
            <div className="text-sm text-gray-500">
              Timestamp: {new Date(event.timestamp).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeEvents;

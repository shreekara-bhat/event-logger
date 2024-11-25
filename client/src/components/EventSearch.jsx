import React, { useState } from "react";

const EventSearch = () => {
  const [filters, setFilters] = useState({});
  const [events, setEvents] = useState([]);

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const searchEvents = async () => {
    const response = await fetch(
      `http://localhost:5000/api/events?${new URLSearchParams(filters)}`
    );
    const data = await response.json();
    setEvents(data.events);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-600">
        Search Events
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          name="eventType"
          placeholder="Event Type"
          className="w-full p-3 border border-gray-300 rounded"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="sourceAppId"
          placeholder="Source App ID"
          className="w-full p-3 border border-gray-300 rounded"
          onChange={handleInputChange}
        />
        <div className="flex space-x-4">
          <input
            type="date"
            name="start"
            placeholder="Start Date"
            className="w-full p-3 border border-gray-300 rounded"
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="end"
            placeholder="End Date"
            className="w-full p-3 border border-gray-300 rounded"
            onChange={handleInputChange}
          />
        </div>
        <button
          onClick={searchEvents}
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </div>
      <ul className="space-y-4 mt-6">
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

export default EventSearch;

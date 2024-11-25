import React, { useState } from "react";

const ChainValidation = () => {
  const [validationResult, setValidationResult] = useState(null);

  const validateChain = async () => {
    const response = await fetch("http://localhost:5000/api/validate");
    const data = await response.json();
    setValidationResult(data);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-600">
        Chain Validation
      </h2>
      <div className="text-center">
        <button
          onClick={validateChain}
          className="bg-green-500 text-white py-3 px-6 rounded hover:bg-green-600 transition duration-300"
        >
          Validate Chain
        </button>
        {validationResult && (
          <p className="mt-4 text-lg font-semibold">
            <strong>Chain Valid:</strong>{" "}
            {validationResult.valid ? "Yes" : "No"}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChainValidation;

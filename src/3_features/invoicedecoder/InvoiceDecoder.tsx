import React, { useState } from "react";
import { decodePaymentRequest } from "ln-service";

interface DecodedInvoice {
  tokens: number;
  expires_at: string;
  description: string;
  // Add other fields as necessary
}

const InvoiceDecoder: React.FC = () => {
  const [invoice, setInvoice] = useState("");
  const [decodedData, setDecodedData] = useState<DecodedInvoice | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInvoice(value);
    setError(null);
    setLoading(true); // Set loading to true
    try {
      const data = await decodePaymentRequest({ request: value });
      setDecodedData(data);
    } catch (err) {
      console.error(err); // Log the error for debugging
      setDecodedData(null);
      setError("Invalid invoice");
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div>
      <input
        type="text"
        value={invoice}
        onChange={handleChange}
        placeholder="Paste your lightning invoice here"
      />
      {loading && <p>Loading...</p>} {/* Loading message */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {decodedData && (
        <div>
          <h3>Decoded Invoice:</h3>
          <p>Amount: {decodedData.tokens} sats</p>
          <p>Expiry: {decodedData.expires_at}</p>
          <p>Memo: {decodedData.description}</p>
          {/* Add other fields as necessary */}
        </div>
      )}
    </div>
  );
};

export default InvoiceDecoder;
